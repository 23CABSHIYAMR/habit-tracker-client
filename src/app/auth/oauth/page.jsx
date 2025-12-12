import { Suspense } from "react";
import OAuthClient from "./OAuthClient";

export const dynamic = "force-dynamic"; // THIS NOW WORKS

export default function Page() {
  return (
    <Suspense fallback={<h4>Authenticating...</h4>}>
      <OAuthClient />
    </Suspense>
  );
}
