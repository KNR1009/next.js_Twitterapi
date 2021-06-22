import { useEffect, useState, useCallback } from "react";
import { getTweetsData } from "../lib/posts";
import fetch from "node-fetch";

export default function IndexPage({ data }) {
  const [tweets, setTweets] = useState([]);

  // console.log(data);

  useEffect(() => {
    const f = async () => {
      if (tweets.length) {
        return;
      }

      const q = "プログラミング";
      const res = await fetch(`/api/tweets?q=${encodeURIComponent(q)}`).then(
        (res) => {
          return res.json();
        }
      );

      setTweets(res);
    };
    f();
  }, [tweets]);

  // APIの同期ができているかの確認;
  useEffect(() => {
    const f = async () => {
      const data = await getTweetsData();
      console.log(data);
    };
    f();
  });

  return (
    <div>
      <ol>
        {tweets.map((tweet, i) => {
          return <li key={i}>{tweet.text}</li>;
        })}
      </ol>
      {/* {data &&
        data.map((t) => {
          <ol key={t.id}>{t.title}</ol>;
        })} */}
    </div>
  );
}

// export async function getStaticProps() {
//   const data = await getTweetsData();

//   return {
//     props: { data },
//     // revalidate: 3,
//   };
// }
