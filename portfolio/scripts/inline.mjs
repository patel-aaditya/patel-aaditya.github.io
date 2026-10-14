// Folds the preview build into one HTML fragment: title, fonts, CSS, root, JS.
import fs from 'node:fs'
import path from 'node:path'

const dir = 'dist-preview'
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8')
const jsRef = html.match(/src="(\.\/assets\/[^"]+\.js)"/)?.[1]
const cssRef = html.match(/href="(\.\/assets\/[^"]+\.css)"/)?.[1]
if (!jsRef || !cssRef) throw new Error('Could not find built JS/CSS in dist-preview/index.html')

const js = fs
  .readFileSync(path.join(dir, jsRef), 'utf8')
  .replace(/<\/script/gi, '<\\/script')
  .replace(/<!--/g, '<\\!--')
const css = fs.readFileSync(path.join(dir, cssRef), 'utf8')

const fontsHref = html.match(/href="(https:\/\/fonts\.googleapis\.com[^"]+)"/)?.[1]
if (!fontsHref) throw new Error('Fonts link not found in dist-preview/index.html')

const out = `<title>Aaditya Patel</title>
<link rel="stylesheet" href="${fontsHref}">
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`
fs.writeFileSync(path.join(dir, 'preview.html'), out)
console.log('preview.html written,', Math.round(out.length / 1024), 'KB')
