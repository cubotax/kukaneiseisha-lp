import styles from "../subpage.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "プライバシーポリシー | 空間衛生社",
  description: "空間衛生社のプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.heading}>
          <div className={styles.en}>Privacy Policy</div>
          <h1>プライバシーポリシー</h1>
          <p>
            空間衛生社における個人情報の取り扱いについて
          </p>
        </div>

        <article className={styles.article}>
          <p className={styles.intro}>
            空間衛生社（以下「当社」といいます。）は、当社が運営するウェブサイトおよび
            当社が提供するサービスにおいて取得する個人情報について、その重要性を認識し、
            適切な取り扱いと保護に努めます。
          </p>

          <section className={styles.section}>
            <h2>1. 取得する情報</h2>
            <p>
              当社は、お問い合わせやお見積もりのご依頼などに際して、
              以下の情報を取得する場合があります。
            </p>
            <ul>
              <li>会社名・法人名</li>
              <li>お名前</li>
              <li>メールアドレス</li>
              <li>電話番号</li>
              <li>ご希望の連絡方法</li>
              <li>お問い合わせ内容</li>
              <li>
                IPアドレス、ブラウザ情報、アクセス日時など、
                ウェブサイトの利用に伴い技術的に取得される情報
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>2. 個人情報の利用目的</h2>
            <p>当社は、取得した個人情報を以下の目的で利用します。</p>
            <ul>
              <li>お問い合わせ、ご相談、お見積もりへの回答のため</li>
              <li>清掃サービスのご案内、ご提案および日程調整のため</li>
              <li>ご依頼いただいたサービスの提供および必要なご連絡のため</li>
              <li>サービス提供後の確認やアフターフォローのため</li>
              <li>当社サービスおよびウェブサイトの改善のため</li>
              <li>不正利用の防止およびウェブサイトの安全な運営のため</li>
              <li>法令等に基づく対応のため</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. 個人情報の第三者提供</h2>
            <p>
              当社は、本人の同意がある場合または法令に基づく場合を除き、
              取得した個人情報を第三者に提供することはありません。
            </p>
            <p>
              ただし、人の生命、身体または財産の保護のために必要な場合など、
              法令により認められている場合はこの限りではありません。
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. 外部サービスおよび業務委託</h2>
            <p>
              当社は、ウェブサイトの運営、お問い合わせメールの送受信、
              サーバー管理その他の業務において、外部事業者のサービスを
              利用する場合があります。
            </p>
            <p>
              この場合、利用目的の達成に必要な範囲で個人情報を取り扱わせることがあり、
              当社は必要かつ適切な管理を行います。
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. 個人情報の安全管理</h2>
            <p>
              当社は、個人情報への不正アクセス、漏えい、紛失、改ざん等を防止するため、
              必要かつ適切な安全管理措置を講じ、個人情報の適切な管理に努めます。
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. 個人情報の開示・訂正・削除等</h2>
            <p>
              ご本人から、当社が保有する個人情報について開示、訂正、利用停止、
              削除等のお申し出があった場合は、ご本人であることを確認したうえで、
              法令に従い適切に対応します。
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Cookie等について</h2>
            <p>
              当サイトでは、利便性の向上、アクセス状況の把握、
              ウェブサイトの改善等を目的として、Cookieその他これに類する技術を
              使用する場合があります。
            </p>
            <p>
              Cookieによって取得される情報のみから、
              当社が個人を直接特定するものではありません。
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. 個人情報の保存期間</h2>
            <p>
              当社は、個人情報を利用目的の達成に必要な期間保管し、
              保管する必要がなくなった情報については、
              法令等により保存が必要な場合を除き、適切な方法で削除または廃棄します。
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. プライバシーポリシーの変更</h2>
            <p>
              当社は、法令の変更やサービス内容の変更等に応じて、
              本プライバシーポリシーを変更することがあります。
              変更後の内容は、当サイトに掲載した時点から適用されます。
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. お問い合わせ窓口</h2>
            <p>
              本プライバシーポリシーおよび個人情報の取り扱いに関する
              お問い合わせは、下記までお願いいたします。
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
