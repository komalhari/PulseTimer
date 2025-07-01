import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
export default async function ProtectedLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();


  if (!user) {
    redirect("/");
  }

  return (
    <div lang="en">
      <div>{children}</div>
    </div>
  );
}
