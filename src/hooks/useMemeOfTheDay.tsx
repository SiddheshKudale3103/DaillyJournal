import { useEffect, useState } from "react";

type Meme = {
  title: string;
  url: string;
  postLink: string;
  subreddit: string;
};

export function useMemeOfTheDay() {
  const [meme, setMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeme() {
      try {
        const res = await fetch("https://meme-api.com/gimme");
        const data = await res.json();
        setMeme({
          title: data.title,
          url: data.url,
          postLink: data.postLink,
          subreddit: data.subreddit,
        });
      } catch (err) {
        console.error("Failed to fetch meme:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeme();
  }, []);

  return { meme, loading };
}
