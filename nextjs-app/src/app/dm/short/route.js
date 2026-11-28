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
      // Replace only the hotel introduction, preserving the existing anecdote.
      cached = cached.replace("<p>今や、ホテルの客室がきれいに清掃されていることは、宿泊されるお客様にとって当たり前になっています。</p><p>しかし、どれだけ丁寧に清掃されていても、エアコンから嫌なニオイが漂ってきたらどうでしょうか。</p><p>目に見える場所はきれいなのに、空気を吸うことさえためらってしまう。</p><p>たったひとつのニオイで、せっかくきれいに清掃した客室が台無しになってしまうのです。</p><p>そして、その不快な体験は、宿泊客の満足度を下げ、口コミ評価にも影響する可能性があります。</p>", "<p>今や、ホテルの客室がきれいに清掃されていることは、宿泊されるお客様にとって当たり前になっています。</p><p>お客様に快適にお過ごしいただけるよう、日々の客室清掃にも細やかな気配りをされていることと思います。</p><p>しかし、どれだけ丁寧に清掃していても、日々の清掃だけでは手が届かない場所があります。</p><p>それが、エアコンの内部です。</p><p>見た目はきれいなエアコンでも、内部にはホコリや黒いカビ状の汚れがたまっていることがあります。</p>");
      // Hotel anecdote and separate heading for observed internal dirt.
      cached = cached.replace("せっかく丁寧に清掃された客室も、エアコンのニオイと汚れひとつで、お客様の信頼を損ない、客室変更にまで発展してしまったのです。", "目に見える場所はきれいなのに、空気を吸うことさえためらってしまう。</p><p>たったひとつのニオイで、せっかく丁寧に清掃した客室が台無しになってしまったのです。</p><p>そして、その不快な体験は、お客様の信頼や満足度を損ない、口コミ評価にも影響する可能性があります。");
      const hotelSectionTitle = "ホテルのエアコン内部で目にした汚れとは？";
      const hotelDirtParagraph = "実際に私たちが洗浄してきたホテルでも、吹出口の奥には黒いカビ状の汚れがびっしりと付着し、水を受ける「ドレンパン」には大量のヘドロ状の汚れが蓄積している例を数多く目にしてきました。";
      cached = cached.replace(/<p(?:\s[^>]*)?>実際に私たちが洗浄してきたホテルでも、[^<]*<\/p>/, (paragraph) => {
        const sampleHeading = cached.match(/<h2([^>]*)>実際に、あるホテルのご担当者からこんなお話を伺いました。<\/h2>/);
        return '<h2' + (sampleHeading ? sampleHeading[1] : '') + '>' + hotelSectionTitle + '</h2>' + paragraph;
      });
      // Move the existing sticker directly after its introductory paragraph.
      const stickerPosition = /(できる「エアコン内部洗浄済シール」もご用意しています。<\/p>)([\s\S]*?)(<figure class="hotel-sticker"[^>]*>[\s\S]*?<\/figure>)/;
      cached = cached.replace(stickerPosition, '$1$3$2');
      // Move the hotel dirt introduction intact to the top of its photo page.
      const hotelDirtBlock = '<h2 class="section">' + hotelSectionTitle + '</h2><p>' + hotelDirtParagraph + '</p>';
      const hotelPhotoPageBoundary = '</div><footer class="footer"><span>01 / 07</span></footer></section><section class="sheet photo-explanation-sheet"><div class="content">';
      const hotelOverflow = hotelDirtBlock + hotelPhotoPageBoundary;
      if (cached.split(hotelOverflow).length === 2) {
        cached = cached.replace(hotelOverflow, hotelPhotoPageBoundary + hotelDirtBlock);
      }
      // Rebalance hotel pages 3 and 4 without changing text or typography.
      const hotelHealthBoundary = "</div><footer class=\"footer\"><span>03 / 07</span></footer></section><section class=\"sheet\"><div class=\"content\">";
      const hotelHealthParagraphs = "<p>米国疾病対策センター（CDC）によると、免疫機能が低下した方は、特定のカビによって感染症を起こす場合があります。</p><p>製品評価技術基盤機構（NITE）も、エアコン内部のカビが室内空気の汚染源となる可能性を指摘しています。</p>";
      const hotelHealthSplit = hotelHealthBoundary + hotelHealthParagraphs;
      if (cached.split(hotelHealthSplit).length === 2) {
        cached = cached.replace(hotelHealthSplit, hotelHealthParagraphs + hotelHealthBoundary);
      }
      // Change only hotel headings and paragraph opening after pagination.
      cached = cached.replace("実際に、あるホテルのご担当者からこんなお話を伺いました。", "あるホテルのご担当者からこんなお話を伺いました。").replace("ホテルのエアコン内部で目にした汚れとは？", "実際にホテルのエアコン内部で目にした汚れとは？").replace("実際に私たちが洗浄してきたホテルでも、", "私たちが洗浄してきたホテルでも、");
      // Focus on inspection rather than recommending washing in the corresponding paragraphs.
      cached = cached.replaceAll("そのため、内部を定期的に点検し、汚れに応じて洗浄することが大切です。", "そのため、定期的にエアコン内部を点検し、汚れの状態を把握しておくことが大切です。").replaceAll("だからこそ、日常清掃とは別にエアコン内部の状態を定期的に確認し、汚れの程度に応じて適切な洗浄を行うことが大切なのです。", "そのため、定期的にエアコン内部を点検し、汚れの状態を把握しておくことが大切です。").replaceAll("だからこそ、お客様からニオイを指摘されて初めて対応するのではなく、定期的に内部の状態を確認し、必要に応じて専門的な洗浄を行うことが大切なのです。", "だからこそ、お客様からニオイを指摘されて初めて対応するのではなく、定期的にエアコン内部を点検し、汚れの状態を把握しておくことが大切です。");
      // Shorten only the introduction to internal dirt photos, after existing pagination adjustments.
      cached = cached.replaceAll("実際に私たちが洗浄に携わった老人ホームでは、吹出口の奥に黒いカビ状の汚れが大量に付着しているだけでなく、エアコン内部の水を受ける「ドレンパン」にも、ヘドロ状の汚れが大量に蓄積していました。", "私たちが洗浄してきた施設でも、エアコン内部に想像以上の汚れが蓄積しているケースを数多く目にしてきました。").replaceAll("実際に私たちが洗浄に携わった病院では、吹出口の奥に黒いカビ状の汚れが大量に付着しているだけでなく、エアコン内部の水を受ける「ドレンパン」にも、ヘドロ状の汚れが大量に蓄積していました。", "私たちが洗浄してきた施設でも、エアコン内部に想像以上の汚れが蓄積しているケースを数多く目にしてきました。").replaceAll("私たちが洗浄してきたホテルでは、目に見える部分の黒いカビ状の汚れはもちろん、エアコン内部の水の受け皿である「ドレンパン」にも、ドロドロとしたヘドロ状の汚れが大量に蓄積していました。", "私たちが洗浄してきたホテルでも、エアコン内部に想像以上の汚れが蓄積しているケースを数多く目にしてきました。").replaceAll("実際に私たちが洗浄してきたホテルでも、吹出口の奥には黒いカビ状の汚れがびっしりと付着し、水を受ける「ドレンパン」には大量のヘドロ状の汚れが蓄積している例を数多く目にしてきました。", "私たちが洗浄してきたホテルでも、エアコン内部に想像以上の汚れが蓄積しているケースを数多く目にしてきました。").replaceAll("実際に私たちが洗浄してきた施設でも、吹出口の奥には黒いカビ状の汚れがびっしりと付着し、水を受ける「ドレンパン」には大量のヘドロ状の汚れが蓄積している例を数多く目にしてきました。", "私たちが洗浄してきた施設でも、エアコン内部に想像以上の汚れが蓄積しているケースを数多く目にしてきました。").replaceAll("私たちが洗浄してきたホテルでも、吹出口の奥には黒いカビ状の汚れがびっしりと付着し、水を受ける「ドレンパン」には大量のヘドロ状の汚れが蓄積している例を数多く目にしてきました。", "私たちが洗浄してきたホテルでも、エアコン内部に想像以上の汚れが蓄積しているケースを数多く目にしてきました。");
      // Keep the specified paragraphs with their preceding sections, without changing copy or photo dimensions.
      const previousPageMoves = [["02","<p>こうした汚れは、嫌なニオイやカビ・細菌が繁殖しやすい環境の原因になります。特にドレンパンの汚れは外観やフィルターからは見えず、分解しなければ確認できません。</p><p>そのため、定期的にエアコン内部を点検し、汚れの状態を把握しておくことが大切です。</p>",3],["04","<p>除菌・カビ除去・防カビコーティングを組み合わせ、洗浄後の衛生環境まで考えた対策をご提案します。</p>",2],["05","<p>現在の洗浄品質や衛生対策を維持しながら、費用を見直す機会としてもご活用いただけます。</p>",2]];
      for (const [page, paragraphs, expected] of previousPageMoves) {
        const boundary = '</div><footer class="footer"><span>' + page + ' / 07</span></footer></section><section class="sheet"><div class="content">';
        const source = boundary + paragraphs;
        if (cached.split(source).length - 1 === expected) {
          cached = cached.replaceAll(source, paragraphs + boundary);
        }
      }
      // Add space only above the paragraph immediately following the dirt photos.
      cached = cached.replaceAll('<p>こうした汚れは、嫌なニオイやカビ・細菌が繁殖しやすい環境の原因になります。', '<p style="padding-top:6mm">こうした汚れは、嫌なニオイやカビ・細菌が繁殖しやすい環境の原因になります。');
      // Keep the nursing-home conclusion together on page 6; leave other DMs intact.
      const nursingConclusion = '<p>私たちは、エアコン洗浄を通じて、入居者の皆様が気持ちよく暮らせる環境づくりをお手伝いしたいと考えています。</p>';
      const nursingBoundary = '</div><footer class="footer"><span>06 / 07</span></footer></section><section class="sheet"><div class="content">';
      const nursingNextParagraphs = '<p>そのための第一歩として、まずは写真付き無料点検レポートをご利用いただければと思います。</p><p>施設のエアコンの状態を一緒に確認し、必要な洗浄や今後の管理方法を考えてみませんか？</p>';
      const nursingSplit = nursingConclusion + nursingBoundary + nursingNextParagraphs;
      if (cached.split(nursingSplit).length === 2) {
        cached = cached.replace(nursingSplit, nursingConclusion + nursingNextParagraphs + nursingBoundary);
      }
      // Shorten the nursery-school introduction only.
      cached = cached.replaceAll("しかし、保育園は子どもたちが遊び、食事をし、お昼寝をするなど、一日の多くの時間を過ごす大切な生活の場です。", "しかし、保育園は子どもたちが毎日を過ごす大切な場所です。");
      // Apply the approved hygiene wording to the exact matching sentences only.
      const hygieneCopy = [
        [
          "しかし、老人ホームは入居者の皆様が毎日を過ごす大切な場所だからこそ、空気環境にも気を配りたいものです。",
          "しかし、老人ホームは入居者の皆様が毎日を過ごす大切な場所です。"
        ],
        [
          "目に見える場所を清潔に保つだけでなく、日々の生活に欠かせないエアコンだからこそ、普段は見えない内部の衛生状態にも目を向ける必要があるのではないでしょうか。",
          "目に見える場所だけでなく、日々の生活に欠かせないエアコン内部の衛生の状態にも気を配る必要があるのではないでしょうか。"
        ],
        [
          "目に見える場所だけでなく、日々の生活に欠かせないエアコン内部の衛生状態にも気を配る必要があるのではないでしょうか。",
          "目に見える場所だけでなく、日々の生活に欠かせないエアコン内部の衛生の状態にも気を配る必要があるのではないでしょうか。"
        ],
        [
          "しかし、病院は患者様が診察や治療を受ける大切な場所だからこそ、空気環境にも気を配りたいものです。",
          "しかし、病院は患者様が診察や治療を受ける大切な場所です。"
        ],
        [
          "目に見える場所を清潔に保つだけでなく、院内で使用するエアコンだからこそ、普段は見えない内部の衛生状態にも目を向ける必要があるのではないでしょうか。",
          "目に見える場所だけでなく、院内で使用するエアコン内部の衛生の状態にも気を配る必要があるのではないでしょうか。"
        ],
        [
          "目に見える場所を清潔に保つだけでなく、子どもたちが毎日過ごす空間で使用するエアコンだからこそ、普段は見えない内部の衛生状態にも目を向ける必要があるのではないでしょうか。",
          "目に見える場所だけでなく、日々使用するエアコン内部の衛生の状態にも気を配る必要があるのではないでしょうか。"
        ]
      ];
      for (const [oldCopy, newCopy] of hygieneCopy) {
        cached = cached.replaceAll(oldCopy, newCopy);
      }
      // Begin the annual planning sentence in a separate paragraph wherever it follows another sentence.
      cached = cached.replaceAll("。また、多数のエアコンを一度に洗浄することが難しい場合には、年間計画を立てて時期を分けるなど、洗浄対象や作業の進捗を管理しながら、計画的に施工を進めます。", "。</p><p>また、多数のエアコンを一度に洗浄することが難しい場合には、年間計画を立てて時期を分けるなど、洗浄対象や作業の進捗を管理しながら、計画的に施工を進めます。");
    }
    return new Response(cached, { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } });
  } catch {
    return new Response('DM viewer unavailable', { status: 503, headers });
  }
}
