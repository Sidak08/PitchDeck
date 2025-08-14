export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  school: string;
  grade: string;
  approved?: boolean;
  favourites?: string[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CompetitionData {
  title: string;
  organizer: string;
  logo: string;
  gradeEligibility: string;
  deadline: Date;
  prize: string;
  status: string;
  description: string;
  applicationType: string;
  applyUrl: string;
  frequency: string;
  dates: [string, string];
  location: string;
  cost: string;
}

export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  school: string;
  grade: string;
  approved: boolean;
  favourites: string[];
}

export interface FavouritesData {
  competitionId: string;
}

export interface ApiResponse<T = unknown> {
  message?: string;
  user?: UserData;
  competition?: CompetitionData;
  favourites?: string[] | CompetitionData[];
  data?: T;
}
