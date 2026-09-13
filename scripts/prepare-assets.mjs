import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const root='C:/Users/Thiago Alves/.codex/generated_images/01a09168-f3fc-7190-bcb1-9d5830a37efa/';
const assets=[['synthetic-memory','exec-1cb6a571-60ef-4e21-a476-f584e60c61b4.png'],['chromatic-silence','exec-db772d2a-22f3-478d-890a-acd84ecad849.png'],['future-rituals','exec-48c74ec0-02f7-4dff-b816-f0d05080fbb5.png']];
await mkdir('public/images',{recursive:true});
for(const [name,source] of assets)for(const width of [720,1672])await sharp(root+source).resize(width).webp({quality:85}).toFile(`public/images/${name}${width===720?'-small':''}.webp`);
