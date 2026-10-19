/**
 * Current vacancies. Only add real, approved openings with confirmed terms.
 * Arrangement, location eligibility and compensation structure must be
 * confirmed per vacancy. Never imply guaranteed earnings.
 */
export type Vacancy = {
  id: string;
  title: string;
  arrangement: "Salaried (base + commission)" | "Independent contractor";
  locationEligibility: string;
  summary: string;
  published: boolean;
};

export const vacancies: Vacancy[] = [];

export const publishedVacancies = vacancies.filter((v) => v.published);
