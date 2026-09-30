import { DiarioHeader, type NavItem } from "@/components/diario/header";
import { AboutStrip } from "@/components/diario/about-strip";
import { Curtain } from "@/components/diario/curtain";
import { Gallery } from "@/components/diario/gallery";
import { DiarioHero } from "@/components/diario/hero";
import { Roster } from "@/components/diario/roster";
import { Surface } from "@/components/site/surface";
import { photos } from "@/content/photos";

// The three hero photos: a night, a day and a night, one saturated colour each.
const HERO = ["ref-006", "ref-016", "ref-029"];

// S6: the photo that parts, and the three captions that pass through it.
const CURTAIN = { cover: "ref-005", photos: ["ref-007", "ref-002", "ref-008"] };

// S7: the timed run of five, nights and days mixed.
const SELECAO = ["ref-003", "ref-019", "ref-011", "ref-025", "ref-022"];

const NAV: NavItem[] = [
  { id: "sobre", label: "sobre" },
  { id: "fotos", label: "fotos" },
  { id: "legendas", label: "legendas" },
];

const pick = (slug: string) => {
  const p = photos.find((x) => x.slug === slug);
  if (!p) throw new Error(`diário: no photo "${slug}"`);
  return p;
};

export default function Diario() {
  const hero = HERO.map(pick);
  const years = photos.map((p) => p.date.slice(0, 4)).sort();
  const span = years[0] === years.at(-1) ? years[0] : `${years[0]} — ${years.at(-1)}`;
  const counts = {
    night: photos.filter((p) => p.light === "night").length,
    day: photos.filter((p) => p.light === "day").length,
    all: photos.length,
  };

  return (
    <>
      <Surface light="night" />
      <DiarioHeader nav={NAV} years={span} />
      <main>
        <DiarioHero photos={hero} counts={counts} />
        <AboutStrip photos={photos} counts={counts} years={[years[0], years.at(-1)!]} />
        <Roster photos={photos} counts={counts} />
        <Curtain
          cover={pick(CURTAIN.cover)}
          photos={CURTAIN.photos.map(pick)}
        />
        <Gallery photos={SELECAO.map(pick)} numbers={SELECAO.map((slug) => photos.indexOf(pick(slug)) + 1)} />
      </main>
    </>
  );
}
