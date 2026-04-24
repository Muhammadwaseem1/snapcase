# snapcase

Every case format you need, one click away.

snapcase takes whatever you throw at it — a messy variable name, a sentence, a file path, a Slack message — and spits out 16 different case formats side by side. No sign-ups, no tracking, no server round-trip. Just a fast input box and a wall of one-click-copy cards.

## What it does

— converts text into 16 formats: camelCase, PascalCase, snake_case, CONSTANT_CASE, kebab-case, COBOL-CASE, Train-Case, Title Case, Sentence case, dot.case, path/case, UPPER, lower, sWaP cAsE, reverse, and aLtErNaTiNg
— smart tokenizer that understands camelCase boundaries, acronyms (HTMLParser → html parser), digits, and every common separator (`_`, `-`, `.`, `/`, spaces, commas)
— live stats: characters, words, lines, tokens
— filter chips to narrow down to just code-style, prose-style, or the funky ones
— one-click copy on every card with a clipboard fallback for locked-down browsers
— sample button if you just want to see what it does

## Getting started

```bash
git clone https://github.com/Muhammadwaseem1/snapcase.git
cd snapcase
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To ship a static build:

```bash
npm run build
npm run start
```

## Built with

— Next.js 15 (App Router)
— React 19
— TypeScript 5
— Tailwind CSS 3
— zero runtime dependencies for the conversion itself — it all happens in the browser

## Why I built this

I kept finding myself googling "snake to camel converter" and landing on ad-riddled pages that wanted me to click through three modals before showing me the result. I wanted something that loads in a blink, shows every format at once so I don't have to pick the right tool, and never leaves my machine. Built on a Saturday night in a single sitting — the kind of tool you add to your bookmarks bar and forget exists until you need it, which is exactly the point.

## License

MIT — do whatever you want with it.
