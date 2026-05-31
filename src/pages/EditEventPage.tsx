import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("REGULAR");

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${id}`)
      .then((res) => res.json())
      .then((event) => {
        setTitle(event.title);
        setEventDate(event.eventDate);
        setStartTime(event.startTime);
        setEndTime(event.endTime);
        setLocation(event.location);
        setEventType(event.eventType);
      });
  }, [id]);

  const handleUpdateEvent = async () => {
    await fetch(`http://localhost:8080/api/events/${id}`, {
      method: "PUT",
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
      <div className="mx-auto max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="
            mb-4
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

        <div className="space-y-4 rounded-3xl bg-white p-5 shadow-md">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
            className="w-full rounded-xl border p-3"
          />

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="場所"
            className="w-full rounded-xl border p-3"
          />

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full rounded-xl border p-3"
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
    </div>
  );
}

export default EditEventPage;
