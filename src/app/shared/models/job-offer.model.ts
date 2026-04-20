export interface SkillInfo {
  name: string;
  proficiencyLevel: string | null;
}

export interface JobOffer {
  id: string;
  role: string;
  company: string;
  city: string | null;
  seniority: string | null;
  employmentType: string | null;
  jobTimeType: string | null;
  remote: boolean | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryAvg: number | null;
  salaryCurrency: string | null;
  publishedDate: string | null;
  url: string | null;
  category: string | null;
  uploadTimestamp: string;
  skills: SkillInfo[];
}