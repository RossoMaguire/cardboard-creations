import axios from "axios";

const etsyApi = axios.get(
  "https://openapi.etsy.com/v3/application/shops/29403884/reviews",
  {
    headers: {
      "x-api-key": process.env.ETSY_API_KEY,
      Cookie: process.env.ETSY_API_COOKIE,
    },
  }
);

type etsyResponseData = {
  count: number;
  results: Review[];
};

export default async function handler(req, res) {
  const responseData: etsyResponseData = {
    count: 0,
    results: [],
  };

  try {
    const { data } = await etsyApi;

    responseData.count = data.count;
    responseData.results = data.results;

    res.json(responseData);
  } catch (error) {
    res.status(500).json(error);
  }
}
