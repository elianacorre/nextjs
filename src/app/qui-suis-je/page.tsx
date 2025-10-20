import { Section, SectionContent, SectionImage, SectionMain, SectionTitle } from "@/components/section";
import { readAboutPage } from "@/data/pages";

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export default function AboutPage() {
  const data = readAboutPage();
  const intents = ["default", "secondary", "primary"] as const;

  return (
    <>
      {data.map(({ content, img, slug, title }, i) => (
        <Section className={{ container: i % 2 !== 0 ? "lg:flex-row-reverse" : "" }} intent={intents[i]} key={slug}>
          <SectionMain className="basis-1/2">
            <SectionTitle intent={intents[i] === "secondary" ? "secondary" : "primary"} title={title} />
            <SectionContent>{content}</SectionContent>
          </SectionMain>
          <SectionImage className={{ figure: "flex basis-1/2" }} image={img} reverse={i % 2 !== 0} />
        </Section>
      ))}
    </>
  );
}
