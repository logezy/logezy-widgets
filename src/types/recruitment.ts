export interface Opening {
  id: string;
  title: string;
  job?: string;
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
  color?:string;
  timeSpan?:string;
  requirement?: string;
}

export type ViewState = 'list' | 'detail';