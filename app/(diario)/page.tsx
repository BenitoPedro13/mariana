import { DiarioHeader, type NavItem } from "@/components/diario/header";
import { AboutStrip } from "@/components/diario/about-strip";
import { DiarioHero } from "@/components/diario/hero";
import { Roster } from "@/components/diario/roster";
import { Surface } from "@/components/site/surface";
import { photos } from "@/content/photos";

// The three hero photos: a night, a day and a night, one saturated colour each.
const HERO = ["ref-006", "ref-016", "ref-029"];

const NAV: NavItem[] = [
  { id: "sobre", label: "sobre" },
  { id: "fotos", label: "fotos" },
  { id: "series", label: "séries" },
];

export default function Diario() {
  const hero = HERO.map((slug) => photos.find((p) => p.slug === slug)!).filter(Boolean);
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
      </main>
    </>
  );
}
