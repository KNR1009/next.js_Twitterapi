import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [tweets, setTweets] = useState([]);

  useEffect(async () => {
    if (tweets.length) {
      return;
    }

    const q = "Progate";
    const { data } = await axios.get(`/api/tweets?q=${encodeURIComponent(q)}`);

    if (data.length) {
      setTweets(data);
    }
  }, [tweets]);

  return (
    <ol>
      {tweets.map((tweet, i) => {
        return <li key={i}>{tweet.text}</li>;
      })}
    </ol>
  );
}
