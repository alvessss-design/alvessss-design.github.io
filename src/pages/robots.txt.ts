import {site} from '../data/content';
export function GET(){return new Response(site.published&&site.origin?`User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain'}});}
