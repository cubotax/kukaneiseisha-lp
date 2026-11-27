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
  return new Response(html, { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } });
}
