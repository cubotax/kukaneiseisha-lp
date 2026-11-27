import { createHash, createDecipheriv } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import part1 from './v20-part1';
import part2 from './v20-part2';
import part3 from './v20-part3';
import part4 from './v20-part4';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = {
  'Cache-Control': 'private, no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data:; font-src data:; connect-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
};
let cached;
export function GET() {
  try {
    const key = process.env.DM_SHORT_V20_KEY;
    if (!key || !/^[a-f0-9]{64}$/.test(key)) throw Error('DM key unavailable');
    if (!cached) {
      const payload = Buffer.from(part1 + part2 + part3 + part4, 'base64');
      const decipher = createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), payload.subarray(0,12));
      decipher.setAuthTag(payload.subarray(-16));
      const html = gunzipSync(Buffer.concat([decipher.update(payload.subarray(12,-16)),decipher.final()]));
      if (createHash('sha256').update(html).digest('hex') !== '70cabdca52acc6e433e1970cef4caef75092e0fbea992f94d58af4b052b9b5f9') throw Error('DM integrity check failed');
      const approvedHtml = html.toString('utf8');
      const stickerStyle = "alt=\"エアコン内部洗浄済シール\" data-dm-image=\"asset4\" style=\"display:block;width:76mm;height:auto;max-width:100%;margin:0 auto;\"";
      // Enlarge only the hotel sticker; keep the approved encrypted document intact.
      cached = approvedHtml.replace(stickerStyle, stickerStyle.replace('76mm', '96mm'));
    }
    return new Response(cached, { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } });
  } catch {
    return new Response('DM viewer unavailable', { status: 503, headers });
  }
}
