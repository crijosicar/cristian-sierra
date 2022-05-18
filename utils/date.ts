import moment from "moment";
import { Work } from "../entities/work";

export const formatDate = (date: moment.MomentInput): string => {
  return moment(date).format("MMM yyyy");
};

export const calculateElapsedTime = (work: Work): string => {
  const startDate = moment(work.startDate);
  const endDate = moment(work.endDate ? work.endDate : new Date());

  return moment.duration(endDate.diff(startDate)).asMonths().toFixed(0);
};
