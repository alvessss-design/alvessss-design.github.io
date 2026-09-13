import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
export default [
 {ignores:['dist/**','.astro/**','node_modules/**','output/**']},
 js.configs.recommended,
 ...ts.configs.recommended,
 ...astro.configs.recommended,
 {files:['src/scripts/**/*.ts'],languageOptions:{globals:Object.fromEntries(['window','document','HTMLElement','HTMLAnchorElement','HTMLButtonElement','HTMLDialogElement','HTMLVideoElement','IntersectionObserver','requestAnimationFrame','cancelAnimationFrame','performance','addEventListener','innerHeight','innerWidth','navigator','location','sessionStorage','scrollY','scrollTo','history','URLSearchParams'].map(k=>[k,'readonly']))}},
 {files:['src/**/*.astro'],rules:{'@typescript-eslint/no-unused-vars':'off'}},
 {files:['**/*.mjs'],languageOptions:{globals:{process:'readonly',console:'readonly',URL:'readonly'}}},
];
