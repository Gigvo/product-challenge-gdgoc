"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import InputForm from "@/components/auth/input-form";
import PasswordInput from "@/components/auth/password-input";

interface FormData {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        setMessage(data.message || data.error || "Login failed");
        return;
      }

      setMessage("Login successful! Redirecting...");

      // Use router.refresh() to update the middleware state, then redirect
      router.refresh();
      router.push(callbackUrl);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (field: keyof ValidationErrors): string | undefined => {
    return errors[field];
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && (
          <Alert
            className={
              message.includes("successful")
                ? "border-green-500"
                : "border-red-500"
            }
          >
            <AlertDescription
              className={
                message.includes("successful")
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {message}
            </AlertDescription>
          </Alert>
        )}

        <InputForm
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="account@hr.com"
          value={formData.email}
          onChange={handleChange}
          error={getFieldError("email")}
          disabled={isLoading}
          required
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={getFieldError("password")}
          disabled={isLoading}
          required
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Masuk
        </Button>
      </form>
    </>
  );
}
