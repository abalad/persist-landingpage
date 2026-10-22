"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ButtonLink } from "./Button";

/** "Sign in" for visitors, "My account" once a session exists in this browser. */
export function AccountLink() {
  const t = useTranslations("nav");
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const auth = supabase().auth;
    auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data } = auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <ButtonLink href="/account" variant="ghost">
      {signedIn ? t("account") : t("signIn")}
    </ButtonLink>
  );
}
