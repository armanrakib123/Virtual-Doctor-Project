import Chat from "@/models/Chat";
import connectDB from "@/lib/connectDB";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { chatId, message } = body;

  let chat = await Chat.findOne({ chatId });

  if (!chat) {
    chat = await Chat.create({
      chatId,
      messages: [message],
    });
  } else {
    chat.messages.push(message);
    await chat.save();
  }
  return Response.json({ success: true });
}
