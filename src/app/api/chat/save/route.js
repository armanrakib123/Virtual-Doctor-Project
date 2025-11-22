import dbconnect, { collectionNameObj } from "@/lib/dbconnect";
import Chat from "@/models/Chat";


export async function POST(req) {
  await dbconnect(collectionNameObj.Live_chat);

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
