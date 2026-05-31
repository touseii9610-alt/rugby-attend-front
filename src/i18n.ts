import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ja",
    resources: {
      ja: {
        translation: {
          appName: "Rugby Attend",
          attend: "参加",
          absent: "不参加",
          maybe: "未定",
          comment: "コメント",
          saved: "保存しました",
        },
      },
      "zh-CN": {
        translation: {
          appName: "橄榄球出欠",
          attend: "参加",
          absent: "不参加",
          maybe: "不一定",
          comment: "评论",
          saved: "已保存",
        },
      },
      en: {
        translation: {
          appName: "Rugby Attend",
          attend: "Attend",
          absent: "Absent",
          maybe: "Maybe",
          comment: "Comment",
          saved: "Saved",
        },
      },
    },
  });

export default i18n;
