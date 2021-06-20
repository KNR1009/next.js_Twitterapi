import Twitter from "twitter";
import dotenv from "dotenv";

dotenv.config();

const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
});

export default async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(200).json([]);
  }

  const data = await (() => {
    return new Promise((resolve, reject) => {
      client.get(
        "search/tweets",
        { q, count: 100 },
        function (error, tweets, response) {
          resolve(tweets);
        }
      );
    });
  })();
  const statuses = (
    data as {
      statuses: {
        text: string;
      }[];
    }
  ).statuses;

  const param: {
    text: string;
  }[] = [];

  if (statuses) {
    statuses.forEach((tweet) => {
      param.push({
        text: tweet.text,
      });
    });
  }

  return res.status(200).json(param);
};
