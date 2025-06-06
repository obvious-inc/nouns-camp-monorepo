import ClientAppProvider from "@/app/client-app-provider";
import { build as buildMetadata } from "@/utils/metadata";
import BrowseCandidatesScreen from "@/components/browse-candidates-screen";

export const metadata = buildMetadata({
  title: "Topics",
  canonicalPathname: "/topics",
});

export default function Page() {
  return (
    <ClientAppProvider>
      <BrowseCandidatesScreen candidateType="topic" />
    </ClientAppProvider>
  );
}
