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
      const withSticker = approvedHtml.replace(stickerStyle, stickerStyle.replace('76mm', '96mm'));
      const offerPattern = /(<div class="offer">[\s\S]*?<\/div>)(<p>[^<]*10％割引[^<]*<\/p>)/g;
      const offerMatches = [...withSticker.matchAll(offerPattern)];
      // Keep the document available even if a future source changes the markup.
      cached = offerMatches.length === 4
        ? withSticker.replace(offerPattern, '$2$1').replace('</head>', "<style id=\"offer-v23\">\n.sheet .offer{position:relative;border:1px solid var(--navy);background:#fff;box-shadow:inset 0 0 0 3px #fff,inset 0 0 0 4px var(--line);padding:5mm 6mm;width:65%;margin:3mm auto 4mm;text-align:center;break-inside:avoid;color:var(--navy)}\n.sheet .offer::before,.sheet .offer::after{content:none;display:none}\n.sheet .offer .sub:first-child{display:flex;align-items:center;justify-content:center;gap:4mm;font-size:15pt;line-height:1.35;letter-spacing:.06em;font-weight:600}\n.sheet .offer .sub:first-child::before,.sheet .offer .sub:first-child::after{content:\"\";width:15mm;height:1px;background:var(--line)}\n.sheet .offer .big{font-size:41pt;font-weight:700;line-height:1.08;letter-spacing:.035em;margin:1mm 0!important}\n.sheet .offer .sub:last-child{display:inline-block;font-size:15pt;line-height:1.35;border-top:1px solid var(--line);padding:1.4mm 8mm 0;font-weight:600;letter-spacing:.025em}\n</style></head>")
        : withSticker;
      // Omit unavailable large-facility work photos and their captions only.
      cached = cached.replaceAll("<div class=\"wide-photo\"><div class=\"placeholder large\" style=\";height:36mm!important\">実際の大型施設での施工写真を掲載</div><div class=\"figure-caption\">大型施設でのエアコン洗浄作業</div></div>", '');
      // Swap the first two photo rows; retain alternating sides and unchanged copy.
      const photoOrder = /(<section class="item"><figure><img alt="送風ファンの汚れ"[\s\S]*?<\/section>)(<section class="item reverse"><figure><img alt="ドレンパンの汚れ"[\s\S]*?<\/section>)/g;
      if ([...cached.matchAll(photoOrder)].length === 4) {
        cached = cached.replace(photoOrder, (_match, fan, drain) => drain.replace('<section class="item reverse">', '<section class="item">') + fan.replace('<section class="item">', '<section class="item reverse">'));
      }
      // Separate and emphasize the specified sentence in the three applicable DMs.
      cached = cached.replaceAll("しかし、エアコン内部は、日々の清掃だけでは手が届かない場所です。</p>", "</p><p><strong><span class=\"body-emphasis\">しかし、エアコンの内部は、日々の清掃だけでは手が届かない場所です。</span></strong></p>");
      // Update the drain-pan description only, in each industry DM.
      cached = cached.replaceAll("冷房や除湿運転で発生した結露水がたまるため、カビやニオイの温床になりやすい場所です。汚れでドレンホースが詰まると、排水できなくなり、水があふれ出して水漏れにつながるおそれがあります。", "エアコン運転で発生した結露水がたまるため、カビやニオイの温床になりやすい場所です。ごみやヘドロでドレンホースが詰まると、排水できなくなり、水があふれ出して水漏れにつながるおそれがあります。");
      cached = cached.replaceAll("。カビへの曝露でせきや鼻づまり、喉の不快感が現れたり、喘息が悪化したりすることがあります。</p>", "。</p><p>カビへの曝露でせきや鼻づまり、喉の不快感が現れたり、喘息が悪化したりすることがあります。</p>");
      // Match only the three optional-service subheadings.
      const serviceHeadings = /<h3 class="minor">([①②③] (?:さまざまなウイルスに対応する除菌処理|専用洗剤によるカビ除去|防カビ・抗菌コーティング))<\/h3>/g;
      if ([...cached.matchAll(serviceHeadings)].length === 9) {
        cached = cached.replace(serviceHeadings, '<h3 class="minor service-underline">$1</h3>').replace('</head>', '<style>.sheet .minor.service-underline{padding-bottom:2mm;border-bottom:1px solid var(--line)}</style></head>');
      }
      // Apply the approved wording to the disinfectant description only.
      cached = cached.replaceAll("新型コロナウイルス、インフルエンザウイルス、ノロウイルスなどへの有効性が確認された除菌剤を採用しています。", "新型コロナウイルス、インフルエンザウイルス、ノロウイルスなどへの有効性が確認された、米国環境保護庁（EPA）登録の除菌剤を採用しています。").replaceAll("米国環境保護庁（EPA）に登録された除菌剤による処理を、ご希望に応じて追加できます。", "通常の洗浄に加え、菌やウイルスの除去・不活化を目的とした除菌処理を、ご希望に応じて追加できます。");
    }
    return new Response(cached, { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } });
  } catch {
    return new Response('DM viewer unavailable', { status: 503, headers });
  }
}
