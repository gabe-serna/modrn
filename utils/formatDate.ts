export function formatDateToLocal(dateString: string) {
  const date = new Date(dateString);

  const localDate = date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${localDate}`;
}
