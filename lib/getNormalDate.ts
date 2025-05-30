export function getNormalDate(inputDate: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    weekday: "short",
    month: "short",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    inputDate
  );
  
  // Add ordinal suffix to the day
  const day = inputDate.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";
  return formattedDate.replace(/\b(\d{1,2})\b/, `$1${suffix}`);
}
  
// export function getNormalDate(inputDate: Date): string {
//   const day = inputDate.getDate();

//   // Add ordinal suffix to the day
//   const suffix =
//     day === 1 || day === 21 || day === 31
//       ? "st"
//       : day === 2 || day === 22
//       ? "nd"
//       : day === 3 || day === 23
//       ? "rd"
//       : "th";

//   const month = inputDate.toLocaleString("en-US", { month: "short" }); // Get short month name
//   const year = inputDate.getFullYear();

//   return `${day}${suffix} ${month}, ${year}`;
// }