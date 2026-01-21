import React from "react";
import LoginForm from "@/modules/auth/login";
import AuthLayout from "@/components/auth/auth-layout";

export default function Login() {
  return (
    <AuthLayout
      title="Login"
      description="Log in to unlock advanced hiring tools and manage your recruitment workflow."
    >
      <LoginForm />
    </AuthLayout>
  );
}
