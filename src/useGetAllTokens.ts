import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { firestoreDB } from "./firebase";

type pushTokenDataType = {
  date_created: string | undefined;
  device_name: string | undefined | null;
  device_type: string | undefined;
  id: string | undefined;
  token: string | undefined;
}[];

export const useGetAllTokens = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pushTokenData, setPushTokenData] = useState<pushTokenDataType | any>(
    []
  );

  const getAllPushTokens = async () => {
    setLoading(true);
    try {
      const querySnapShot = await getDocs(
        collection(firestoreDB, "push_tokens")
      );
      const pushTokens = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(pushTokens);
      setPushTokenData(pushTokens);
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    pushTokenData,
    getAllPushTokens,
  };
};
