export function formatDateToLocal(dateString: string, short?: boolean): string {
  const date = new Date(dateString);

  const localDate = date.toLocaleDateString(undefined, {
    month: short ? "short" : "long",
    day: "numeric",
    year: "numeric",
  });

  return `${localDate}`;
}

export function getShippingMessage(inputDate: string): JSX.Element {
  const inputDateObj = new Date(inputDate);
  const inputDateOnly = new Date(
    inputDateObj.getFullYear(),
    inputDateObj.getMonth(),
    inputDateObj.getDate(),
  );

  const shipByDate = new Date(inputDateOnly);
  shipByDate.setDate(inputDateOnly.getDate() + 5); // Ship by 5 days from input date

  const currentDate = new Date();
  const currentDateOnly = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  const timeDifference = shipByDate.getTime() - currentDateOnly.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return <span>Ship today</span>;
  } else if (daysDifference === 1) {
    return <span>Ship tomorrow</span>;
  } else if (daysDifference > 1) {
    return (
      <span>
        Ship in <span className="text-gold-400">{daysDifference}</span> days
      </span>
    );
  } else {
    return (
      <span className="text-red-400">
        Ship by <b>{Math.abs(daysDifference)}</b> days ago
      </span>
    );
  }
}
