"use client";

import { useState } from "react";
import styles from "./AirconDiagnosis.module.css";

const questions = [
  {
    id: "odor",
    title:
      "エアコンをつけたとき、半乾きの洗濯物のような臭いや、カビっぽい臭いがしますか？",
  },
  {
    id: "outlet",
    title: "エアコンの吹出口に、黒い汚れやホコリが見えますか？",
    note: "風が出てくる部分や、ルーバーのまわりを確認してみてください。",
  },
  {
    id: "fan",
    title:
      "吹出口の奥にある送風ファンに、黒い汚れや白いワタ状のホコリが見えますか？",
    note: "奥に見える回転する筒状の部品が「送風ファン」です。",
  },
  {
    id: "fin",
    title:
      "フィルターの奥にあるアルミフィンに、ホコリや黒ずみが見えますか？",
    note: "薄い金属板が細かく並んでいる部分が「アルミフィン（熱交換器）」です。",
  },
];

const resultTexts = {
  odor: {
    title: "半乾きのような臭い・カビっぽい臭いがする",
    text:
      "エアコン内部に汚れや湿気が残っている可能性があります。内部に付着した汚れやカビが、風のニオイの原因になっていることがあります。",
  },
  outlet: {
    title: "吹出口に黒い汚れが見える",
    text:
      "吹出口まで黒い汚れが見えている場合、目に見えない内部にも汚れやカビが広がっているかもしれません。",
  },
  fan: {
    title: "送風ファンに黒い汚れ・白いワタ状の汚れが見える",
    text:
      "送風ファンに黒い汚れや白いワタ状のホコリが見える場合、内部にも汚れがたまっているサインです。ニオイの原因になるほか、送風によってカビや汚れが室内に広がるおそれがあります。",
  },
  fin: {
    title: "アルミフィンにホコリ・黒ずみが見える",
    text:
      "アルミフィンの隙間にホコリや黒い汚れが詰まると、空気の流れや熱交換を妨げ、冷房効率の低下やニオイの原因になることがあります。",
  },
};

const lineUrl =
  "https://s.lmes.jp/landing-qr/2011871821-9SVWVvxL?uLand=WgNdAK";

export default function AirconDiagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const finished = step >= questions.length;

  const answerQuestion = (value) => {
    const question = questions[step];

    setAnswers((prev) => ({
      ...prev,
      [question.id]: value,
    }));

    setStep((prev) => prev + 1);
  };

  const resetDiagnosis = () => {
    setAnswers({});
    setStep(0);
  };

  const yesItems = questions.filter(
    (question) => answers[question.id] === "yes"
  );

  const hasUnknown = Object.values(answers).includes("unknown");
  const hasNo = Object.values(answers).includes("no");

  const progress = finished
    ? 100
    : Math.round((step / questions.length) * 100);

  return (
    <section className={styles.section} id="aircon-diagnosis">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>AIR CONDITIONER CHECK</p>
          <h2>エアコン洗浄って必要？</h2>
          <p className={styles.lead}>たった4問で簡単診断！</p>
          <p className={styles.description}>
            エアコンの状態を見ながら、当てはまるものを選んでください。
          </p>
        </div>

        <div className={styles.diagnosis}>
          {!finished ? (
            <>
              <div className={styles.progressTop}>
                <span>
                  {step + 1} / {questions.length}
                </span>
                <span>{progress}%</span>
              </div>

              <div className={styles.progressTrack}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className={styles.questionArea}>
                <p className={styles.questionNumber}>
                  Q{step + 1}
                </p>

                <h3>{questions[step].title}</h3>

                {questions[step].note && (
                  <p className={styles.questionNote}>
                    {questions[step].note}
                  </p>
                )}

                <div className={styles.answers}>
                  <button
                    type="button"
                    onClick={() => answerQuestion("yes")}
                  >
                    はい
                  </button>

                  <button
                    type="button"
                    onClick={() => answerQuestion("no")}
                  >
                    いいえ
                  </button>

                  <button
                    type="button"
                    className={styles.unknownButton}
                    onClick={() => answerQuestion("unknown")}
                  >
                    よくわからない
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.result}>
              <p className={styles.resultLabel}>診断結果</p>

              {yesItems.length > 0 ? (
                <>
                  <h3>エアコン内部の洗浄をおすすめします</h3>
                  <p className={styles.resultIntro}>
                    今回の回答では、以下のサインが確認されました。
                  </p>

                  <div className={styles.resultList}>
                    {yesItems.map((item) => (
                      <div
                        className={styles.resultItem}
                        key={item.id}
                      >
                        <h4>{resultTexts[item.id].title}</h4>
                        <p>{resultTexts[item.id].text}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : hasUnknown ? (
                <>
                  <h3>写真で確認してみましょう</h3>
                  <p className={styles.resultIntro}>
                    見えにくい部分があるため、写真で状態を確認するのがおすすめです。
                  </p>
                </>
              ) : (
                <>
                  <h3>
                    今すぐ洗浄が必要なサインは見つかりませんでした
                  </h3>
                  <p className={styles.resultIntro}>
                    今回確認した範囲では、目立った汚れのサインは見つかりませんでした。
                  </p>
                </>
              )}

              {hasUnknown && (
                <div className={styles.photoDiagnosis}>
                  <span className={styles.photoBadge}>
                    無料
                  </span>

                  <div>
                    <h4>
                      見えにくい部分は、無料写真診断でチェックできます
                    </h4>
                    <p>
                      エアコンの吹出口や内部の写真をLINEで送ってください。汚れの状態を確認して、洗浄が必要そうか無料でご案内します。
                    </p>
                  </div>

                  <a
                    href={lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.lineButton}
                  >
                    LINEで無料写真診断
                  </a>
                </div>
              )}

              {hasNo && (
                <div className={styles.maintenance}>
                  <h4>
                    今は汚れが見えなくても、定期的なチェックがおすすめです
                  </h4>
                  <p>
                    エアコン内部は使用頻度や環境によって汚れ方が異なりますが、プロによるクリーニングは2〜3年に一度がひとつの目安です。内部にカビや汚れがたまると、ニオイの原因になるほか、送風によってカビや汚れが室内に広がるおそれがあります。
                  </p>
                </div>
              )}

              <div className={styles.campaign}>
                <p className={styles.campaignTop}>
                  今だけエアコン洗浄キャンペーン
                </p>

                <div className={styles.price}>
                  <span className={styles.oldPrice}>
                    通常 13,000円
                  </span>
                  <span className={styles.arrow}>→</span>
                  <strong>10,000円</strong>
                  <small>税込</small>
                </div>

                <p className={styles.includes}>
                  熱交換器・送風ファン・カバー・ルーバーの洗浄
                </p>

                {!hasUnknown && (
                  <a
                    href={lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.lineButton}
                  >
                    LINEで無料見積もり
                  </a>
                )}
              </div>

              <button
                type="button"
                className={styles.reset}
                onClick={resetDiagnosis}
              >
                もう一度診断する
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
