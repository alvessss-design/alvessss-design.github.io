import {readFile,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
const slugs=['synthetic-memory','chromatic-silence','future-rituals'];let total=0;
for(const lang of ['pt','en']){
 const routes=[lang,...slugs.map(s=>`${lang}/${lang==='pt'?'trabalhos':'works'}/${s}`)];
 for(const route of routes){
  const html=await readFile(`dist/${route}/index.html`,'utf8');
  assert(html.includes(`lang="${lang==='pt'?'pt-BR':'en'}"`),`Wrong language: ${route}`);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`Single h1: ${route}`);
  assert(html.includes('name="description"'),'Missing description');
  assert(html.includes('noindex,nofollow'),'Demo must not be indexed');
  assert(!html.includes('href="#"'),'Empty link');
  for(const match of html.matchAll(/(?:src|href)="(\/(?:images|_astro)\/[^"?#]+)"/g))await stat(`dist${match[1]}`);
  if(route===lang)for(const slug of slugs)assert(html.includes(`/${lang}/${lang==='pt'?'trabalhos':'works'}/${slug}`));
  else{const equivalent=`/${lang==='pt'?'en/works':'pt/trabalhos'}/${route.split('/').at(-1)}`;assert(html.includes(equivalent),'Missing equivalent language route');}
  total++;
 }
}
assert((await readFile('dist/robots.txt','utf8')).includes('Disallow: /'));
console.log(`PASS: ${total} localized pages, project links, equivalent languages, metadata and local assets. Demonstration indexing disabled.`);
