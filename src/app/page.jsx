import { redirect } from "next/navigation";
import { getToken } from "./services/auth/authService";

export default function Home() {
  const token = getToken();

  if (token) redirect("/week");
  else redirect("/auth/sign-up");

  return null;
}
