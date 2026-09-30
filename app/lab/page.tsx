import Link from "next/link";

import { Surface } from "@/components/site/surface";

const directions = [
  {
    href: "/lab/a",
    name: "revelação",
    line: "o nome ocupa a tela inteira. a foto nasce do papel branco, sombras primeiro, em WebGL.",
  },
  {
    href: "/lab/b",
    name: "contato",
    line: "a folha de contato na mesa de luz. lupa, lápis-cera, e a ampliação saindo do flash.",
  },
  {
    href: "/lab/c",
    name: "pilha",
    line: "prints de verdade em 3D. brilho, peso, arremesso, e o verso com o que ela escreveu.",
  },
  {
    href: "/lab/d",
    name: "metamorfose",
    line: "uma foto vira a outra dentro da print: derrete, ondula, fatia. molha sob o dedo. abre virando a página.",
  },
];

export default function Lab() {
  return (
    <main className="flex min-h-svh flex-col justify-center gap-12 px-[var(--gutter)] py-24">
      <Surface light="night" />
      <h1 className="font-mono text-xs tracking-wide text-ink-quiet">lab · três direções para a home</h1>
      <ol className="flex flex-col gap-10">
        {directions.map((d, i) => (
          <li key={d.href}>
            <Link href={d.href} className="group flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-10">
              <span className="font-display text-[clamp(3rem,10vw,9rem)] leading-none font-medium [font-variation-settings:'opsz'_96] group-hover:text-link">
                <span className="mr-4 align-top font-mono text-sm text-ink-quiet">{String.fromCharCode(97 + i)}</span>
                {d.name}
              </span>
              <span className="max-w-[40ch] text-ink-quiet">{d.line}</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
