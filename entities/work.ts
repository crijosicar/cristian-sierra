import { Client } from "./client";

export interface Work {
  id: string;
  slug: string;
  clients: Client[];
  summary: string;
  contractType: string;
  companyIcon: string;
  startDate: Date;
  endDate: Date;
  position: string;
  commitments: string[];
  companyName: string;
  location: string;
}
