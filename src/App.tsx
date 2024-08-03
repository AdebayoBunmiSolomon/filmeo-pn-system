import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { formType } from "./form-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { formValidationSchema } from "./validation-schema";
import { useGetAllTokens } from "./useGetAllTokens";
import filmeoIcon from "./assets/adaptive-icon.png";

export const App: React.FC<{}> = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formType>({
    mode: "onChange",
    resolver: yupResolver(formValidationSchema),
  });
  const { getAllPushTokens, loading } = useGetAllTokens();

  useEffect(() => {
    getAllPushTokens();
  }, []);

  const onSubmit = async (data: formType) => {
    console.log(data);
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center h-dvh'>
        {loading ? (
          <svg
            aria-hidden='true'
            className='inline w-6 h-6 mr-2 text-[#8d2fc7] animate-spin fill-[#8d2fc7]'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
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
                Send Notification
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
