import LegalPage, { legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("privacy-policy", "de");

export default function Page() {
  return <LegalPage doc="privacy-policy" locale="de" />;
}
