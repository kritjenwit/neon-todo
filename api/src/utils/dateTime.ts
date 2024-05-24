import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const dateTime = (format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs().tz("Asia/Bangkok").format(format);
};
export const timestamp = () => {
  return dayjs().tz("Asia/Bangkok").valueOf();
};
