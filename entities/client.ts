import { Project } from "./project";

export interface Client {
  startDate: Date;
  clientName: string;
  endDate: Date;
  projects: Project[];
}
