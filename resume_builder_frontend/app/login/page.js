import LoginForm from "@/components/auth/LoginForm";
import { backendUrl } from "../../utils/constants";

export const metadata = {
  title: "Login - Resume Builder",
  description: "Sign in to your resume builder account",
};

export default function LoginPage() {
  return <LoginForm />;
}
