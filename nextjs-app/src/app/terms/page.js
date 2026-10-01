import styles from "../subpage.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "サイト利用規約 | 空間衛生社",
  description: "空間衛生社ウェブサイトの利用規約です。",
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.heading}>
          <div className={styles.en}>Terms of Use</div>
          <h1>サイト利用規約</h1>
          <p>当ウェブサイトをご利用いただく際の条件について</p>
        </div>

        <article className={styles.article}>
          <p className={styles.intro}>
            このサイト利用規約（以下「本規約」といいます。）は、
            空間衛生社（以下「当社」といいます。）が運営するウェブサイト
            （以下「当サイト」といいます。）の利用条件を定めるものです。
            当サイトをご利用いただく場合は、本規約の内容をご確認ください。
          </p>

          <section className={styles.section}>
            <h2>1. 適用範囲</h2>
            <p>
              本規約は、当サイトを閲覧または利用するすべての方に適用されます。
            </p>
            <p>
              当社が当サイト上で個別に定める注意事項や案内等についても、
              本規約の一部を構成するものとします。
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. 掲載情報について</h2>
            <p>
              当社は、当サイトに掲載する情報について正確性の確保に努めていますが、
              その内容の完全性、正確性、有用性、最新性等を保証するものではありません。
            </p>
            <p>
              サービス内容、料金、作業条件、対応可能地域その他の具体的な条件については、
              実際のお見積もり、ご案内または個別の契約内容が優先されます。
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. 禁止事項</h2>
            <p>
              当サイトの利用にあたり、以下の行為を禁止します。
            </p>
            <ul>
              <li>法令または公序良俗に反する行為</li>
              <li>当社または第三者の権利、利益、信用等を侵害する行為</li>
              <li>虚偽の情報を用いてお問い合わせ等を行う行為</li>
              <li>当サイトの運営を妨害する行為</li>
              <li>当サイトに不正にアクセスする行為</li>
              <li>コンピュータウイルス等の有害なプログラムを送信する行為</li>
              <li>当サイトの情報を不正な目的で利用する行為</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. 著作権・知的財産権</h2>
            <p>
              当サイトに掲載されている文章、画像、写真、ロゴ、デザイン、
              イラストその他のコンテンツに関する著作権その他の知的財産権は、
              当社または正当な権利を有する第三者に帰属します。
            </p>
            <p>
              法令により認められる場合を除き、当社または権利者の許可なく、
              複製、転載、改変、配布、公衆送信その他の利用を行うことはできません。
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. 外部サイトへのリンク</h2>
            <p>
              当サイトから第三者が運営する外部サイトへリンクする場合があります。
              当社は、リンク先サイトの内容、安全性、利用条件等について
              保証するものではありません。
            </p>
            <p>
              外部サイトをご利用になる場合は、
              各サイトの利用条件やプライバシーポリシーをご確認ください。
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. 免責事項</h2>
            <p>
              当サイトの利用または利用できなかったことにより生じた損害について、
              当社の故意または重大な過失による場合を除き、
              当社は法令で認められる範囲において責任を負わないものとします。
            </p>
            <p>
              また、通信回線、サーバー、端末、ブラウザその他の環境に起因する
              不具合や損害についても、当社は責任を負わないものとします。
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. サイト内容の変更・停止</h2>
            <p>
              当社は、事前の通知なく、当サイトの内容を変更、追加、削除し、
              または当サイトの全部もしくは一部の提供を停止する場合があります。
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. 本規約の変更</h2>
            <p>
              当社は、必要に応じて本規約を変更することがあります。
              変更後の内容は、当サイトに掲載した時点から適用されます。
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. 準拠法・管轄</h2>
            <p>
              本規約の解釈および適用については、日本法を準拠法とします。
            </p>
            <p>
              当サイトの利用に関して紛争が生じた場合は、
              法令により別段の定めがある場合を除き、
              当社所在地を管轄する裁判所を第一審の合意管轄裁判所とします。
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. お問い合わせ</h2>
            <p>
              本規約に関するお問い合わせは、下記までお願いいたします。
            </p>

            <div className={styles.contactBox}>
              <strong>空間衛生社</strong>
              <p>〒036-8075 青森県弘前市撫牛子3-6-7</p>
              <p>
                MAIL：
                <a href="mailto:info@kukaneiseisha.com">
                  info@kukaneiseisha.com
                </a>
              </p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
