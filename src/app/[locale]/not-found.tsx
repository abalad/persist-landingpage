import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/site/Button";
import { PageHeader } from "@/components/site/PageHeader";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <>
      <PageHeader title={t("title")} body={t("body")} />
      <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
        <ButtonLink href="/">{t("home")}</ButtonLink>
        <ButtonLink href="/docs" variant="secondary" trailingIcon={<ArrowRight />}>
          {t("docs")}
        </ButtonLink>
      </div>
    </>
  );
}
