# Okapi Language

Okapi is a compile to JS/(TS) language, highly inspired by Civet and other similar languages.
It supports type annotations and JSX syntax, and is more of a syntax modification for JS than a new language.

Unlike [Civet](https://github.com/DanielXMoore/Civet), Okapi doesn't try to maintain compatiblity with TS, but TS could back transpiled to Okapi with a relatively simple codemod.
Another difference from Civet is that Okapi is a more extreme language which aims to be more concise.

It's currently in a very early stage, work on the compiler just started, and the language is still being designed. The very basics of the design are probably there, but everything about this language is subject to change. Even the name is a temporary choice and might change at a later time.

## This Codebase

The codebase contains the compiler which is written in Civet and the design of the language. Since I only just started working on the compiler, I'm building it on top of the code for another compiler I started building a while ago. You'll see both Civet and TS files, TS files are from the older compiler and I put them here for reference so it's easy to repurpose the older compiler as a whole system. This should be gone soon and the codebase will not contain any old code.

Use `npm run dev` to build and run the compiler, and `npm run dev-json` if you're outputting JSON for pretty printing the JSON.
