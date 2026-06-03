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
          regular: "通常練習",
          special: "特別イベント",
          schedule: "参加予定",
          me: "予定を見る",
          event: "イベント",
          addEvent: "イベント追加",
          noEvent: "現在、参加予定はありません",
          goingToDo: "参加するイベントを選択すると、ここに表示されます。",
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
          regular: "平常训练",
          special: "特殊活动",
          schedule: "我的予定",
          me: "我的",
          event: "活动一览",
          addEvent: "创建",
          noEvent: "没有要参加的活动",
          goingToDo: "选择参加地的活动会出现在这里~",
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
          regular: "REGULAR",
          special: "SPECIAL",
          schedule: "Schedule",
          me: "ME",
          event: "Events",
          addEvent: "Event Create",
          noEvent: "No upcoming events yet.",
          goingToDo: "Events you join will appear here.",
        },
      },
    },
  });

export default i18n;
