export const fetchHome = async () => {
  const HYGRAPH_ENDPOINT = process.env.HYGRAPH_API || "";
  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
        homePage(where: {id: "clmtyvdhc5a850blt4aubhmt6"}) {
          homePhotos {
            url
            width
            height
          }
          bannerText
          homeBackground {
            url
          }
        }
      }`,
    }),
  });
  const postsData = await response.json();
  return postsData.data;
};
