"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import NameInput from "@/components/auth/name-input";
import InputForm from "@/components/auth/input-form";
import PasswordInput from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";

interface NewUserData {
  name: string;
  email: string;
  password: string;
}

export default function AddUserForm() {
  const [form, setForm] = useState<NewUserData>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setMessage("");

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;

      const response = await fetch("/api/users", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token && token.trim()
            ? { Authorization: `Bearer ${token}` }
            : {}),
        },
        body: JSON.stringify(form),
      });

      const text = await response.text();
      let data: {
        message?: string;
        error?: string;
        errors?: Record<string, string>;
      } = {
        message: text,
      };
      try {
        data = JSON.parse(text);
      } catch {}

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        setMessage(data.message || data.error || "Failed to add user");
        return;
      }

      setMessage("User created successfully");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <p className="text-sm font-bold border-muted border-1 p-2 rounded-md">
          {message}
        </p>
      )}
      <InputForm
        id="email"
        name="email"
        label="Email"
        placeholder="john@example.com"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        required
      ></InputForm>
      <NameInput
        id="name"
        name="name"
        label="Full Name"
        placeholder="John Doe"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        required
      ></NameInput>

      <PasswordInput
        id="password"
        name="password"
        label="Password"
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        required
      ></PasswordInput>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add User"}
      </Button>
    </form>
  );
}
