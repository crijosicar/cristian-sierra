import moment from "moment";
import { Work } from "../pages/work/[id]";

export const formatDate = (date: Date): string => {
  return moment(date).format("MMM yyyy");
};

export const calculateElapsedTime = (work: Work): string => {
  const startDate = moment(work.startDate);
  const endDate = moment(work.endDate ? work.endDate : new Date());

  return moment.duration(endDate.diff(startDate)).asMonths().toFixed(0);
};
