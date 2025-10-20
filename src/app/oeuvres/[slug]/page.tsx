import { GridBackground } from "@/components/grid-background";
import { Section, SectionMain } from "@/components/section";
import { WorksGrid } from "@/components/works-grid";
import { readWorksSetPage } from "@/data/pages";
import { readAllSetsSlugs } from "@/data/sets";

// PARAMS ----------------------------------------------------------------------------------------------------------------------------------
export function generateStaticParams() {
  return readAllSetsSlugs().map((slug) => ({ slug }));
}

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export default async function WorksPage({ params }: PageProps<"/oeuvres/[slug]">) {
  const { slug } = await params;
  const works = readWorksSetPage(slug);

  return (
    <Section>
      <GridBackground />
      <SectionMain>
        <WorksGrid works={works} />
      </SectionMain>
    </Section>
  );
}
