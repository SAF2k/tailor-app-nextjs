"use client";

import Image from "next/image";

import Login from "@/components/Login";

export default function Home() {
  const  authStatus  = false
  return (
    <div className="w-full max-w-7xl mx-auto px-8">
      <div className="flex flex-wrap -mx-2 mt-32 gap-y-8">
        <div className="w-full sm:w-1/2 px-2 flex justify-center flex-wrap items-center">
          <div className="relative text-center w-full flex justify-center items-center flex-wrap">
            <div className="w-full max-w-[100px]">
              <Image src="/favicon.ico" alt="image" width={100} height={100} />
            </div>
            <div className="w-full">
              <h1 className="font-bold text-3xl mb-4">
                Next.js 13 Authentication with
                <span className="text-primary"> Appwrite</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 px-2 flex flex-wrap justify-end">
          {authStatus ? (
            <div className="max-w-full">
              {/* <ProfileCard /> */}
            </div>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
}
