const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: "https://cardboardcrstg.wpengine.com",
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_SECRET,
  version: "wc/v3",
});

type responseData = {
  success: boolean;
  products: Product[];
  error?: string;
};

export default async function handler(req, res) {
  const responseData: responseData = {
    success: false,
    products: [],
  };

  try {
    const { data } = await api.get("products", {
      per_page: 50,
    });

    responseData.success = true;
    responseData.products = data;

    res.json(responseData);
  } catch (error) {
    responseData.error = error.message;
    res.status(500).json(responseData);
  }
}
