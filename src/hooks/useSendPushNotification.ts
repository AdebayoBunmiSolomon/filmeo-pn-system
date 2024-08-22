import { useState } from "react";

type pushDataType = {
  token: string;
  sound: string;
  title: string;
  body: string;
};

export const useSendPushNotification = () => {
  const [sending, setSending] = useState<boolean>(false);

  const sendPushNotification = async (data: pushDataType) => {
    setSending(true);
    const message = {
      to: data.token,
      sound: data.sound,
      title: data.title,
      body: data.body,
    };
    try {
      setSending(true);
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      console.log("Push notification sent");
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setSending(false);
    }
  };

  return {
    sending,
    sendPushNotification,
  };
};
