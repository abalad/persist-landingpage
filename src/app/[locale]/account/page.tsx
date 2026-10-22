import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense, use } from "react";
import { AccountView } from "@/components/account/AccountView";
import styles from "@/components/account/account.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/account">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.meta" });
  return { title: t("account"), robots: { index: false } };
}

export default function AccountPage({ params }: PageProps<"/[locale]/account">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return (
    <div className={`container ${styles.page}`}>
      <Suspense>
        <AccountView />
      </Suspense>
    </div>
  );
}
