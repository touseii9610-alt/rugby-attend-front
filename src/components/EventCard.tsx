import { useTranslation } from "react-i18next";
type Props = {
  title: string;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  location: string;
  attendCount: number;
  absentCount: number;
  maybeCount: number;
};

function EventCard({
  title,
  startDateTime,
  endDateTime,
  isAllDay,
  location,
  attendCount,
  absentCount,
  maybeCount,
}: Props) {
  const { t } = useTranslation();
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-5
        shadow-md
        transition
        hover:scale-[1.02]
        hover:shadow-xl
        active:scale-[0.98]
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <div
            className="
              inline-block
              rounded-full
              bg-green-100
              px-3
              py-1
              text-xs
              font-bold
              text-green-700
            "
          >
            REGULAR
          </div>

          <h2
            className="
              mt-3
              text-2xl
              font-black
              text-gray-900
            "
          >
            {title}
          </h2>
        </div>

        <div className="text-3xl">🏉</div>
      </div>

      <div
        className="
          mt-5
          space-y-2
          text-sm
          text-gray-600
        "
      >
        {isAllDay ? (
          <p>
            📅 {startDateTime.slice(0, 10)} ～ {endDateTime.slice(0, 10)}
          </p>
        ) : (
          <p>
            📅 {startDateTime.replace("T", " ")} ～{" "}
            {endDateTime.replace("T", " ")}
          </p>
        )}

        <p>📍 {location}</p>
        <div className="mt-5 flex gap-2">
          <div
            className="
                rounded-full
                bg-green-100
                px-3
                py-1
                text-xs
                font-bold
                text-green-700
                "
          >
            {t("attend")}
            {attendCount}
          </div>

          <div
            className="
                rounded-full
                bg-red-100
                px-3
                py-1
                text-xs
                font-bold
                text-red-700
                "
          >
            {t("absent")} {absentCount}
          </div>

          <div
            className="
                rounded-full
                bg-yellow-100
                px-3
                py-1
                text-xs
                font-bold
                text-yellow-700
                "
          >
            {t("maybe")} {maybeCount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
