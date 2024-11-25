"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="w-[100%] h-[100vh] mx-auto flex items-center justify-center">
      <SignUp />
    </div>
  );
}
