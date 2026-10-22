import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense, use } from "react";
import { SignInForm } from "@/components/account/SignInForm";
import styles from "@/components/account/auth.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/sign-in">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.meta" });
  return { title: t("signIn"), robots: { index: false } };
}

export default function SignInPage({ params }: PageProps<"/[locale]/sign-in">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return (
    <div className={`container ${styles.shell}`}>
      <Suspense>
        <SignInForm />
      </Suspense>
    </div>
  );
}
