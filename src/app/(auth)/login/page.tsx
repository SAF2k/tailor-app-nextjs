"use client";

import Login from "@/components/Login";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const route = useRouter();
  const { authStatus } = useAuth();

  if (authStatus) {
    route.replace("/profile");
    return <></>;
  }

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <Login />
    </div>
  );
}
