import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { formType } from "./form-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { formValidationSchema } from "./validation-schema";
import { useGetAllTokens } from "./hooks/useGetAllTokens";
import filmeoIcon from "./assets/adaptive-icon.png";
import { useSendPushNotification } from "./hooks/useSendPushNotification";
import { Loader } from "./components/loader";

export const App: React.FC<{}> = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formType>({
    mode: "onChange",
    resolver: yupResolver(formValidationSchema),
  });
  const { getAllPushTokens, loading, pushTokenData } = useGetAllTokens();
  const { sendPushNotification, sending } = useSendPushNotification();

  useEffect(() => {
    getAllPushTokens();
  }, []);

  const onSubmit = async (data: formType) => {
    if (data && pushTokenData) {
      try {
        await Promise.all(
          pushTokenData.map(async (item) => {
            if (item?.subscribed) {
              await sendPushNotification({
                token: item?.token,
                sound: "default",
                title: data?.title,
                body: data?.body,
              });
            } else {
              console.log("Not subscribed to");
            }
          })
        );
      } catch (error) {
        console.error("Error sending push notifications:", error);
      }
    }
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center h-dvh'>
        {loading ? (
          <Loader color='#8d2fc7' />
        ) : (
          <>
            <div className='flex flex-row items-center ml-[-30px]'>
              <img
                className='w-12 md:w-14 lg:w-16'
                src={filmeoIcon}
                alt='Your image description'
              />
              <div>
                <p className='text-xl md:text-2xl lg:text-3xl font-bold text-[#8d2fc7]'>
                  Welcome To
                </p>
                <p className='text-xs md:text-sm lg:text-base font-medium text-[#bab5b5]'>
                  Filmeo Push Notification System (Fill details to send push
                  notifications)
                </p>
              </div>
            </div>
            <div className='bg-white shadow-lg rounded-md w-[80%] md:w-[80%] lg:w-1/2 py-6 px-6 gap-5 flex flex-col'>
              <Controller
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type={"text"}
                      className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                      placeholder='Message Title'
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        field.onChange(event.target.value);
                      }}
                    />
                    {errors?.title?.message && (
                      <p className='font-medium text-[crimson] text-sm mt-[-20px]'>
                        {errors?.title?.message}
                      </p>
                    )}
                  </>
                )}
                name='title'
                defaultValue=''
              />
              <Controller
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type={"text"}
                      className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                      placeholder='Message body'
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        field.onChange(event.target.value);
                      }}
                    />
                    {errors?.body?.message && (
                      <p className='font-medium text-[crimson] text-sm mt-[-20px]'>
                        {errors?.body?.message}
                      </p>
                    )}
                  </>
                )}
                name='body'
                defaultValue=''
              />

              <Controller
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type={"text"}
                      className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                      placeholder='Message subtitle'
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        field.onChange(event.target.value);
                      }}
                    />
                    {errors?.subTitle?.message && (
                      <p className='font-medium text-[crimson] text-sm mt-[-20px]'>
                        {errors?.subTitle?.message}
                      </p>
                    )}
                  </>
                )}
                name='subTitle'
                defaultValue=''
              />

              <Controller
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type={"text"}
                      className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                      placeholder='Badge count'
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        field.onChange(event.target.value);
                      }}
                    />
                    {errors?.badgeCount?.message && (
                      <p className='font-medium text-[crimson] text-sm mt-[-20px]'>
                        {errors?.badgeCount?.message}
                      </p>
                    )}
                  </>
                )}
                name='badgeCount'
                defaultValue=''
              />
              <button
                className='px-4 py-2 bg-[#8d2fc7] rounded-md text-white hover:bg-[#8d2fc7d6] duration-700'
                onClick={handleSubmit(onSubmit)}>
                {sending
                  ? /*<Loader color='#FFFFFF' />*/ "Loading..."
                  : "Send Notification"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
