import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("home-page redirection",token)
  if (token) redirect("/week");
  return redirect("/auth/sign-up");
}
