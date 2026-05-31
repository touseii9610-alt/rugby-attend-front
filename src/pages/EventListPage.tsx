import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function EventListPage() {
  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-24 p-4">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-green-700">RUGBY TEAM</p>

            <h1 className="text-3xl font-black text-gray-900">Rugby Attend</h1>
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
            T
          </div>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <Link to={`/events/${event.id}`} key={event.id}>
              <EventCard
                title={event.title}
                eventDate={event.eventDate}
                startTime={event.startTime}
                endTime={event.endTime}
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

            <span className="text-xs font-bold">活动</span>
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

              <span className="text-xs font-bold">创建</span>
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

            <span className="text-xs font-bold">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventListPage;
