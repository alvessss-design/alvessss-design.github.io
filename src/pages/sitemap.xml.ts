import {site,projectPath} from '../data/content';
import {projects} from '../data/projects';
export function GET(){const paths=site.published&&site.origin?(['pt','en'] as const).flatMap(lang=>[`/${lang}`,...projects.map(p=>projectPath(lang,p.slug))]):[];return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>${new URL(path,site.origin).href}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml'}});}
