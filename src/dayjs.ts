import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function formatDate(dateString: string) {
  return dayjs(dateString).format("MMM DD, YY'");
}

export const dayjsUtc = dayjs.utc;
