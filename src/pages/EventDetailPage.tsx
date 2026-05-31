import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import i18n from "../i18n";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../context/UserContext";

function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [attendances, setAttendances] = useState<any[]>([]);
  const [event, setEvent] = useState<any>();

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));

    fetch(`http://localhost:8080/api/attendances/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAttendances(data);

        const myAttendance = data.find(
          (a: any) => a.userName === currentUser?.userName,
        );

        if (myAttendance) {
          setStatus(myAttendance.status);
          setComment(myAttendance.comment ?? "");
        }
      });
  }, [id, currentUser]);
  const attendList = attendances.filter((a) => a.status === "ATTEND");

  const absentList = attendances.filter((a) => a.status === "ABSENT");

  const maybeList = attendances.filter((a) => a.status === "MAYBE");
  const attendCount = attendList.length;
  const absentCount = absentList.length;
  const maybeCount = maybeList.length;
  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);

    await fetch("http://localhost:8080/api/attendances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: id,
        userName: currentUser?.userName,
        status: newStatus,
        comment: comment,
        createdAt: new Date(),
      }),
    });

    await fetch(`http://localhost:8080/api/attendances/${id}`)
      .then((res) => res.json())
      .then((data) => setAttendances(data));

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handleDeleteEvent = async () => {
    const ok = window.confirm("本当に削除しますか？");

    if (!ok) {
      return;
    }

    await fetch(`http://localhost:8080/api/events/${id}`, {
      method: "DELETE",
    });

    navigate("/");
  };
  const { t } = useTranslation();
  if (!event) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <p>current lang: {i18n.language}</p>
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex items-center gap-3">
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

          <div>
            <p className="text-sm font-bold text-green-700">EVENT DETAIL</p>

            <h1 className="text-2xl font-black">Rugby Attend</h1>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>...</div>

          {currentUser?.role === "CAPTAIN" && (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/edit-event/${id}`)}
                className="
          rounded-xl
          bg-blue-100
          px-3
          py-2
          text-sm
          font-bold
          text-blue-700
        "
              >
                ✏️ 编辑
              </button>

              <button
                onClick={handleDeleteEvent}
                className="
          rounded-xl
          bg-red-100
          px-3
          py-2
          text-sm
          font-bold
          text-red-700
        "
              >
                删除
              </button>
            </div>
          )}
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-md">
          <div className="flex items-center justify-between">
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
                {event.eventType}
              </div>

              <h1
                className="
                    mt-3
                    text-3xl
                    font-black
                    text-gray-900
                  "
              >
                {event.title}
              </h1>
            </div>

            <div className="text-4xl">🏉</div>
          </div>

          <div className="mt-4 space-y-1 text-gray-600">
            <p>Event ID: {id}</p>
            <p>{event.eventDate}</p>
            <p>
              {event.startTime} - {event.endTime}
            </p>
            <p>{event.location}</p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <button
              onClick={() => handleStatusChange("ATTEND")}
              className={`
                rounded-xl
                p-3
                font-bold
                text-white
                transition
                ${
                  status === "ATTEND"
                    ? "bg-green-700"
                    : "bg-green-500 hover:bg-green-600"
                }
              `}
            >
              {t("attend")}
            </button>

            <button
              onClick={() => handleStatusChange("ABSENT")}
              className={`
                rounded-xl
                p-3
                font-bold
                text-white
                transition
                ${
                  status === "ABSENT"
                    ? "bg-red-700"
                    : "bg-red-500 hover:bg-red-600"
                }
              `}
            >
              {t("absent")}
            </button>

            <button
              onClick={() => handleStatusChange("MAYBE")}
              className={`
                rounded-xl
                p-3
                font-bold
                text-white
                transition
                ${
                  status === "MAYBE"
                    ? "bg-yellow-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }
              `}
            >
              {t("maybe")}
            </button>
          </div>

          <p className="mt-4 text-center text-lg font-bold">
            当前状态：{status}
          </p>

          <div className="mt-6">
            <p className="mb-2 font-semibold">{t("comment")}</p>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="
                h-24
                w-full
                rounded-xl
                border
                border-gray-300
                p-3
                outline-none
                focus:border-green-500
              "
              placeholder="コメントを入力..."
            />
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <h2 className="font-bold text-green-700">{t("attend")}</h2>
              {attendances
                .filter((a) => a.status === "ATTEND")
                .map((a) => (
                  <p key={a.id} className="text-gray-700">
                    {a.userName} {a.comment && `｜${a.comment}`}
                  </p>
                ))}
            </div>

            <div>
              <h2 className="font-bold text-red-700">{t("absent")}</h2>
              {attendances
                .filter((a) => a.status === "ABSENT")
                .map((a) => (
                  <p key={a.id} className="text-gray-700">
                    {a.userName} {a.comment && `｜${a.comment}`}
                  </p>
                ))}
            </div>

            <div>
              <h2 className="font-bold text-yellow-700">{t("maybe")}</h2>
              {attendances
                .filter((a) => a.status === "MAYBE")
                .map((a) => (
                  <p key={a.id} className="text-gray-700">
                    {a.userName} {a.comment && `｜${a.comment}`}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-green-100 p-3 text-center">
              <p className="text-xl font-black text-green-700">{attendCount}</p>

              <p className="text-xs font-bold text-green-700">{t("attend")}</p>
            </div>

            <div className="rounded-2xl bg-red-100 p-3 text-center">
              <p className="text-xl font-black text-red-700">{absentCount}</p>

              <p className="text-xs font-bold text-red-700">{t("absent")}</p>
            </div>

            <div className="rounded-2xl bg-yellow-100 p-3 text-center">
              <p className="text-xl font-black text-yellow-700">{maybeCount}</p>

              <p className="text-xs font-bold text-yellow-700">{t("maybe")}</p>
            </div>
          </div>

          <p className="mt-2 text-gray-600">
            {t("comment")}：{comment}
          </p>
        </div>
      </div>
      {showToast && (
        <div
          className="
                fixed
                bottom-6
                left-1/2
                -translate-x-1/2
                rounded-full
                bg-black
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-lg
                "
        >
          ✓ {t("saved")}
        </div>
      )}
    </div>
  );
}

export default EventDetailPage;
