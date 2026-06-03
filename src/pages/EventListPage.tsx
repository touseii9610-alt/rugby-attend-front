import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingOverlay from "../components/LoadingOverlay";

function EventListPage() {
  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://rugby-attend-back.onrender.com/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="min-h-screen bg-gray-100 pb-24 p-4">
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-700">
                GUSTARE TOUCH
              </p>

              <h1 className="text-3xl font-black text-gray-900">
                Rugby Attend
              </h1>
            </div>

            <div
              className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-green-700
                    text-xl
                    font-bold
                    text-white
                    shadow-md
                    "
            >
              G
            </div>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <Link to={`/events/${event.id}`} key={event.id}>
                <EventCard
                  title={event.title}
                  startDateTime={event.startDateTime}
                  endDateTime={event.endDateTime}
                  isAllDay={event.isAllDay}
                  location={event.location}
                  attendCount={event.attendCount}
                  absentCount={event.absentCount}
                  maybeCount={event.maybeCount}
                />
              </Link>
            ))}
          </div>
        </div>
        <div
          className="
        fixed
        bottom-0
        left-0
        right-0
        border-t
        border-gray-200
        bg-white
        shadow-lg
      "
        >
          <div
            className="
          mx-auto
          flex
          max-w-md
          items-center
          justify-around
          py-3
        "
          >
            <button
              className="
            flex
            flex-col
            items-center
            text-green-700
          "
              onClick={() => navigate("/")}
            >
              <span className="text-2xl">🏠</span>

              <span className="text-xs font-bold">{t("event")}</span>
            </button>

            {currentUser?.role === "CAPTAIN" && (
              <button
                className="
                flex
                flex-col
                items-center
                text-gray-500
              "
                onClick={() => navigate("/create-event")}
              >
                <span className="text-2xl">➕</span>

                <span className="text-xs font-bold">{t("addEvent")}</span>
              </button>
            )}

            <button
              className="
                flex
                flex-col
                items-center
                text-gray-500
              "
              onClick={() => navigate("/my")}
            >
              <span className="text-2xl">👤</span>

              <span className="text-xs font-bold">{t("me")}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventListPage;
