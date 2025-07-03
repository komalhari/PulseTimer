"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpotify, FaFacebook, FaGoogle } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { linkAdditionalIdentity } from "@/lib/actions";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";

export default function ConnectedAccounts(providers) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  let providededData = providers.providers || [];

  const handleConnect = (provider_) => {
    if (provider_ === "email") {
      setOpen(() => true);
    } else if (provider_ === "google") {
      linkAdditionalIdentity("google");
    } else if (provider_ === "facebook") {
      linkAdditionalIdentity("facebook");
    } else if (provider_ === "spotify") {
      linkAdditionalIdentity("spotify");
    }
  };

  const handleDisconnect = async (provider_) => {
    const identity = providededData.find((prov) => prov.provider === provider_);

    console.log("this is provider", provider_);
    try {
      const res = await fetch("/api/disconnect/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ provider: identity.provider }),
      });

      if (res.ok) {
        window.location.reload();
      }
    } catch {
      toast.warning("Failed to Disconnect");
    }
  };

  const emailLinked = providededData.some((acc) => acc.provider === "email");

  const providersData = [
    emailLinked && {
      provider: "email",
      name: "Email",
      icon: <IoMdMail className="w-5 h-5" />,
    },
    {
      provider: "google",
      name: "Google",
      icon: <FaGoogle className="w-4 h-4" />,
    },
    {
      provider: "spotify",
      name: "Spotify",
      icon: <FaSpotify className="w-4 h-4" />,
    },
    {
      provider: "facebook",
      name: "Facebook",
      icon: <FaFacebook className="w-4 h-4" />,
    },
  ].filter(Boolean);

  const accounts = providersData.map((provider) => {
    const match = providededData.find(
      (acc) => acc.provider === provider.provider
    );

    return {
      ...provider,
      connected: !!match,
      email: match?.email || "",
    };
  });

  return (
    <div className="flex flex-col gap-4">
      {accounts.map((account) => (
        <Card key={account.provider} className="flex flex-col justify-between">
          <CardHeader className="flex items-center gap-1.5">
            {account.icon}
            <CardTitle>{account.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              {account.connected
                ? `Connected as: ${account.email}`
                : "Not connected"}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                account.connected
                  ? handleDisconnect(account.provider)
                  : handleConnect(account.provider)
              }
            >
              {account.connected ? "Disconnect" : "Connect"}
            </Button>
          </CardContent>
        </Card>
      ))}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert!</AlertDialogTitle>
            <AlertDialogDescription>
              You need to signup with the existing email address of any linked
              accounts to successfully conncet this account with the email, else
              a new account would be created.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push("/signup?mode=link")}>
              I understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
