const DEFAULT_ENDPOINT =
  "https://sa-east-1.cdn.hygraph.com/content/cl70fxxzg1fwv01t83najbw7a/master";

export type HygraphAsset = {
  id?: string;
  url: string;
  fileName?: string | null;
  width?: number | null;
  height?: number | null;
};

export type Portfolio = {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  portfolioThumbnail: HygraphAsset;
  photos: HygraphAsset[];
};

export type SiteData = {
  homePages: Array<{
    title: string;
    bannerText: string;
    spoilerText?: string | null;
    homeBackground: HygraphAsset;
    portfolioThumbnail: HygraphAsset[];
  }>;
  portfolios: Portfolio[];
  aboutMes: Array<{
    name: string;
    summary: { text: string };
    photo: HygraphAsset;
    imgText?: HygraphAsset | null;
    portfolioExamples: HygraphAsset[];
  }>;
};

const query = `
  query SiteData {
    homePages(first: 1) {
      title
      bannerText
      spoilerText
      homeBackground { id url fileName width height }
      portfolioThumbnail(first: 30) { id url fileName width height }
    }
    portfolios(first: 50) {
      id
      title
      slug
      summary
      portfolioThumbnail { id url fileName width height }
      photos(first: 100) { id url fileName width height }
    }
    aboutMes(first: 1) {
      name
      summary { text }
      photo { id url fileName width height }
      imgText { id url fileName width height }
      portfolioExamples(first: 30) { id url fileName width height }
    }
  }
`;

const fallback: SiteData = {
  homePages: [
    {
      title: "Sarah Heloísa",
      bannerText: "Aqui você encontra experiências memoráveis eternizadas em fotos",
      spoilerText:
        "Uma coleção de fotografias que guardam grandes histórias por trás.",
      homeBackground: {
        url: "https://sa-east-1.graphassets.com/AgzBvzhJ6RGxUaZajJpOQz/LuRlXAuPQu4ryx6s7fdO",
        fileName: "sarah.gif",
      },
      portfolioThumbnail: [],
    },
  ],
  portfolios: [
    {
      id: "fallback-laguna",
      title: "Tarde em Laguna",
      slug: "laguna",
      portfolioThumbnail: {
        url: "https://sa-east-1.graphassets.com/AgzBvzhJ6RGxUaZajJpOQz/ViuVfNLTKih7xChh9IQQ",
        width: 740,
        height: 1117,
      },
      photos: [
        {
          url: "https://sa-east-1.graphassets.com/AgzBvzhJ6RGxUaZajJpOQz/MTNNVF73QceHj0dAVNOQ",
          width: 740,
          height: 1117,
        },
        {
          url: "https://sa-east-1.graphassets.com/AgzBvzhJ6RGxUaZajJpOQz/pBDJWDkQQ6ix6Lly4tEk",
          width: 740,
          height: 1117,
        },
      ],
    },
  ],
  aboutMes: [
    {
      name: "Sarah Heloísa",
      summary: {
        text: "Fotógrafa e estudante de Publicidade e Propaganda. Por aqui dispenso poses: acredito que são os momentos espontâneos que resultam nas melhores fotos.",
      },
      photo: {
        url: "https://sa-east-1.graphassets.com/AgzBvzhJ6RGxUaZajJpOQz/wvtPorfRTZqPolUVj52c",
        width: 720,
        height: 900,
      },
      portfolioExamples: [],
    },
  ],
};

let siteDataPromise: Promise<SiteData> | undefined;

async function loadSiteData(): Promise<SiteData> {
  const endpoint = import.meta.env.HYGRAPH_ENDPOINT || DEFAULT_ENDPOINT;
  const token = import.meta.env.HYGRAPH_TOKEN;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Hygraph respondeu com status ${response.status}`);
    }

    const payload = (await response.json()) as {
      data?: SiteData;
      errors?: Array<{ message: string }>;
    };

    if (payload.errors?.length || !payload.data) {
      throw new Error(payload.errors?.map((error) => error.message).join("; ") || "Resposta vazia");
    }

    return payload.data;
  } catch (error) {
    console.warn("[hygraph] Usando conteúdo de contingência:", error);
    return fallback;
  }
}

export function getSiteData(): Promise<SiteData> {
  siteDataPromise ??= loadSiteData();
  return siteDataPromise;
}
