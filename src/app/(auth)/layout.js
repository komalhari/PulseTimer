import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
      redirect("/");
    }

  return (
    <div lang="en">
      <div>{children}</div>
    </div>
  );
}
