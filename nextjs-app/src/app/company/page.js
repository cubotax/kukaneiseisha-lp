import styles from "../subpage.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "会社概要 | 空間衛生社",
  description: "空間衛生社の会社概要です。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CompanyPage() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.heading}>
          <div className={styles.en}>Company</div>
          <h1>会社概要</h1>
          <p>空間衛生社について</p>
        </div>

        <article className={styles.article}>
          <p className={styles.intro}>
            空間衛生社は、清掃を通して、働く場所も暮らす場所も、
            もっと気持ちよく、快適な空間へ整えることを大切にしています。
            日常の清掃から専門的なクリーニングまで、
            ご要望に合わせたサービスをご案内いたします。
          </p>

          <div className={styles.companyTable}>
            <div className={styles.companyRow}>
              <div className={styles.companyLabel}>屋号</div>
              <div className={styles.companyValue}>空間衛生社</div>
            </div>

            <div className={styles.companyRow}>
              <div className={styles.companyLabel}>代表者</div>
              <div className={styles.companyValue}>久保田泰寛</div>
            </div>

            <div className={styles.companyRow}>
              <div className={styles.companyLabel}>所在地</div>
              <div className={styles.companyValue}>
                〒036-8075<br />
                青森県弘前市撫牛子3-6-7
              </div>
            </div>

            <div className={styles.companyRow}>
              <div className={styles.companyLabel}>事業内容</div>
              <div className={styles.companyValue}>
                エアコン洗浄<br />
                ハウスクリーニング<br />
                退去後清掃<br />
                店舗・施設清掃<br />
                屋外清掃・環境整備<br />
                家事代行
              </div>
            </div>

            <div className={styles.companyRow}>
              <div className={styles.companyLabel}>メール</div>
              <div className={styles.companyValue}>
                <a href="mailto:info@kukaneiseisha.com">
                  info@kukaneiseisha.com
                </a>
              </div>
            </div>

            <div className={styles.companyRow}>
              <div className={styles.companyLabel}>Webサイト</div>
              <div className={styles.companyValue}>
                kukaneiseisha.com
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
