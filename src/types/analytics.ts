export interface ClickData {
  date: string;
  clicks: number;
}

export interface BrowserData {
  browser: string;
  count: number;
}

export interface LocationData {
  country: string;
  count: number;
}

export interface UrlAnalyticsType {
  clicks: number;
  clicksOverTime: ClickData[];
  browsers: BrowserData[];
  locations: LocationData[];
} 