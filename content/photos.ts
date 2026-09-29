import type { StaticImageData } from "next/image";

// Reference photos from @anairamodarnoc, used only for the feel prototype.
// They are mood material, not site content (CLAUDE.md §4). Replace this list
// with the photographs Mariana gives us.
import ref003 from "@/docs/reference/instagram/anairamodarnoc_003.jpg";
import ref005 from "@/docs/reference/instagram/anairamodarnoc_005.jpg";
import ref007 from "@/docs/reference/instagram/anairamodarnoc_007.jpg";
import ref016 from "@/docs/reference/instagram/anairamodarnoc_016.jpg";
import ref021 from "@/docs/reference/instagram/anairamodarnoc_021.jpg";
import ref023 from "@/docs/reference/instagram/anairamodarnoc_023.jpg";
import ref025 from "@/docs/reference/instagram/anairamodarnoc_025.jpg";
import ref030 from "@/docs/reference/instagram/anairamodarnoc_030.jpg";

export type Light = "night" | "day";

export type Photo = {
  slug: string;
  image: StaticImageData;
  /** Written by us, approved by her. Provisional until she has seen it. */
  alt: string;
  /** Hers, verbatim. Never edited. */
  caption?: string;
  captionLang?: "pt-BR" | "en" | "es";
  /** ISO date. For reference photos this is the post date, not the capture date. */
  date: string;
  light: Light;
  series?: string;
  /** Who pressed the shutter. */
  author: "mariana" | "unconfirmed" | { name: string; handle?: string };
  /** One entry per identifiable friend, only once they said yes. */
  people?: { consent: true }[];
};

export const photos: Photo[] = [
  {
    slug: "ref-003",
    image: ref003,
    alt: "selfie com flash à noite, de braço esticado e vista de cima: uma mulher de top preto e cabelo escuro curto, com um clarão de flash no céu escuro",
    caption: "é bafo né?!?!",
    date: "2024-07-21",
    light: "night",
    author: "unconfirmed",
  },
  {
    slug: "ref-005",
    image: ref005,
    alt: "uma mulher deitada numa cama de veludo vermelho sob luz magenta, num palco com as letras luminosas VDV acima dela",
    caption: "meus dois moods",
    date: "2024-05-06",
    light: "night",
    author: "unconfirmed",
  },
  {
    slug: "ref-007",
    image: ref007,
    alt: "selfie de perto: uma mulher de moletom azul-cobalto com a mão no rosto, delineado marcado e olhar entediado",
    caption:
      "o tédio é de uma felicidade primária demais \ne é por isso que me é intolerável o paraíso",
    date: "2024-04-19",
    light: "day",
    author: "unconfirmed",
  },
  {
    slug: "ref-016",
    image: ref016,
    alt: "uma mulher de vestido verde de zebra e plataformas rosa numa rua de paralelepípedos, de dia, segurando uma garrafa amarela",
    caption: "todo el mundo mira pero a ella le da igual 💅🏻💚💖🫦🐅",
    captionLang: "es",
    date: "2023-11-26",
    light: "day",
    author: "unconfirmed",
  },
  {
    slug: "ref-021",
    image: ref021,
    alt: "pista de dança com luz violeta e rosa: uma mulher de óculos escuros e bolsa de paetê com o braço erguido no meio da multidão",
    caption: "what’s going on on the floor? 💅🏻💘",
    captionLang: "en",
    date: "2023-09-19",
    light: "night",
    author: "unconfirmed",
  },
  {
    slug: "ref-023",
    image: ref023,
    alt: "à noite, com flash: uma mulher de botas pretas de cano alto e colete estampado diante de um portão coberto de pichações",
    caption: "spicy",
    captionLang: "en",
    date: "2023-08-13",
    light: "night",
    author: "unconfirmed",
  },
  {
    slug: "ref-025",
    image: ref025,
    alt: "uma mulher de calça jeans e top preto sentada numa grade de metal, sorrindo, com céu azul e carros ao fundo",
    caption: "😸😽",
    date: "2023-06-20",
    light: "day",
    author: "unconfirmed",
  },
  {
    slug: "ref-030",
    image: ref030,
    alt: "numa feira de flores, de dia: uma mulher de óculos escuros brancos sorri segurando um buquê embrulhado em papel",
    caption:
      "🌷ganhei uma flor do feirante, ele disse q eu merecia mesmo era um buquê 🌷",
    date: "2023-01-15",
    light: "day",
    author: "unconfirmed",
  },
];

export function photoIndex(slug: string) {
  return photos.findIndex((p) => p.slug === slug);
}
