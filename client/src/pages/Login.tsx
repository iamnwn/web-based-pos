import LoginForm from "@/components/LoginForm";

import { Toaster } from "@/components/ui/toaster";

const Login = (data) => {
  return (
    <>
      <main className="h-dvh bg-gradient-to-r from-gray-900 via-stone-900 to-zinc-800 grid content-center justify-center">
        <Toaster />
        <LoginForm />
      </main>
    </>
  );
};

export default Login;
