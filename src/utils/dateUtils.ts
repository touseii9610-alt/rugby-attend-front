export function formatEventDateTime(
  startDateTime: string,
  endDateTime: string,
  isAllDay: boolean,
) {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });

  const startDate = formatDate(start);
  const endDate = formatDate(end);

  const date = startDate === endDate ? startDate : `${startDate} ～ ${endDate}`;

  if (isAllDay) {
    return {
      date,
      time: "終日",
    };
  }

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return {
    date,
    time: `${formatTime(start)} ～ ${formatTime(end)}`,
  };
}
