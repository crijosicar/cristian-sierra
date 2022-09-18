import { Social } from "./social";
import { Education } from "./education";
import { Certification } from "./certification";

export interface About {
  id: string;
  social: Social;
  education: Education[];
  summary: string;
  certifications: Certification[];
  currentLocation: string;
  citizenship: string;
  resumeUrl: string;
  fullName: string;
  dateOfBirth: Date;
}
