import { useEffect, useState } from "react";
import { useCurrentUser } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatEventDateTime } from "../utils/dateUtils";

function MyPage() {
  const { currentUser } = useCurrentUser();

  const [events, setEvents] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    fetch(
      `https://rugby-attend-back.onrender.com/api/users/${currentUser.userName}/attending-events`,
    )
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, [currentUser]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                text-xl
                shadow-md
                transition
                active:scale-95
                "
        >
          ←
        </button>
      </div>
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-black">{t("schedule")}</h1>

        {events.map((event) => {
          const display =
            event.startDateTime && event.endDateTime
              ? formatEventDateTime(
                  event.startDateTime,
                  event.endDateTime,
                  event.isAllDay,
                )
              : null;

          return (
            <div
              key={event.id}
              className="mb-4 rounded-2xl bg-white p-4 shadow"
            >
              <p className="font-black">{event.title}</p>

              {display ? (
                <>
                  <p className="text-gray-600">📅 {display.date}</p>
                  <p className="text-gray-600">
                    {event.isAllDay ? "🌞" : "🕘"} {display.time}
                  </p>
                </>
              ) : (
                <p className="text-red-500">日時データなし</p>
              )}

              <p className="text-gray-600">📍 {event.location}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyPage;
