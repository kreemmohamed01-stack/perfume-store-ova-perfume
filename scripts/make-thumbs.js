// Builds images/thumbs/: a 320px WebP copy of every image under images/ wider
// than 360px. Product cards offer these through srcset (see ovaApplyThumb in
// src/home.js and ovaThumbAttrs in js/catalog.js), so run this after adding
// new product images. Needs ffmpeg/ffprobe on PATH.
// Usage: node scripts/make-thumbs.js [repoRoot]
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const root=process.argv[2]||path.join(__dirname,"..");let made=0,skipped=0;
function walk(d){for(const f of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,f.name);if(f.isDirectory()){if(!/thumbs$/.test(p))walk(p)}else if(/\.(webp|jpe?g|png)$/i.test(f.name))one(p)}}
function one(p){const rel=path.relative(path.join(root,'images'),p);const out=path.join(root,'images','thumbs',rel.replace(/\.(webp|jpe?g|png)$/i,'.webp'));
 let w;try{w=+execFileSync('ffprobe',['-v','error','-select_streams','v:0','-show_entries','stream=width','-of','csv=p=0',p]).toString().trim()}catch(e){return}
 if(!(w>360)){skipped++;return}
 if(fs.existsSync(out)&&fs.statSync(out).mtimeMs>=fs.statSync(p).mtimeMs){skipped++;return}
 fs.mkdirSync(path.dirname(out),{recursive:true});
 execFileSync('ffmpeg',['-v','error','-y','-i',p,'-vf','scale=320:-2:flags=lanczos','-c:v','libwebp','-quality','82','-pix_fmt','yuva420p',out]);made++}
walk(path.join(root,'images'));console.log('made',made,'skipped',skipped);
