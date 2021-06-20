import { useEffect, useState } from "react";
import fetch from "node-fetch";

export default function IndexPage() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const f = async () => {
      if (tweets.length) {
        return;
      }

      const q = "すたば";
      const res = await fetch(`/api/tweets?q=${encodeURIComponent(q)}`).then(
        (res) => {
          return res.json();
        }
      );

      setTweets(res);
    };
    f();
  }, [tweets]);

  return (
    <ol>
      {tweets.map((tweet, i) => {
        return <li key={i}>{tweet.text}</li>;
      })}
    </ol>
  );
}
