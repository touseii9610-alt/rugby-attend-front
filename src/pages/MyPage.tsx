import { useEffect, useState } from "react";
import { useCurrentUser } from "../context/UserContext";
import { useTranslation } from "react-i18next";

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-black">{t("schedule")}</h1>

        {events.map((event) => (
          <div
            key={event.id}
            className="
              mb-4
              rounded-2xl
              bg-white
              p-4
              shadow
            "
          >
            <p className="font-black">{event.title}</p>

            <p className="text-gray-600">{event.eventDate}</p>

            <p className="text-gray-600">{event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPage;
