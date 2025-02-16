"use client";

import ErrorComponent from "@/components/ErrorComponent";
import PageLoader from "@/components/PageLoader";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getMovies = async () => {
    setLoading(true);
    fetch(`/api/movie/${id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const getRuntime = (time: number) => {
    const hour = Number(time / 60);
    return `${Math.floor(hour)}hrs ${time % 60}m`;
  };

  return (
    <div>
      {!loading ? (
        <div>
          <div className="relative h-fit">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASEURL}${movie.backdrop_path}`}
              alt="Backdrop image"
              width={1400}
              height={500}
              className="w-full h-full object-cover absolute left-0 top-0 z-0"
            />

            <div className="w-full h-full text-white bg-black/50 py-[30px] px-10 relative z-10 grid md:grid-cols-[auto_1fr] gap-5 items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASEURL}${movie.poster_path}`}
                alt="Backdrop image"
                width={300}
                height={450}
                className="w-full object-cover"
              />

              <div>
                <Link
                  href={`https://www.themoviedb.org/movie/${id}`}
                  className="text-[35px] font-bold"
                  target="_blank"
                >
                  {movie?.original_title}{" "}
                  <span className="font-normal">
                    ({movie.release_date?.split("-")[0]})
                  </span>
                </Link>

                <div className="flex items-center mb-2 flex-wrap">
                  <span>{movie.release_date?.replaceAll("-", "/")}</span>
                  <span className="pl-3">({movie.origin_country})</span>
                  <div className="dot"></div>
                  {movie?.genres?.map((item: any, idx: number) => (
                    <span key={item.id} className="px-[2px]">
                      {item.name}
                      {idx !== movie?.genres?.length - 1 && ","}
                    </span>
                  ))}{" "}
                  <div className="dot"></div>
                  <span className="">{getRuntime(movie.runtime)}</span>
                </div>

                <div className="text-[17px] italic">{movie.tagline}</div>

                <div className="text-xl font-semibold mt-4">Overview</div>
                <div>{movie?.overview}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <PageLoader />
        </div>
      )}

      {!loading && !movie && (
        <ErrorComponent text="Failed to get movies" handleClick={getMovies} />
      )}
    </div>
  );
};

export default page;
