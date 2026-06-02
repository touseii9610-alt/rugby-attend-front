import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../context/UserContext";

function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();

  const [status, setStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [attendances, setAttendances] = useState<any[]>([]);
  const [event, setEvent] = useState<any>();

  useEffect(() => {
    fetch(`https://rugby-attend-back.onrender.com/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));

    fetch(`https://rugby-attend-back.onrender.com/api/attendances/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAttendances(data);

        const myAttendance = data.find(
          (a: any) => a.userName === currentUser?.userName,
        );

        if (myAttendance) {
          setStatus(myAttendance.status);
        }
      });
  }, [id, currentUser]);

  const attendList = attendances.filter((a) => a.status === "ATTEND");
  const absentList = attendances.filter((a) => a.status === "ABSENT");
  const maybeList = attendances.filter((a) => a.status === "MAYBE");

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);

    await fetch("https://rugby-attend-back.onrender.com/api/attendances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: id,
        userName: currentUser?.userName,
        status: newStatus,
        createdAt: new Date(),
      }),
    });

    await fetch(`https://rugby-attend-back.onrender.com/api/attendances/${id}`)
      .then((res) => res.json())
      .then((data) => setAttendances(data));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleDeleteEvent = async () => {
    const ok = window.confirm("本当に削除しますか？");

    if (!ok) {
      return;
    }

    await fetch(`https://rugby-attend-back.onrender.com/api/events/${id}`, {
      method: "DELETE",
    });

    navigate("/");
  };

  const renderMemberList = (list: any[]) => {
    return list.map((a) => (
      <div key={a.id} className="mb-3 flex items-center gap-3">
        {a.pictureUrl ? (
          <img
            src={a.pictureUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-white">
            ?
          </div>
        )}

        <p className="font-bold">{a.displayName || a.userName}</p>
      </div>
    ));
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-md transition active:scale-95"
          >
            ←
          </button>

          <div>
            <p className="text-sm font-bold text-green-700">EVENT DETAIL</p>
            <h1 className="text-2xl font-black">Rugby Attend</h1>
          </div>
        </div>

        {currentUser?.role === "CAPTAIN" && (
          <div className="mb-4 flex justify-end gap-2">
            <button
              onClick={() => navigate(`/edit-event/${id}`)}
              className="rounded-xl bg-blue-100 px-3 py-2 text-sm font-bold text-blue-700"
            >
              ✏️ 编辑
            </button>

            <button
              onClick={handleDeleteEvent}
              className="rounded-xl bg-red-100 px-3 py-2 text-sm font-bold text-red-700"
            >
              删除
            </button>
          </div>
        )}

        <div className="rounded-2xl bg-white p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                {event.eventType}
              </div>

              <h1 className="mt-3 text-3xl font-black text-gray-900">
                {event.title}
              </h1>
            </div>

            <div className="text-4xl">🏉</div>
          </div>

          <div className="mt-4 space-y-1 text-gray-600">
            {event.isAllDay ? (
              <p>
                {event.startDateTime.slice(0, 10)} ～{" "}
                {event.endDateTime.slice(0, 10)}
              </p>
            ) : (
              <p>
                {event.startDateTime.replace("T", " ")} ～{" "}
                {event.endDateTime.replace("T", " ")}
              </p>
            )}
            <p>{event.location}</p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <button
              onClick={() => handleStatusChange("ATTEND")}
              className={`rounded-xl p-3 font-bold text-white transition ${
                status === "ATTEND"
                  ? "bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {t("attend")}
            </button>

            <button
              onClick={() => handleStatusChange("ABSENT")}
              className={`rounded-xl p-3 font-bold text-white transition ${
                status === "ABSENT"
                  ? "bg-red-700"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {t("absent")}
            </button>

            <button
              onClick={() => handleStatusChange("MAYBE")}
              className={`rounded-xl p-3 font-bold text-white transition ${
                status === "MAYBE"
                  ? "bg-yellow-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {t("maybe")}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-green-100 p-3 text-center">
              <p className="text-xl font-black text-green-700">
                {attendList.length}
              </p>
              <p className="text-xs font-bold text-green-700">{t("attend")}</p>
            </div>

            <div className="rounded-2xl bg-red-100 p-3 text-center">
              <p className="text-xl font-black text-red-700">
                {absentList.length}
              </p>
              <p className="text-xs font-bold text-red-700">{t("absent")}</p>
            </div>

            <div className="rounded-2xl bg-yellow-100 p-3 text-center">
              <p className="text-xl font-black text-yellow-700">
                {maybeList.length}
              </p>
              <p className="text-xs font-bold text-yellow-700">{t("maybe")}</p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <h2 className="mb-2 font-bold text-green-700">{t("attend")}</h2>
              {renderMemberList(attendList)}
            </div>

            <div>
              <h2 className="mb-2 font-bold text-red-700">{t("absent")}</h2>
              {renderMemberList(absentList)}
            </div>

            <div>
              <h2 className="mb-2 font-bold text-yellow-700">{t("maybe")}</h2>
              {renderMemberList(maybeList)}
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white shadow-lg">
          ✓ {t("saved")}
        </div>
      )}
    </div>
  );
}

export default EventDetailPage;
