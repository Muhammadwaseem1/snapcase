// Pure, dependency-free case conversion utilities.
// Splits any input (spaces, punctuation, camelCase, mixed) into normalized tokens,
// then reassembles into the requested case format.

export type CaseId =
  | "camel"
  | "pascal"
  | "snake"
  | "constant"
  | "kebab"
  | "cobol"
  | "train"
  | "title"
  | "sentence"
  | "dot"
  | "path"
  | "upper"
  | "lower"
  | "swap"
  | "reverse"
  | "alternating";

export interface CaseDef {
  id: CaseId;
  label: string;
  hint: string;
  transform: (input: string) => string;
}

// Split a string into lowercase tokens, handling:
// - spaces, hyphens, underscores, dots, slashes, commas
// - camelCase / PascalCase boundaries
// - acronyms (e.g. "HTMLParser" -> ["html", "parser"])
// - digit boundaries
export function tokenize(input: string): string[] {
  if (!input) return [];
  // Normalize separators to spaces
  const normalized = input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // camelCase boundary
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // acronym boundary
    .replace(/([a-zA-Z])([0-9])/g, "$1 $2")
    .replace(/([0-9])([a-zA-Z])/g, "$1 $2")
    .replace(/[_\-./\\,:;|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!normalized) return [];
  return normalized.split(" ").map((t) => t.toLowerCase());
}

const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

export const CASES: CaseDef[] = [
  {
    id: "camel",
    label: "camelCase",
    hint: "JS variables, fn names",
    transform: (s) => {
      const t = tokenize(s);
      if (!t.length) return "";
      return t[0] + t.slice(1).map(cap).join("");
    },
  },
  {
    id: "pascal",
    label: "PascalCase",
    hint: "Classes, React components",
    transform: (s) => tokenize(s).map(cap).join(""),
  },
  {
    id: "snake",
    label: "snake_case",
    hint: "Python, Ruby, SQL",
    transform: (s) => tokenize(s).join("_"),
  },
  {
    id: "constant",
    label: "CONSTANT_CASE",
    hint: "Env vars, constants",
    transform: (s) => tokenize(s).join("_").toUpperCase(),
  },
  {
    id: "kebab",
    label: "kebab-case",
    hint: "URLs, CSS classes",
    transform: (s) => tokenize(s).join("-"),
  },
  {
    id: "cobol",
    label: "COBOL-CASE",
    hint: "HTTP headers",
    transform: (s) => tokenize(s).join("-").toUpperCase(),
  },
  {
    id: "train",
    label: "Train-Case",
    hint: "HTTP-Header style",
    transform: (s) => tokenize(s).map(cap).join("-"),
  },
  {
    id: "title",
    label: "Title Case",
    hint: "Headings",
    transform: (s) => tokenize(s).map(cap).join(" "),
  },
  {
    id: "sentence",
    label: "Sentence case",
    hint: "Prose",
    transform: (s) => {
      const t = tokenize(s);
      if (!t.length) return "";
      return [cap(t[0]), ...t.slice(1)].join(" ");
    },
  },
  {
    id: "dot",
    label: "dot.case",
    hint: "Config keys",
    transform: (s) => tokenize(s).join("."),
  },
  {
    id: "path",
    label: "path/case",
    hint: "File paths",
    transform: (s) => tokenize(s).join("/"),
  },
  {
    id: "upper",
    label: "UPPER CASE",
    hint: "All uppercase",
    transform: (s) => s.toUpperCase(),
  },
  {
    id: "lower",
    label: "lower case",
    hint: "All lowercase",
    transform: (s) => s.toLowerCase(),
  },
  {
    id: "swap",
    label: "sWaP cAsE",
    hint: "Invert each letter",
    transform: (s) =>
      s
        .split("")
        .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join(""),
  },
  {
    id: "reverse",
    label: "esreveR",
    hint: "Reverse characters",
    transform: (s) => s.split("").reverse().join(""),
  },
  {
    id: "alternating",
    label: "aLtErNaTiNg",
    hint: "Mocking Spongebob",
    transform: (s) =>
      s
        .split("")
        .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
        .join(""),
  },
];

export function stats(input: string) {
  const chars = input.length;
  const charsNoSpace = input.replace(/\s/g, "").length;
  const words = input.trim() ? input.trim().split(/\s+/).length : 0;
  const lines = input ? input.split(/\r?\n/).length : 0;
  const tokens = tokenize(input).length;
  return { chars, charsNoSpace, words, lines, tokens };
}
