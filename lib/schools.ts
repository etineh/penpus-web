// Programmatic per-school landing pages. Students search their school name, not
// "campus app" — so /schools/unical etc. is the compounding SEO channel.
export type School = {
  slug: string;
  short: string;
  name: string;
  city: string;
};

export const schools: School[] = [
  { slug: "unical", short: "UNICAL", name: "University of Calabar", city: "Calabar" },
  { slug: "unilag", short: "UNILAG", name: "University of Lagos", city: "Lagos" },
  { slug: "oau", short: "OAU", name: "Obafemi Awolowo University", city: "Ile-Ife" },
  { slug: "unn", short: "UNN", name: "University of Nigeria, Nsukka", city: "Nsukka" },
  { slug: "ui", short: "UI", name: "University of Ibadan", city: "Ibadan" },
  { slug: "abu", short: "ABU", name: "Ahmadu Bello University", city: "Zaria" },
  { slug: "uniben", short: "UNIBEN", name: "University of Benin", city: "Benin City" },
  { slug: "futa", short: "FUTA", name: "Federal University of Technology, Akure", city: "Akure" },
  { slug: "lasu", short: "LASU", name: "Lagos State University", city: "Lagos" },
  { slug: "uniport", short: "UNIPORT", name: "University of Port Harcourt", city: "Port Harcourt" },
];

export const getSchool = (slug: string) => schools.find((s) => s.slug === slug);
