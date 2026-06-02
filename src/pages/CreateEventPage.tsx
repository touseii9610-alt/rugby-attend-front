import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CreateEventPage() {
  const [title, setTitle] = useState("");

  const [location, setLocation] = useState("");

  const [eventType, setEventType] = useState("REGULAR");

  const [isAllDay, setIsAllDay] = useState(false);

  const [startDateTime, setStartDateTime] = useState("");

  const [endDateTime, setEndDateTime] = useState("");

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
        startDateTime,
        endDateTime,
        isAllDay,
        location,
        eventType,
      }),
    });

    navigate("/");
  };

  return (
    <div className="mx-auto max-w-md">
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
      </div>
      <div className="space-y-4 rounded-3xl bg-white p-5 shadow-md">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="box-border w-full rounded-xl border p-3"
          style={{ boxSizing: "border-box" }}
        />
        <label className="flex items-center gap-2 font-bold">
          <input
            type="checkbox"
            checked={isAllDay}
            onChange={(e) => setIsAllDay(e.target.checked)}
          />
          終日
        </label>

        <input
          type={isAllDay ? "date" : "datetime-local"}
          value={isAllDay ? startDateTime.slice(0, 10) : startDateTime}
          onChange={(e) =>
            setStartDateTime(
              isAllDay ? `${e.target.value}T00:00` : e.target.value,
            )
          }
          className="box-border w-full rounded-xl border p-3"
        />

        <input
          type={isAllDay ? "date" : "datetime-local"}
          value={isAllDay ? endDateTime.slice(0, 10) : endDateTime}
          onChange={(e) =>
            setEndDateTime(
              isAllDay ? `${e.target.value}T23:59` : e.target.value,
            )
          }
          className="box-border w-full rounded-xl border p-3"
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="場所"
          className="box-border w-full rounded-xl border p-3"
          style={{ boxSizing: "border-box" }}
        />

        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="box-border w-full rounded-xl border p-3"
        >
          <option value="REGULAR">{t("regular")}</option>

          <option value="SPECIAL">{t("special")}</option>
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
  );
}

export default CreateEventPage;
