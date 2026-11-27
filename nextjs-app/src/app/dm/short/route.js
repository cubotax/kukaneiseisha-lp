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

export function GET() {
  const parts = Array.from({ length: 8 }, (_, i) => process.env['DM_SHORT_V6_HTML_' + (i + 1)]);
  if (parts.some(p => typeof p !== 'string' || !p)) return unavailable();
  const html = parts.join('');
  if (digest(html).toString('hex') !== '2fc39f994cfcb61180907f9a9369e66f9b09d4cd31525c93fd308169c23b0ded') return unavailable();
  // Mobile preview only; the approved document and print CSS stay unchanged.
  const responsiveHtml = html.replace('</head>', "<style>@media screen and (max-width: 830px) {\n  html,body{width:100%;max-width:100%;margin:0;-webkit-text-size-adjust:100%}\n  .toolbar{position:static;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:12px 12px 10px;max-width:100%;font-size:14px}\n  .toolbar .nav-label,.toolbar .print-action,.toolbar .page-summary,.toolbar .help{grid-column:1/-1;text-align:center;min-width:0}\n  .toolbar .nav-label{font-size:16px;margin-bottom:3px}\n  .toolbar .dm-tab,.toolbar .print-action{width:100%;margin:0;min-height:44px;padding:8px 4px;white-space:normal}\n  .toolbar .page-summary{font-size:12px}\n  .toolbar .help{font-size:11px;line-height:1.5}\n  .workspace{width:100%;max-width:100%;padding:0 8px;overflow-x:auto}\n  .workspace .sheet{zoom:var(--dm-mobile-scale,0.38);margin:12px auto}\n}\n</style></head>")
    .replace('</body>', "<script>(function(){\n  var workspace=document.querySelector('.workspace');\n  if(!workspace)return;\n  function fit(){\n    var available=workspace.clientWidth-16;\n    var scale=Math.min(1,Math.max(0.1,(available-1)/(210*96/25.4)));\n    workspace.style.setProperty('--dm-mobile-scale',String(scale));\n  }\n  fit();\n  window.addEventListener('resize',fit,{passive:true});\n})();\n</script></body>");
  return new Response(responsiveHtml, { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } });
}
