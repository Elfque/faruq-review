"use client";

import SIngleMovie from "@/components/SIngleMovie";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMoviesFromServer = () => {
    setLoading(true);
    fetch("/api/movies")
      .then((res) => res.json())
      .then(({ data }) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  useEffect(() => {
    getMoviesFromServer();
  }, []);

  return (
    <div className="p-6">
      <div className="movie-grid">
        {loading ? (
          <div className=""></div>
        ) : (
          movies?.map((item: any) => <SIngleMovie movie={item} key={item.id} />)
        )}
      </div>
    </div>
  );
}
