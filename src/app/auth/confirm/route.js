// src/app/auth/confirm/route.js
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const allowedRedirects = ["/dashboard", "/profile", "/reset", "/reset/update"]; 
  const requestedRedirect = searchParams.get("next");
  const next = allowedRedirects.includes(requestedRedirect)
    ? requestedRedirect
    : "/";

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });

    if (!error) {
      return redirect(next);
    }

    console.error("❌ verifyOtp failed:", error.message);
  }

  return redirect("/auth/auth-code-error");
}
