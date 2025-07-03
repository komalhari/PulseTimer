"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { createProfile } from "./services/createProfile";

export async function populateProfile() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log(error);
    redirect("/signup");
  }

  const user = data.user;
  const username =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "User";

  try {
    const { data: existingProfile } = await supabase
      .from("profile")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (!existingProfile) {
      await createProfile(user.id, username.split(" ")[0]);
    } else {
      redirect("/signup?message=Profile+Already+Exists");
    }
  } catch (err) {
    redirect("/signup?message=Profile+creation+failed");
  }
}

export async function SignUp(email, password, captchaToken) {
  const supabase = await createClient();

  const username = email.split("@")[0];

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
  
      captchaToken,
    },
  });

  if (signUpError) {
    return { ok: false, error: "Failed to Sign in" };
  }

  const user = signUpData.user;

  if (!user) {
    return { ok: false, error: "Failed to Sign in" };
  }

  try {
    await createProfile(user.id, username);
  } catch (err) {
    return { ok: false, error: "Profile creation failed" };
  }

  revalidatePath("/", "layout");
  // redirect("/dashboard");
  return { ok: true };
}

export async function LogIn(email, password, captchaToken) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      captchaToken,
    },
  });

  if (error) {
    console.log(error);
    redirect("/login?message=Login+Failed");
  }
  revalidatePath("/", "layout");

  redirect("/dashboard");
}

export async function SignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function signInWithOAuth(provider) {
  const supabase = await createClient();
  const authCallback = `${process.env.SITE_URL}/auth/callback?next=/dashboard`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: authCallback,
    },
  });

  try {
  } catch (error) {
    console.log(error);
    redirect("/signup?message=Profile+creation+failed");
  }

  if (error) {
    console.log(error);
    redirect("/signup?message=SignUP+Failed");
  }
  return redirect(data.url);
}

export async function signInWithGoogle() {
  return await signInWithOAuth("google");
}

export async function signInWithFacebook() {
  return await signInWithOAuth("facebook");
}

export async function signInWithSpotify() {
  return await signInWithOAuth("spotify");
}

export async function linkAdditionalIdentity(provider) {
  const supabase = await createClient();
  const authCallback = `${process.env.SITE_URL}/auth/callback?next=/dashboard`;

  const { data, error } = await supabase.auth.linkIdentity({
    provider: provider,
    options: {
      redirectTo: authCallback,
    },
  });

  try {
  } catch (error) {
    console.log(error);
    redirect("/signup?message=Link+failed");
  }

  if (error) {
    console.log(error);
    redirect("/signup?message=Link+Failed");
  }
  return redirect(data.url);
}

export async function resetPassword(email, captchaToken) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    captchaToken,
    redirectTo: `${process.env.SITE_URL}/auth/callback?next=/reset/update`,
  });

  if (error) {
     redirect("/reset?message=Could+Not+Send+Password+Reset+Email");
  }
  return {
    success: "Please Check Your Email",
  };
}

export async function updatePassword(new_password) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: new_password,
  });
  if (error) {
    if (error.code == "same_password") {
      redirect("/reset?message=Could+Not+Use+Same+Password");
    }
    redirect("/reset?message=Could+Not+Update+Your+Password");
  }

  await supabase.auth.signOut();
  return { success: "Please Check Your Email" };
}

export async function DeleteUser({ userId }) {
  try {
    const supabase = await createClient("deleteUser");

    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) throw signOutError;

  
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) {
      console.log(error);
      redirect("/dashboard?message=Failed+To+Delete+User");
    }
  } catch (e) {
    console.log(e);
    redirect("/dashboard?message=Failed+To+Delete+User");
  }
}
