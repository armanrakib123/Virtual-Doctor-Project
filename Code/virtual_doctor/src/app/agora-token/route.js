import { RtcRole, RtcTokenBuilder } from "agora-access-token";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const channelName = searchParams.get("channelName");
  const uid = searchParams.get("uid") || Math.floor(Math.random() * 100000);

  if (!channelName) {
    return new Response(JSON.stringify({ error: "channelName required" }), {
      status: 400,
    });
  }

  const appID = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const role = RtcRole.PUBLISHER;
  const expireTime = 3600; 

  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    expireTime
  );

  return new Response(JSON.stringify({ token, uid }), { status: 200 });
}
