import type { Metadata } from "next";
import { LoginForm } from "@/components/journal/login-form";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default function LoginPage() {
  return <LoginForm />;
}
