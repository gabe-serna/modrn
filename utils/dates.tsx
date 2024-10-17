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

export function getTransitMessage(inputDate: string): JSX.Element {
  const inputDateObj = new Date(inputDate);
  const inputDateOnly = new Date(
    inputDateObj.getFullYear(),
    inputDateObj.getMonth(),
    inputDateObj.getDate(),
  );

  const currentDate = new Date();
  const currentDateOnly = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  const timeDifference = currentDateOnly.getTime() - inputDateOnly.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return <span>Shipped today</span>;
  } else if (daysDifference === 1) {
    return <span>Shipped yesterday</span>;
  } else if (daysDifference <= 10) {
    return (
      <span>
        Shipped <span className="text-gold-400">{daysDifference}</span> days ago
      </span>
    );
  } else {
    return (
      <span className="text-red-400">
        Shipped <b>{daysDifference}</b> days ago
      </span>
    );
  }
}

export function getDeliveredMessage(inputDate: string): JSX.Element {
  const inputDateObj = new Date(inputDate);
  const inputDateOnly = new Date(
    inputDateObj.getFullYear(),
    inputDateObj.getMonth(),
    inputDateObj.getDate(),
  );

  const currentDate = new Date();
  const currentDateOnly = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  const timeDifference = currentDateOnly.getTime() - inputDateOnly.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return <span>Delivered today</span>;
  } else if (daysDifference === 1) {
    return <span>Delivered yesterday</span>;
  } else if (daysDifference <= 10) {
    return (
      <span>
        Delivered <span className="text-gold-400">{daysDifference}</span> days
        ago
      </span>
    );
  } else if (daysDifference <= 30) {
    return (
      <span>
        Delivered{" "}
        <span className="text-gold-400">{Math.floor(daysDifference / 7)}</span>{" "}
        weeks ago
      </span>
    );
  } else if (daysDifference <= 365) {
    const monthsDifference = Math.floor(daysDifference / 30);
    return (
      <span>
        Delivered <span className="text-gold-400">{monthsDifference}</span>{" "}
        months ago
      </span>
    );
  } else {
    const yearsDifference = Math.floor(daysDifference / 365);
    return (
      <span>
        Delivered <span className="text-red-400">{yearsDifference}</span> years
        ago
      </span>
    );
  }
}
