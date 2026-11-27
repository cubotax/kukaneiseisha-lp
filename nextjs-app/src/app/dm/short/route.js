import { createHash } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const headers = {
  'Cache-Control': 'private, no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data:; font-src 'none'; connect-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
};
const digest = value => createHash('sha256').update(value).digest();
const unavailable = () => new Response('DM viewer unavailable', { status: 503, headers });

function addHotelSticker(html) {
  const start = html.indexOf('<main class="dm-document" data-design="11" hidden="" id="dm-hotel">');
  const end = html.indexOf('</main>', start);
  if (start < 0 || end < 0) throw Error('Hotel document not found');
  const pages = html.slice(start, end).split('<section class="sheet">');
  if (pages.length !== 7) throw Error('Unexpected page count');
  const footer = '</div><footer class="footer">';
  const anchor = '<p>客室の雰囲気を損なわない、シンプルで落ち着いたデザインを使用しています。</p>';
  const report = '<h2 class="section">ホテル内のエアコン内部は、今どのような状態になっているのでしょうか？</h2>';
  const trial = '<h2 class="section">初めてでも安心していただける特別なプランをご用意しました。</h2>';
  if (!pages[3].includes(anchor + report) || !pages[4].includes(trial) || !pages[5].startsWith('<div class="content">')) throw Error('Hotel layout changed');
  function transfer(from, to, heading) {
    const i = pages[from].indexOf(heading);
    const j = pages[from].lastIndexOf(footer);
    if (i < 0 || j <= i) throw Error('Cannot move content');
    const moved = pages[from].slice(i,j);
    pages[from] = pages[from].slice(0,i) + pages[from].slice(j);
    const opening = '<div class="content">';
    if (!pages[to].startsWith(opening)) throw Error('Unexpected page opening');
    pages[to] = opening + moved + pages[to].slice(opening.length);
  }
  transfer(4,5,trial);
  transfer(3,4,report);
  pages[3] = pages[3].replace(anchor,anchor + '<figure class="hotel-sticker" style="margin:3mm 0 4mm;text-align:center;break-inside:avoid;"><img alt="エアコン内部洗浄済シール" src="/dm/short-assets/hotel-sticker-20261127.png" style="display:block;width:76mm;height:auto;max-width:100%;margin:0 auto;"></figure>');
  return html.slice(0,start) + pages.join('<section class="sheet">') + html.slice(end);
}

export function GET() {
  const parts = Array.from({ length: 8 }, (_, i) => process.env['DM_SHORT_V6_HTML_' + (i + 1)]);
  if (parts.some(p => typeof p !== 'string' || !p)) return unavailable();
  const html = parts.join('');
  if (digest(html).toString('hex') !== '2fc39f994cfcb61180907f9a9369e66f9b09d4cd31525c93fd308169c23b0ded') return unavailable();
  let updatedHtml;
  try {
    updatedHtml = addHotelSticker(html);
    const originalPhotos = "<div class=\"photo-row\"><figure><div class=\"placeholder\">実際の写真を掲載<br/>吹出口内部</div><figcaption>吹出口の奥に付着した汚れ</figcaption></figure><figure><div class=\"placeholder\">実際の写真を掲載<br/>ドレンパン</div><figcaption>ドレンパンに蓄積した汚れ</figcaption></figure></div>";
    if (updatedHtml.split(originalPhotos).length !== 5) return unavailable();
    updatedHtml = updatedHtml.replaceAll(originalPhotos, "<div class=\"photo-row dirt-photo-row\"><figure><img alt=\"送風ファンに付着した汚れ\" src=\"/dm/short-assets/dm-fan-20261127.jpg\"/><figcaption>送風ファンに付着した汚れ</figcaption></figure><figure><img alt=\"ドレンパンに蓄積した汚れ\" src=\"/dm/short-assets/dm-drain-pan-20261127.jpg\"/><figcaption>ドレンパンに蓄積した汚れ</figcaption></figure><figure><img alt=\"アルミフィンに付着した汚れ\" src=\"/dm/short-assets/dm-fin-20261127.jpg\"/><figcaption>アルミフィンに付着した汚れ</figcaption></figure></div>");
    updatedHtml = updatedHtml.replace('</head>', "<style>.sheet .dirt-photo-row{grid-template-columns:repeat(3,minmax(0,1fr));gap:2mm}.sheet .dirt-photo-row img,.sheet:first-child .dirt-photo-row img{width:100%;height:auto;aspect-ratio:4/3;object-fit:contain;display:block}#dm-hoikuen .sheet:first-child .content p,#dm-elder .sheet:first-child .content p{margin-bottom:3mm}#dm-hoikuen .sheet:first-child .lead-question,#dm-elder .sheet:first-child .lead-question{margin-bottom:3mm!important}.sheet .dirt-photo-row figcaption{font-size:9pt;line-height:1.4;margin-top:1mm;text-align:center}</style></head>");
  } catch { return unavailable(); }
  // Mobile preview only; the approved document and print CSS stay unchanged.
  const responsiveHtml = updatedHtml.replace('</head>', "<style>@media screen and (max-width: 830px) {\n  html,body{width:100%;max-width:100%;margin:0;-webkit-text-size-adjust:100%}\n  .toolbar{position:static;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:12px 12px 10px;max-width:100%;font-size:14px}\n  .toolbar .nav-label,.toolbar .print-action,.toolbar .page-summary,.toolbar .help{grid-column:1/-1;text-align:center;min-width:0}\n  .toolbar .nav-label{font-size:16px;margin-bottom:3px}\n  .toolbar .dm-tab,.toolbar .print-action{width:100%;margin:0;min-height:44px;padding:8px 4px;white-space:normal}\n  .toolbar .page-summary{font-size:12px}\n  .toolbar .help{font-size:11px;line-height:1.5}\n  .workspace{width:100%;max-width:100%;padding:0 8px;overflow-x:auto}\n  .workspace .sheet{zoom:var(--dm-mobile-scale,0.38);margin:12px auto}\n}\n</style></head>")
    .replace('</body>', "<script>(function(){\n  var workspace=document.querySelector('.workspace');\n  if(!workspace)return;\n  function fit(){\n    var available=workspace.clientWidth-16;\n    var scale=Math.min(1,Math.max(0.1,(available-1)/(210*96/25.4)));\n    workspace.style.setProperty('--dm-mobile-scale',String(scale));\n  }\n  fit();\n  window.addEventListener('resize',fit,{passive:true});\n})();\n</script></body>");
  return new Response(responsiveHtml, { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } });
}
