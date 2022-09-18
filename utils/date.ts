import moment from "moment";
import { Work } from "../entities/work";
import { has } from "lodash";
// import { firestore } from "firebase-admin";
// import DocumentData = firestore.DocumentData;
// import Timestamp = firestore.Timestamp;

export const formatDate = (date: moment.MomentInput): string => {
  return moment(date).format("MMM yyyy");
};

export const calculateElapsedTime = (work: Work): string => {
  const startDate = moment(work.startDate);
  const endDate = moment(work.endDate ? work.endDate : new Date());

  return moment.duration(endDate.diff(startDate)).asMonths().toFixed(0);
};

export const formatFieldsDate = (documentData: any): any => {
  const data = documentData;
  Object.keys(documentData).forEach((key) => {
    const date = data[key];
    if (typeof date === "object" && has(date, ["_seconds"])) {
      data[key] = date.toDate();
    } else if (typeof date === "object") {
      formatFieldsDate(documentData[key]);
    }
  });
  return data;
};
