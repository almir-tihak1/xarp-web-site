import LegalPage, { legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("terms-conditions", "de");

export default function Page() {
  return <LegalPage doc="terms-conditions" locale="de" />;
}
