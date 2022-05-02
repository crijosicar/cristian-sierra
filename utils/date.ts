import { DocumentData, Timestamp } from "@google-cloud/firestore";
import moment from "moment";
import { Work } from "../pages/work/[id]";

export const formatFieldsDate = (documentData: DocumentData) => {
  const data = documentData;
  Object.keys(documentData).forEach((key) => {
    if (data[key] instanceof Timestamp) {
      data[key] = data[key].toDate();
    } else if (typeof data[key] === "object") {
      formatFieldsDate(documentData[key]);
    }
  });
  return data;
};

export const formatDate = (date: Date): string => {
  return moment(date).format("MMM yyyy");
};

export const calculateElapsedTime = (work: Work): string => {
  const startDate = moment(work.startDate);
  const endDate = moment(work.endDate ? work.endDate : new Date());

  return moment.duration(endDate.diff(startDate)).asMonths().toFixed(0);
};
