// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const axios = require("axios");

const handler = async (req, res) => {
  const resp = await axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CRYPTO_API_KEY,
      },
      params: {
        start: "1",
        limit: "5",
        convert: "USD",
      },
    }
  );
  if (resp.status == 200) {
    const data = await resp.data;
    res.status(200).json(data.data);
  } else console.log(resp);
};
export default handler;
