export interface Opening {
  id: string;
  title: string;
  role?: string;
  department?: string;
  location: string;
  type: string;
  excerpt: string;
  description?: string;
  url: string;
  rate?: number;
  hourlyRate?: number;
  salary?: number;
  payRate?: number;
  currency?: string;
}

export type ViewState = 'list' | 'detail';