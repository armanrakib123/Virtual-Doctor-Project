// const { Queue, Worker } = require('bullmq');
// const { redisClient } = require('../services/cache.service');

// // Initialize Queues
// const emailQueue = new Queue('email-queue', { connection: redisClient });
// const notificationQueue = new Queue('notification-queue', { connection: redisClient });

// const addEmailJob = async (emailData) => {
//   await emailQueue.add('send-email', emailData, {
//     attempts: 3,
//     backoff: {
//       type: 'exponential',
//       delay: 1000,
//     },
//   });
// };

// const addNotificationJob = async (notificationData) => {
//   await notificationQueue.add('send-notification', notificationData, {
//     attempts: 3,
//     backoff: {
//       type: 'exponential',
//       delay: 1000,
//     },
//   });
// };

// // Workers (can also be separated to different processes for scale)
// const emailWorker = new Worker('email-queue', async job => {
//   console.log(`Processing email job ${job.id} for ${job.data.to}`);
//   // In a real application, you would use nodemailer or a service like SendGrid here
//   return { status: 'success' };
// }, { connection: redisClient });

// emailWorker.on('completed', job => {
//   console.log(`Email job ${job.id} has completed!`);
// });

// emailWorker.on('failed', (job, err) => {
//   console.error(`Email job ${job.id} has failed with ${err.message}`);
// });

// const notificationWorker = new Worker('notification-queue', async job => {
//   console.log(`Processing notification job ${job.id} for user ${job.data.userId}`);
//   // Save notification to DB or emit via socket.io
//   return { status: 'success' };
// }, { connection: redisClient });

// module.exports = {
//   addEmailJob,
//   addNotificationJob
// };


























const { Queue, Worker } = require('bullmq');

const {
  bullMQRedis,
} = require('../services/cache.service');


// ============================================
// INITIALIZE QUEUES
// ============================================

const emailQueue = new Queue(
  'email-queue',
  {
    connection: bullMQRedis,
  }
);


const notificationQueue = new Queue(
  'notification-queue',
  {
    connection: bullMQRedis,
  }
);


// ============================================
// ADD EMAIL JOB
// ============================================

const addEmailJob = async (emailData) => {

  try {

    const job = await emailQueue.add(
      'send-email',
      emailData,
      {
        attempts: 3,

        backoff: {
          type: 'exponential',
          delay: 1000,
        },

        removeOnComplete: 100,

        removeOnFail: 500,
      }
    );

    console.log(`Email job added: ${job.id}`);

    return job;

  } catch (error) {

    console.error(
      'Failed to add email job:',
      error.message
    );

    throw error;
  }
};


// ============================================
// ADD NOTIFICATION JOB
// ============================================

const addNotificationJob = async (notificationData) => {

  try {

    const job = await notificationQueue.add(
      'send-notification',
      notificationData,
      {
        attempts: 3,

        backoff: {
          type: 'exponential',
          delay: 1000,
        },

        removeOnComplete: 100,

        removeOnFail: 500,
      }
    );

    console.log(
      `Notification job added: ${job.id}`
    );

    return job;

  } catch (error) {

    console.error(
      'Failed to add notification job:',
      error.message
    );

    throw error;
  }
};


// ============================================
// EMAIL WORKER
// ============================================

const emailWorker = new Worker(
  'email-queue',

  async (job) => {

    console.log(
      `Processing email job ${job.id}`
    );

    console.log(
      `Sending email to: ${job.data.to}`
    );

    // এখানে পরে Nodemailer / Resend /
    // SendGrid / AWS SES ব্যবহার করতে পারবে

    return {
      status: 'success',
    };
  },

  {
    connection: bullMQRedis,

    concurrency: 5,
  }
);


// ============================================
// EMAIL WORKER EVENTS
// ============================================

emailWorker.on(
  'completed',

  (job) => {

    console.log(
      `Email job ${job.id} completed successfully`
    );

  }
);


emailWorker.on(
  'failed',

  (job, err) => {

    console.error(
      `Email job ${job?.id} failed: ${err.message}`
    );

  }
);


emailWorker.on(
  'error',

  (err) => {

    console.error(
      'Email Worker Error:',
      err.message
    );

  }
);


// ============================================
// NOTIFICATION WORKER
// ============================================

const notificationWorker = new Worker(
  'notification-queue',

  async (job) => {

    console.log(
      `Processing notification job ${job.id}`
    );

    console.log(
      `User ID: ${job.data.userId}`
    );

    // এখানে পরে:
    // MongoDB Notification
    // Socket.IO
    // Firebase Push Notification
    // SMS

    return {
      status: 'success',
    };
  },

  {
    connection: bullMQRedis,

    concurrency: 10,
  }
);


// ============================================
// NOTIFICATION WORKER EVENTS
// ============================================

notificationWorker.on(
  'completed',

  (job) => {

    console.log(
      `Notification job ${job.id} completed successfully`
    );

  }
);


notificationWorker.on(
  'failed',

  (job, err) => {

    console.error(
      `Notification job ${job?.id} failed: ${err.message}`
    );

  }
);


notificationWorker.on(
  'error',

  (err) => {

    console.error(
      'Notification Worker Error:',
      err.message
    );

  }
);


// ============================================
// EXPORTS
// ============================================

module.exports = {

  emailQueue,

  notificationQueue,

  addEmailJob,

  addNotificationJob,

  emailWorker,

  notificationWorker,
};