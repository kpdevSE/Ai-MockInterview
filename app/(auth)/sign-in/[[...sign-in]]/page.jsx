import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="w-[100%] h-[100vh] mx-auto flex items-center justify-center">
      <SignIn />
    </div>
  );
}
