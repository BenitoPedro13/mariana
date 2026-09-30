import { assertContent } from "@/content/check";
import { diaryOrder } from "@/content/order";
import { series } from "@/content/series";
import type { Photo } from "@/content/types";

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
import ref002 from "@/docs/reference/instagram/anairamodarnoc_002.jpg";
import ref006 from "@/docs/reference/instagram/anairamodarnoc_006.jpg";
import ref008 from "@/docs/reference/instagram/anairamodarnoc_008.jpg";
import ref010 from "@/docs/reference/instagram/anairamodarnoc_010.jpg";
import ref011 from "@/docs/reference/instagram/anairamodarnoc_011.jpg";
import ref014 from "@/docs/reference/instagram/anairamodarnoc_014.jpg";
import ref019 from "@/docs/reference/instagram/anairamodarnoc_019.jpg";
import ref020 from "@/docs/reference/instagram/anairamodarnoc_020.jpg";
import ref022 from "@/docs/reference/instagram/anairamodarnoc_022.jpg";
import ref029 from "@/docs/reference/instagram/anairamodarnoc_029.jpg";

export type { Light, Photo } from "@/content/types";

// Recorded by us, per photo: `others` counts identifiable people besides her.
// Reference photos never go public (content/check.ts), so their consent is not
// collected. The counts are our read of each frame and still provisional.
const entries: Photo[] = [
  {
    slug: "ref-003",
    image: ref003,
    alt: "selfie com flash à noite, de braço esticado e vista de cima: uma mulher de top preto e cabelo escuro curto, com um clarão de flash no céu escuro",
    caption: "é bafo né?!?!",
    date: "2024-07-21",
    light: "night",
    author: "unconfirmed",
    source: "reference",
    others: 0,
  },
  {
    slug: "ref-005",
    image: ref005,
    alt: "uma mulher deitada numa cama de veludo vermelho sob luz magenta, num palco com as letras luminosas VDV acima dela",
    caption: "meus dois moods",
    date: "2024-05-06",
    light: "night",
    author: "unconfirmed",
    source: "reference",
    others: 0,
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
    source: "reference",
    others: 0,
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
    source: "reference",
    others: 0,
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
    source: "reference",
    others: 2,
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
    source: "reference",
    others: 0,
  },
  {
    slug: "ref-025",
    image: ref025,
    alt: "uma mulher de calça jeans e top preto sentada numa grade de metal, sorrindo, com céu azul e carros ao fundo",
    caption: "😸😽",
    date: "2023-06-20",
    light: "day",
    author: "unconfirmed",
    source: "reference",
    others: 0,
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
    source: "reference",
    others: 2,
  },
  {
    slug: "ref-002",
    image: ref002,
    alt: "vista de cima com lente olho de peixe: uma mulher de óculos gatinho rosa, blusa rosa transparente e saia de paetê vinho num canto de paredes brancas",
    caption: "meu mundinho VDV 🎀🔥🫦💖🥺 gente vocês acreditam que eu conheci a mente por trás de girls in the house? 😭",
    date: "2024-09-20",
    light: "day",
    author: "unconfirmed",
    source: "reference",
    others: 0,
  },
  {
    slug: "ref-006",
    image: ref006,
    alt: "uma mulher de vestido preto curto sentada num trono sob uma grande cruz de paetê azul, com luz vermelha e magenta dos lados",
    caption: "i hear you call my name and it feels like home",
    captionLang: "en",
    date: "2024-04-22",
    light: "night",
    author: "unconfirmed",
    source: "reference",
    others: 0,
  },
  {
    slug: "ref-008",
    image: ref008,
    alt: "de perto, com flash: um pedaço de bolo com camadas de creme branco, rosa e chocolate derretendo",
    caption: "valeu março 🍦🦖🌽🏖️👱‍♀️🤪🐟🐠💃🏼🍰🎂🍓🥳🎉😵💋💓",
    date: "2024-04-05",
    light: "night",
    author: "unconfirmed",
    source: "reference",
    others: 0,
  },
  {
    slug: "ref-010",
    image: ref010,
    alt: "selfie de cima com flash à noite: uma mulher de cabelo preso e corset cinza, deitada, com o braço tatuado à frente da câmera",
    caption: "esse dia foi bafo meus amores 💅🏻",
    date: "2024-03-28",
    light: "night",
    author: "unconfirmed",
    source: "reference",
    others: 0,
  },
  {
    slug: "ref-011",
    image: ref011,
    alt: "à noite, numa calçada ao lado de sacos de areia e entulho: uma mulher de cropped e saia azul-cobalto e botas brancas de pelúcia",
    caption: "pratiquem a reciclagem 🫵🏻💋💙🦋🌹💖😍",
    date: "2024-03-18",
    light: "night",
    author: "unconfirmed",
    source: "reference",
    others: 0,
  },
  {
    slug: "ref-014",
    image: ref014,
    alt: "selfie inclinada com flash: uma mulher de brincos de globo espelhado e blazer risca de giz, perto de uma janela escura",
    caption: "🪩✨🫶🏻",
    date: "2023-12-31",
    light: "night",
    author: "unconfirmed",
    source: "reference",
    others: 0,
  },
  {
    slug: "ref-019",
    image: ref019,
    alt: "selfie no espelho de um banheiro de cabines rosa: uma mulher com tiara de orelhas de gato e roupa preta esconde o rosto com o celular",
    caption: "meu mundinho astral 🐈‍⬛💅🏻🤭💖",
    date: "2023-10-27",
    light: "day",
    author: "unconfirmed",
    source: "reference",
    others: 0,
  },
  {
    slug: "ref-020",
    image: ref020,
    alt: "à noite, diante de um muro coberto de cartazes: uma mulher de óculos escuros, top metálico e saia jeans longa",
    caption: "🥋🎀💘🫶🏻💖",
    date: "2023-10-03",
    light: "night",
    author: "unconfirmed",
    source: "reference",
    others: 0,
  },
  {
    slug: "ref-022",
    image: ref022,
    alt: "à noite, num terreno com telhas empilhadas: uma mulher de óculos, maiô recortado rosa, saia de cetim e botas brancas de pelúcia",
    caption: "🤧💖💅🏻🫶🏻💘😮‍💨✨",
    date: "2023-08-20",
    light: "night",
    author: "unconfirmed",
    source: "reference",
    others: 0,
  },
  {
    slug: "ref-029",
    image: ref029,
    alt: "à noite, ao lado de um táxi amarelo: uma mulher de top preto e calça cargo verde sorri segurando algo junto ao peito",
    caption: "coé agostinho, me dá essa moral",
    date: "2023-02-16",
    light: "night",
    author: "unconfirmed",
    source: "reference",
    others: 0,
  },
];

/** Checked (the build fails on a consent gap) and in diary order. */
export const photos: Photo[] = diaryOrder(assertContent(entries, series), series);

export function photoIndex(slug: string) {
  return photos.findIndex((p) => p.slug === slug);
}
