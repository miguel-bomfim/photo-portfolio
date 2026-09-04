const DEFAULT_ENDPOINT =
  "https://sa-east-1.cdn.hygraph.com/content/cl70fxxzg1fwv01t83najbw7a/master";

export type HygraphAsset = { id?: string; url: string; fileName?: string | null; width?: number | null; height?: number | null };
export type RichText = { text?: string | null; html?: string | null };

export type Portfolio = {
  id: string; title: string; slug: string; summary?: string | null;
  portfolioThumbnail: HygraphAsset; photos: HygraphAsset[];
};

export type ProfessionalProject = {
  id: string; title: string; slug: string; summary: string;
  client?: string | null; year?: number | null; areas: string[];
  cover: HygraphAsset; gallery: HygraphAsset[];
  challenge?: RichText | null; strategy?: RichText | null;
  execution?: RichText | null; results?: RichText | null;
  featured?: boolean | null; order?: number | null;
};

export type BlogPost = {
  id: string; title: string; slug: string; excerpt: string;
  cover?: HygraphAsset | null; content: RichText; category?: string | null;
  featured?: boolean | null; seoTitle?: string | null;
  seoDescription?: string | null; publishedAt?: string | null;
};

export type SiteSettings = {
  name?: string | null; professionalLabel?: string | null;
  email?: string | null; instagramUrl?: string | null;
  instagramHandle?: string | null; location?: string | null;
  responseTime?: string | null; availability?: string | null;
};

export type SiteData = {
  homePages: Array<{
    title: string; bannerText: string; spoilerText?: string | null;
    heroTitle?: string | null; heroText?: string | null;
    homeBackground: HygraphAsset; portfolioThumbnail: HygraphAsset[];
  }>;
  portfolios: Portfolio[];
  professionalProjects: ProfessionalProject[];
  blogs: BlogPost[];
  siteSettings: SiteSettings | null;
  aboutMes: Array<{
    name: string; summary: RichText; headline?: string | null;
    shortBio?: string | null; roles?: string[] | null;
    services?: RichText | null; photo: HygraphAsset;
    imgText?: HygraphAsset | null; portfolioExamples: HygraphAsset[];
  }>;
};

const coreQuery = `
  query CoreSiteData {
    homePages(first: 1) {
      title bannerText spoilerText
      homeBackground { id url fileName width height }
      portfolioThumbnail(first: 30) { id url fileName width height }
    }
    portfolios(first: 50) {
      id title slug summary
      portfolioThumbnail { id url fileName width height }
      photos(first: 100) { id url fileName width height }
    }
    aboutMes(first: 1) {
      name summary { text html }
      photo { id url fileName width height }
      imgText { id url fileName width height }
      portfolioExamples(first: 30) { id url fileName width height }
    }
  }
`;

const editorialQuery = `
  query EditorialSiteData {
    professionalProjects(first: 50, orderBy: order_ASC) {
      id title slug summary client year areas
      cover { id url fileName width height }
      gallery(first: 100) { id url fileName width height }
      challenge { text html }
      strategy { text html }
      execution { text html }
      results { text html }
      featured order
    }
    blogs(first: 50, orderBy: publishedAt_DESC) {
      id title slug excerpt category featured seoTitle seoDescription publishedAt
      cover { id url fileName width height }
      content { text html }
    }
    siteSettingsList(first: 1) {
      name: nome professionalLabel email instagramUrl instagramHandle
      location responseTime availability
    }
    homePages(first: 1) { heroTitle heroText }
    aboutMes(first: 1) {
      headline shortBio roles services { text html }
    }
  }
`;

const fallback: SiteData = {
  homePages: [{
    title: "Sarah Heloísa",
    bannerText: "Estratégia, conteúdo e imagem para transformar ideias em presença.",
    spoilerText: "Publicidade, social media e fotografia conectadas por um olhar atento às histórias e às pessoas.",
    homeBackground: {
      url: "https://sa-east-1.graphassets.com/AgzBvzhJ6RGxUaZajJpOQz/LuRlXAuPQu4ryx6s7fdO",
      fileName: "sarah.gif",
    },
    portfolioThumbnail: [],
  }],
  portfolios: [{
    id: "fallback-laguna", title: "Tarde em Laguna", slug: "laguna",
    portfolioThumbnail: {
      url: "https://sa-east-1.graphassets.com/AgzBvzhJ6RGxUaZajJpOQz/ViuVfNLTKih7xChh9IQQ",
      width: 740, height: 1117,
    },
    photos: [{
      url: "https://sa-east-1.graphassets.com/AgzBvzhJ6RGxUaZajJpOQz/MTNNVF73QceHj0dAVNOQ",
      width: 740, height: 1117,
    }],
  }],
  professionalProjects: [], blogs: [], siteSettings: null,
  aboutMes: [{
    name: "Sarah Heloísa",
    summary: { text: "Publicitária, social media e fotógrafa. Estratégia, conteúdo e imagem se encontram em um trabalho atento às pessoas e às histórias." },
    photo: {
      url: "https://sa-east-1.graphassets.com/AgzBvzhJ6RGxUaZajJpOQz/wvtPorfRTZqPolUVj52c",
      width: 720, height: 900,
    },
    portfolioExamples: [],
  }],
};

type CoreData = Pick<SiteData, "homePages" | "portfolios" | "aboutMes">;
type EditorialData = {
  professionalProjects: ProfessionalProject[]; blogs: BlogPost[];
  siteSettingsList: SiteSettings[];
  homePages: Array<{ heroTitle?: string | null; heroText?: string | null }>;
  aboutMes: Array<{
    headline?: string | null; shortBio?: string | null;
    roles?: string[] | null; services?: RichText | null;
  }>;
};

async function requestGraphQL<T>(query: string): Promise<T> {
  const endpoint = import.meta.env.HYGRAPH_ENDPOINT || DEFAULT_ENDPOINT;
  const token = import.meta.env.HYGRAPH_TOKEN;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) throw new Error(`Hygraph respondeu com status ${response.status}`);
  const payload = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (payload.errors?.length || !payload.data) {
    throw new Error(payload.errors?.map((error) => error.message).join("; ") || "Resposta vazia");
  }
  return payload.data;
}

let siteDataPromise: Promise<SiteData> | undefined;

async function loadSiteData(): Promise<SiteData> {
  let core: CoreData;
  try {
    core = await requestGraphQL<CoreData>(coreQuery);
  } catch (error) {
    console.warn("[hygraph] Usando conteúdo de contingência:", error);
    return fallback;
  }

  let editorial: EditorialData | null = null;
  try {
    editorial = await requestGraphQL<EditorialData>(editorialQuery);
  } catch (error) {
    console.warn("[hygraph] Conteúdo editorial indisponível:", error);
  }

  const homeExtras = editorial?.homePages[0];
  const aboutExtras = editorial?.aboutMes[0];
  return {
    homePages: core.homePages.map((home, index) => index === 0 ? { ...home, ...homeExtras } : home),
    portfolios: core.portfolios,
    professionalProjects: editorial?.professionalProjects || [],
    blogs: editorial?.blogs || [],
    siteSettings: editorial?.siteSettingsList[0] || null,
    aboutMes: core.aboutMes.map((about, index) => index === 0 ? { ...about, ...aboutExtras } : about),
  };
}

export function getSiteData(): Promise<SiteData> {
  siteDataPromise ??= loadSiteData();
  return siteDataPromise;
}
