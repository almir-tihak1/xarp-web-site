import LegalPage, { legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("terms-conditions", "en");

export default function Page() {
  return <LegalPage doc="terms-conditions" locale="en" />;
}
