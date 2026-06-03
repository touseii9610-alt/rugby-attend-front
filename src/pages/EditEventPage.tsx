import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("REGULAR");

  useEffect(() => {
    fetch(`https://rugby-attend-back.onrender.com/api/events/${id}`)
      .then((res) => res.json())
      .then((event) => {
        setTitle(event.title);
        setStartDateTime(event.startDateTime);
        setEndDateTime(event.endDateTime);
        setIsAllDay(event.isAllDay ?? false);
        setLocation(event.location);
        setEventType(event.eventType);
      });
  }, [id]);

  const handleUpdateEvent = async () => {
    if (!title || !startDateTime || !location) {
      alert("タイトル、開始日時、場所を入力してください");
      return;
    }

    let requestStartDateTime = startDateTime;
    let requestEndDateTime = endDateTime;

    if (isAllDay) {
      const startDate = startDateTime.slice(0, 10);
      const endDate = endDateTime ? endDateTime.slice(0, 10) : startDate;

      requestStartDateTime = `${startDate}T00:00`;
      requestEndDateTime = `${endDate}T23:59`;
    } else {
      if (!endDateTime) {
        alert("終了日時を入力してください");
        return;
      }
    }

    if (new Date(requestEndDateTime) < new Date(requestStartDateTime)) {
      alert("終了日時は開始日時以降にしてください");
      return;
    }

    await fetch(`https://rugby-attend-back.onrender.com/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        startDateTime: requestStartDateTime,
        endDateTime: requestEndDateTime,
        isAllDay,
        location,
        eventType,
      }),
    });

    navigate("/");
  };

  return (
    <div className="mx-auto w-full max-w-md">
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
        <h1 className="mb-6 text-3xl font-black">Edit Event</h1>
      </div>

      <div className="space-y-4 rounded-3xl bg-white p-5 shadow-md">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="w-full rounded-xl border p-3"
        />

        <label className="flex items-center gap-2 font-bold">
          <input
            type="checkbox"
            checked={isAllDay}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsAllDay(checked);

              if (checked) {
                if (startDateTime) {
                  setStartDateTime(`${startDateTime.slice(0, 10)}T00:00`);
                }

                if (endDateTime) {
                  setEndDateTime(`${endDateTime.slice(0, 10)}T23:59`);
                }
              }
            }}
            className="h-5 w-5"
          />
          終日
        </label>

        <div>
          <p className="mb-2 font-bold text-gray-700">
            {isAllDay ? "開始日" : "開始日時"}
          </p>

          <input
            type={isAllDay ? "date" : "datetime-local"}
            value={isAllDay ? startDateTime.slice(0, 10) : startDateTime}
            onChange={(e) => {
              const value = e.target.value;
              setStartDateTime(isAllDay ? `${value}T00:00` : value);
            }}
            className="box-border w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <p className="mb-2 font-bold text-gray-700">
            {isAllDay ? "終了日（未入力の場合は開始日と同じ）" : "終了日時"}
          </p>

          <input
            type={isAllDay ? "date" : "datetime-local"}
            value={isAllDay ? endDateTime.slice(0, 10) : endDateTime}
            onChange={(e) => {
              const value = e.target.value;
              setEndDateTime(isAllDay ? `${value}T23:59` : value);
            }}
            className="box-border w-full rounded-xl border p-3"
          />
        </div>

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="場所"
          className="box-border w-full rounded-xl border p-3"
        />

        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="box-border w-full rounded-xl border p-3"
        >
          <option value="REGULAR">REGULAR</option>
          <option value="SPECIAL">SPECIAL</option>
        </select>

        <button
          onClick={handleUpdateEvent}
          className="
              w-full
              rounded-2xl
              bg-green-700
              p-4
              font-black
              text-white
            "
        >
          更新
        </button>
      </div>
    </div>
  );
}

export default EditEventPage;
