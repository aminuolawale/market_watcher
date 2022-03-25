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
// let response = null;
// new Promise(async (resolve, reject) => {
//   try {
//     response = await axios.get(
//       "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
//       {
//         headers: {
//           "X-CMC_PRO_API_KEY": "7d3dafd2-9524-415f-b2d2-2e15bbad953e",
//         },
//         params: {
//           start: "1",
//           limit: "5",
//           convert: "USD",
//         },
//       }
//     );
//   } catch (ex) {
//     response = null;
//     // error
//     console.log(ex);
//     reject(ex);
//   }
//   if (response) {
//     // success
//     const json = response.data;
//     console.log(json);
//     res.status(200).json(json);
//   }
// });
