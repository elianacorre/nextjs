import { readImageBySlug } from "./images";
import { readAllSets } from "./sets";

export const readRootLayout = () => ({
  logoImg: readImageBySlug("logo"),
  navs: [
    { key: "qui-suis-je", text: "Qui suis-je?", href: "/qui-suis-je" },
    { key: "oeuvres", text: "Œuvres", href: "/oeuvres" },
    { key: "contact", text: "Contact", href: "/#contact" },
  ],
  socials: [
    { key: "instagram", icon: "icon-[line-md--instagram]", text: "Instagram", href: "/" },
    { key: "youtube", icon: "icon-[line-md--youtube-filled]", text: "Youtube", href: "/" },
  ],
});

export const readWorksLayout = () => ({
  hero: {
    content:
      "Vous retrouverez ici toutes les œuvres que j’ai réalisées. Si l’une d’entre elles résonne avec vous, n’hésitez pas à me contacter.",
    image: readImageBySlug("la-reveuse"),
    title: ["Découvrez", "mes œuvres"],
  },
  sets: readAllSets(),
});
