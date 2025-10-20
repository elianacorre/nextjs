import { permanentRedirect } from "next/navigation";
import { readWorksLayout } from "@/data/layouts";

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export default function WorksPage() {
  const { sets } = readWorksLayout();
  permanentRedirect(`/oeuvres/${sets[0]?.slug}`);
}
