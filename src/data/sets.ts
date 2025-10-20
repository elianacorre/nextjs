import { readImageById } from "./images";

export const allSets = [
  {
    _creationTime: 1_759_824_725_349.786,
    _id: "jh7f4jzf2tb7vxmd3tc2m2w07n7s0gbk",
    content:
      "Cette collection est une ode à la beauté, née d'un désir : celui de rappeler aux êtres humains que le monde est beau. Cette beauté que le monde a enfouie et douloureusement cachée en nous, nous pouvons la refaire jaillir à tout moment, la retrouver et l'exprimer à notre tour. Rappelons-nous la sensation du soleil sur la peau, l'odeur de la pluie, la chaleur réconfortante d'une forêt, la poésie qui se cache derrière chacun de nos gestes, l'effet d'une chanson sur notre âme, la musique d'un poème.",
    imageId: "jd7csc9rm59rzg81jxyyfbbh5h7r1vyg",
    slug: "ode-a-la-beaute",
    title: "Ode à la beauté",
  },
  {
    _creationTime: 1_759_824_725_349.7861,
    _id: "jh76h7whkdq85jz19qnswgte717s0bxf",
    content:
      "Dans cette collection, vous trouverez les animaux qui m'inspirent le plus, ceux qui résonnent avec mon âme. On retrouve ici un style plus graphique.",
    imageId: "jd71wqvhk03cbmzfyfbv9a0qzx7r1zxf",
    slug: "bestiaire",
    title: "Bestiaire",
  },
  {
    _creationTime: 1_759_824_725_349.7864,
    _id: "jh7czqvb467a2beg89zfs1d1517s0cfg",
    content:
      "J'ai toujours eu pour les mains une étrange fascination. A travers ces oeuvres, je tente de capturer toute leur beauté et leur poésie.",
    imageId: "jd763tedzn11rme2ds4ygspqnx7r1g7p",
    slug: "la-poetique-des-mains",
    title: "La poétique des mains",
  },
  {
    _creationTime: 1_759_824_725_349.7866,
    _id: "jh7dkmxnmrf2159trbjg34yzf17s0sy5",
    content:
      "Le concept d'animal totem nous vient des peuples amérindiens et africains. Pour eux, chaque personne est reliée à l'esprit d'un animal qui nous guide, nous accompagne et nous protège. Son énergie vibre avec la nôtre et il est votre esprit gardien. Cette collection a vu le jour à la suite du contact thérapeutique des animaux sur mon être.",
    imageId: "jd748adtpnzj3ft6k72g345dbn7r0anx",
    slug: "animal-totem",
    title: "Animal totem",
  },
];

export const setFrom = ({ content, imageId, slug, title }: Sets["Entry"]) => ({ content, image: readImageById(imageId), slug, title });

export const readAllSets = () => allSets.map(setFrom);

export const readSetById = (id: string) => {
  const entity = allSets.find(({ _id }) => _id === id);
  if (!entity) throw new Error(`ImSetage not found: ${id}`);
  return setFrom(entity);
};

export const readAllSetsSlugs = () => allSets.map(({ slug }) => slug);

export type Sets = { Entity: ReturnType<typeof setFrom>; Entry: (typeof allSets)[number] };
