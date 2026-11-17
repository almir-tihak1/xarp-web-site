// Company details that are the same in every language.
// Texts that get translated live in lib/dictionaries/.

export const site = {
  name: "Xarp Tec",
  legalName: "Xarp-Tec",
  // Brand line under the logo; stays in English on every language version.
  slogan: "Transforming ideas into reality",
  url: "https://www.xarp-tec.com",
  email: "info@xarp-tec.com",
  // The country is added in the page language (contact.country in the dictionaries).
  address: ["Vržerala 153", "80101 Livno"],
  linkedin: "https://www.linkedin.com/company/xarp-tec/",
};

export const techStack = [
  { category: "backend", items: ["C#", "ASP.NET Core", "REST API"] },
  { category: "databases", items: ["MSSQL", "PostgreSQL"] },
  {
    category: "frontend",
    items: ["HTML", "CSS", "LESS", "JavaScript", "TypeScript", "Angular", "Knockout", "React"],
  },
  { category: "desktop", items: ["WinForms", "WPF"] },
  { category: "devops", items: ["Git", "Azure DevOps"] },
] as const;

export type TechCategory = (typeof techStack)[number]["category"];
