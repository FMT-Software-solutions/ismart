// Impact figures shown on the home page.
//
// Live counts come from the database. `baseline` is added on top of the live
// count to account for students/trainings from before the website existed.
// Set `override` to a number to show a fixed figure instead of the live count.
// Pending confirmation from the iSMART team (see PENDING_CONTENT.md).
export const siteStatsConfig = {
  studentsEnrolled: { baseline: 0, override: null as number | null },
  trainingsAndWebinars: { baseline: 0, override: null as number | null },
  // No courses table exists yet, so this defaults to the number of
  // program areas until a real figure is supplied.
  coursesOffered: { override: null as number | null },
};

// `code` is the ISO 3166-1 alpha-2 code used to load the flag from flagcdn.com
export const countriesReached = [
  { name: 'Ghana', code: 'gh' },
  { name: 'Nigeria', code: 'ng' },
  { name: 'Uganda', code: 'ug' },
  { name: 'Kenya', code: 'ke' },
  { name: 'Germany', code: 'de' },
  { name: 'Canada', code: 'ca' },
  { name: 'United States', code: 'us' },
  { name: 'United Kingdom', code: 'gb' },
];

// Free flag images (no API key). SVGs stay sharp at any size.
export const getFlagUrl = (code: string) => `https://flagcdn.com/${code}.svg`;

export const continentsReached = ['Africa', 'Europe', 'Asia', 'North America'];

export interface SiteStats {
  studentsEnrolled: number;
  coursesOffered: number;
  trainingsAndWebinars: number;
  countries: number;
  continents: number;
}
