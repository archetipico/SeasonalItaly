import type { ShapeKey } from "@/data/shapes";

/** Paper cut-outs drawn for this project: viewBox is the square crop around the drawing with 3 units of margin, so it sits at the exact centre of its box. Class a is the body, b the detail, s and d take the background colour. */
const DRAWINGS: Record<ShapeKey, { box: string; art: JSX.Element }> = {
  limone: { box: "7 -2.14 94 94", art: <><path className="a" d="M10 52C18 24 60 14 82 32L94 40 88 50 92 62C70 88 26 86 10 52Z"/><path className="b" d="M78 28C84 12 96 10 98 10 98 22 92 32 80 34Z"/></> },
  arancia: { box: "7 9 86 86", art: <><circle className="a" cx="50" cy="52" r="40"/><path className="s" d="M50 22V82M24 37 76 67M24 67 76 37"/></> },
  pera: { box: "5.25 1 89.5 89.5", art: <><path className="a" d="M50 16C58 16 60 28 63 38 68 52 80 58 78 74 76 92 24 92 22 74 20 58 32 52 37 38 40 28 42 16 50 16Z"/><path className="b" d="M48 18 52 4 58 6 54 20Z"/></> },
  mela: { box: "3.92 3 92.17 92.17", art: <><path className="a" d="M50 30C62 18 90 22 90 52 90 78 70 94 58 92 54 90 46 90 42 92 30 94 10 78 10 52 10 22 38 18 50 30Z"/><path className="b" d="M50 28C50 14 62 6 74 6 74 20 64 30 50 28Z"/></> },
  ciliegia: { box: "4 5 92 92", art: <><circle className="a" cx="30" cy="70" r="20"/><circle className="a" cx="70" cy="74" r="20"/><path className="stem" d="M30 52C36 30 50 16 62 8 64 26 68 40 70 56"/></> },
  fico: { box: "8.5 5 83 83", art: <><path className="a" d="M50 8C54 8 54 20 58 26 72 40 88 52 84 70 80 90 20 90 16 70 12 52 28 40 42 26 46 20 46 8 50 8Z"/><ellipse className="d" cx="50" cy="80" rx="9" ry="4"/></> },
  cachi: { box: "7 11 86 86", art: <><circle className="a" cx="50" cy="56" r="38"/><path className="b" d="M50 26 26 14 36 30 18 32 38 38 50 30 62 38 82 32 64 30 74 14Z"/></> },
  uva: { box: "7 3 90 90", art: <><g className="a"><circle cx="30" cy="38" r="12"/><circle cx="52" cy="38" r="12"/><circle cx="74" cy="38" r="12"/><circle cx="41" cy="58" r="12"/><circle cx="63" cy="58" r="12"/><circle cx="52" cy="78" r="12"/></g><path className="b" d="M50 28C44 16 54 6 72 6 72 18 62 28 50 28Z"/></> },
  pomodoro: { box: "4.81 4.81 90.38 90.38", art: <><path className="a" d="M50 26C80 18 94 40 92 58 90 84 66 92 50 92 34 92 10 84 8 58 6 40 20 18 50 26Z"/><path className="b" d="M50 34 34 40 42 28 28 20 46 22 50 8 54 22 72 20 58 28 66 40Z"/></> },
  melanzana: { box: "4.24 3 91.93 91.93", art: <><path className="a" d="M30 28C52 20 84 52 88 74 92 92 66 96 48 88 28 78 10 44 30 28Z"/><path className="b" d="M36 38C22 40 14 26 12 12L24 20 30 6 38 22 50 20C48 28 44 34 36 38Z"/></> },
  carciofo: { box: "3 5 94 94", art: <><path className="a" d="M50 8C74 22 86 46 78 66 72 80 28 80 22 66 14 46 26 22 50 8Z"/><path className="s" d="M50 12V74M30 40C38 46 46 52 50 62 54 52 62 46 70 40M24 58C32 62 42 68 50 76 58 68 68 62 76 58"/><path className="b" d="M44 76H56L58 96H42Z"/></> },
  carota: { box: "3.53 -1 98 98", art: <><path className="a" d="M32 30C44 22 62 24 68 32 62 56 40 88 28 94 20 72 22 48 32 30Z"/><path className="b" d="M52 26C46 12 50 4 56 2 60 8 60 14 58 20 66 10 76 8 82 10 80 20 70 26 60 28Z"/></> },
  pisello: { box: "3 3.37 94 94", art: <><path className="a" d="M6 70C30 94 78 78 94 20 70 44 30 50 6 70Z"/><g className="d"><circle cx="30" cy="68" r="7"/><circle cx="50" cy="60" r="7"/><circle cx="68" cy="46" r="7"/></g></> },
  zucchina: { box: "4.6 -2.67 96.4 96.4", art: <><rect className="a" x="10" y="34" width="72" height="30" rx="15" transform="rotate(-32 50 50)"/><path className="b" d="M78 18 94 8 98 16 84 28Z"/></> },
  castagna: { box: "10.9 8.4 78.19 78.19", art: <><path className="a" d="M50 12C58 26 88 44 86 66 84 86 16 86 14 66 12 44 42 26 50 12Z"/><path className="b" d="M14.5 68C30 62 70 62 85.5 68 82 88 18 88 14.5 68Z"/></> },
  fragola: { box: "2 1 96 96", art: <><path className="a" d="M50 24C72 14 92 30 86 50 80 70 62 92 50 94 38 92 20 70 14 50 8 30 28 14 50 24Z"/><path className="b" d="M50 28 30 32 38 20 26 8 46 14 50 4 54 14 74 8 62 20 70 32Z"/></> },
  pesca: { box: "2.81 0.62 94.38 94.38", art: <><path className="a" d="M50 20C76 8 96 34 90 58 86 80 62 92 50 92 38 92 14 80 10 58 4 34 24 8 50 20Z"/><path className="s" d="M50 22C42 44 42 70 50 90"/><path className="b" d="M52 20C54 8 66 2 80 4 78 16 66 24 52 20Z"/></> },
  anguria: { box: "1 8 98 98", art: <><path className="a" d="M4 34A46 46 0 0 0 96 34Z"/><g className="d"><circle cx="30" cy="48" r="4"/><circle cx="50" cy="56" r="4"/><circle cx="70" cy="48" r="4"/><circle cx="50" cy="42" r="4"/></g></> },
  zucca: { box: "5 5 90 90", art: <><ellipse className="a" cx="50" cy="58" rx="42" ry="32"/><path className="s" d="M50 28V88M28 32C20 48 20 72 28 84M72 32C80 48 80 72 72 84"/><path className="b" d="M44 28 46 10 58 12 56 28Z"/></> },
  asparago: { box: "3 -3 98 98", art: <><g className="a"><path d="M24 92 32 22 38 22 36 92Z"/><path d="M46 92 50 12 56 12 58 92Z"/><path d="M68 92 66 26 72 26 80 92Z"/></g><g className="b"><ellipse cx="35" cy="18" rx="6" ry="10"/><ellipse cx="53" cy="10" rx="6" ry="10"/><ellipse cx="69" cy="22" rx="6" ry="10"/></g></> },
  cavolo: { box: "5 5 90 90", art: <><circle className="a" cx="50" cy="50" r="42"/><path className="s" d="M50 90V40M50 66C38 58 28 46 24 32M50 66C62 58 72 46 76 32M50 44C44 36 42 26 44 16M50 44C56 36 58 26 56 16"/></> },
  broccolo: { box: "3.5 3 94 94", art: <><g className="a"><circle cx="30" cy="38" r="20"/><circle cx="52" cy="28" r="22"/><circle cx="72" cy="42" r="19"/><circle cx="50" cy="50" r="18"/></g><path className="b" d="M38 58H62L58 94H42Z"/></> },
  peperone: { box: "5 5 90 90", art: <><path className="a" d="M50 28C64 20 88 28 86 54 84 74 72 92 62 92 56 92 54 88 50 88 46 88 44 92 38 92 28 92 16 74 14 54 12 28 36 20 50 28Z"/><path className="b" d="M44 30 46 12 58 8 58 14 54 30Z"/></> },
  kiwi: { box: "7 7 86 86", art: <><circle className="a" cx="50" cy="50" r="40"/><circle className="d" cx="50" cy="50" r="9"/><g className="d"><circle cx="50" cy="26" r="3.5"/><circle cx="67" cy="33" r="3.5"/><circle cx="74" cy="50" r="3.5"/><circle cx="67" cy="67" r="3.5"/><circle cx="50" cy="74" r="3.5"/><circle cx="33" cy="67" r="3.5"/><circle cx="26" cy="50" r="3.5"/><circle cx="33" cy="33" r="3.5"/></g></> },
  finocchio: { box: "2 -1 96 96", art: <><path className="b" d="M40 32 34 6 42 6 47 32ZM60 32 66 6 58 6 53 32ZM47 32 47 2 53 2 53 32Z"/><path className="a" d="M50 92C28 92 16 78 20 60 23 46 36 42 40 28L60 28C64 42 77 46 80 60 84 78 72 92 50 92Z"/><path className="s" d="M50 44V84M36 58C37 70 40 78 44 86M64 58C63 70 60 78 56 86"/></> },
  spinacio: { box: "4 5 92 92", art: <><path className="b" d="M46 70H54V94H46Z"/><path className="a" d="M50 8C74 18 86 40 78 60 72 74 60 78 50 78 40 78 28 74 22 60 14 40 26 18 50 8Z"/><path className="s" d="M50 18V74M50 38 36 30M50 38 64 30M50 54 32 46M50 54 68 46"/></> },
  ravanello: { box: "1 1 98 98", art: <><path className="b" d="M50 36C40 28 30 18 32 4 44 8 50 20 50 36ZM50 36C60 28 70 18 68 4 56 8 50 20 50 36Z"/><path className="a" d="M50 34C72 34 82 50 76 64 70 78 56 82 50 96 44 82 30 78 24 64 18 50 28 34 50 34Z"/></> },
};

/**
 * Draw one produce illustration.
 * @param props.shape Illustration to draw.
 * @returns Decorative svg, hidden from assistive technology by its parent.
 */
export function Cutout({ shape }: { shape: ShapeKey }) {
  const { box, art } = DRAWINGS[shape];
  return (
    <svg className="cut" viewBox={box}>
      {art}
    </svg>
  );
}
