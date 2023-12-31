"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeToggle } from "./ThemeToggle";
import { useToast } from "./ui/use-toast";
import axios from "axios";

const formSchema = z.object({
  username: z.string().min(4,{ message: "Please enter a valid username." }),
  password: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
});

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
  });

  const onLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const { username, password } = values;
      const response = await axios.post("/api/login", values);
      console.log(response);
      if (response.status === 200) {
       toast({
         description: "Login successful",
       });
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    console.log(values);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-secondary rounded-xl p-10 border border-secondary-foreground hover:border-primary">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[60px]">
            <Image src="/favicon.ico" alt="image" width={60} height={60} />
           
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account!
        </h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onLogin)} className="mt-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="text-base font-medium">
                User Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="username"
                  {...register("username")}
                  className="flex h-10 w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="User Name"
                />
                {formState.errors.username && (
                  <p className="text-red-600">
                    {formState.errors.username.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-base font-medium">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  id="password"
                />
                {formState.errors.password && (
                  <p className="text-red-600">
                    {formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 hover:bg-primary/80 disabled:opacity-50"
              >
                {loading && (
                  <span className="mr-2">
                    <Image
                      src="/loading.svg"
                      alt="loading"
                      width={20}
                      height={20}
                    />
                  </span>
                )}
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
