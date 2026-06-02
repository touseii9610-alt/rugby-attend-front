export function formatEventDateTime(
  startDateTime: string,
  endDateTime: string,
  isAllDay: boolean,
) {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  const date = start.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  if (isAllDay) {
    return {
      date,
      time: "終日",
    };
  }

  const startTime = start.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = end.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date,
    time: `${startTime} ～ ${endTime}`,
  };
}
