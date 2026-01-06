import React from "react";
import LoginForm from "@/modules/auth/login";
import AuthLayout from "@/components/auth/auth-layout";

export default function Login() {
  return (
    <AuthLayout
      title="Login"
      description="Masuk ke akun Anda untuk melanjutkan"
    >
      <LoginForm />
    </AuthLayout>
  );
}
