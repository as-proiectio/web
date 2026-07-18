export function formatSignalDate(dateStr: string): string {
  if (!dateStr) return "";

  // Check if the original string has time information (contains 'T' or ':')
  const hasTime = dateStr.includes("T") || dateStr.includes(":");
  if (!hasTime) {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.`;
    }
    return dateStr;
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "오후" : "오전";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  return `${year}.${month}.${day}. ${ampm} ${hour12}시 ${minutes}분`;
}
