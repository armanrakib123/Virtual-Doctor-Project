import nodemailer from "nodemailer";

export async function sendWelcomeEmail(to, name) {
   
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
        },
    });

  
    const mailOptions = {
        from: `"VirtualDoc" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Welcome to VirtualDoc 🎉",
        html: `
      <div style="background-color:#f5f9fc; font-family:Arial,Helvetica,sans-serif; padding:30px;">
    <div style="max-width:600px; background:white; margin:0 auto; border-radius:12px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.08);">
      <!-- Header -->
      <div style="background: linear-gradient(90deg,rgba(84, 139, 179, 1) 0%, rgba(196, 236, 242, 1) 53%); color:white; padding:20px 30px; text-align:center;">
        <img src="https://i.ibb.co/vvY1dQqh/stethoscope-icon.png" alt="VirtualDoc" width="60" style="margin-bottom:8px;">
        <h1 style="margin:0; font-size:24px;">Welcome to <span style="color:#0284B5;">VirtualDoc</span></h1>
      </div>

      <!-- Body -->
      <div style="padding:30px; color:#333; line-height:1.6;">
        <h2 style="color:#037aa5;">Hi ${name || "there"} 👋,</h2>
        <p>
          Welcome to <b>VirtualDoc</b> — your trusted platform for online medical consultations.
        </p>
        <p>
          You’ve successfully logged in using your Google account. Now you can:
        </p>
        <ul style="padding-left:20px;">
          <li>Book appointments with certified doctors 🩺</li>
          <li>Join live video consultations 💬</li>
          <li>Access prescriptions and reports anytime 📄</li>
        </ul>
        <p>We’re excited to have you onboard. Let’s keep you healthy and connected!</p>

        <div style="text-align:center; margin-top:30px;">
          <a href="https://virtualdoc.vercel.app" 
            style="background:#037aa5; color:white; padding:12px 30px; border-radius:6px; text-decoration:none; font-weight:bold; display:inline-block;">
            Visit VirtualDoc
          </a>
        </div>

        <p style="margin-top:30px; color:#666; font-size:13px; text-align:center;">
          If you didn’t sign up, please ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f0f0f0; text-align:center; padding:10px; font-size:12px; color:#666;">
        © ${new Date().getFullYear()} VirtualDoc — All rights reserved.
      </div>
    </div>
  </div>
    `,
    };

  
    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Welcome email sent to:", to);
    } catch (error) {
        console.error("❌ Failed to send welcome email:", error);
    }
}
