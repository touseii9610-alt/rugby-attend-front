import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

  const [location, setLocation] = useState("");

  const [eventType, setEventType] = useState("REGULAR");

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleCreateEvent = async () => {
    await fetch("https://rugby-attend-back.onrender.com/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        eventDate,
        startTime,
        endTime,
        location,
        eventType,
      }),
    });

    navigate("/");
  };

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
        <h1 className="text-3xl font-black">Create Event</h1>

        <div className="space-y-4 rounded-3xl bg-white p-5 shadow-md">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
            className="
                w-full
                rounded-xl
                border
                p-3
                "
            style={{ boxSizing: "border-box" }}
          />

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="
                w-full
                rounded-xl
                border
                p-3
                "
            style={{ boxSizing: "border-box" }}
          />

          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              p-3
              "
            style={{ boxSizing: "border-box" }}
          />

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="
                w-full
                rounded-xl
                border
                p-3
                "
            style={{ boxSizing: "border-box" }}
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="場所"
            className="
                w-full
                rounded-xl
                border
                p-3
                "
            style={{ boxSizing: "border-box" }}
          />

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full rounded-xl border p-3"
          >
            <option value="REGULAR">{t("regular")}</option>

            <option value="SPECIAL">{t("SPECIAL")}</option>
          </select>

          <button
            onClick={handleCreateEvent}
            className="
            w-full
            rounded-2xl
            bg-green-700
            p-4
            font-black
            text-white
        "
          >
            作成
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEventPage;
