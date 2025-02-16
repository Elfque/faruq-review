import Image from "next/image";
import { useRouter } from "next/navigation";

const SIngleMovie = ({ movie }: { movie: any }) => {
  const router = useRouter();

  return (
    <div
      className="rounded-sm cursor-pointer"
      onClick={() => {
        router.push(`/movies/${movie.id}`);
      }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASEURL}${movie.poster_path}`}
        alt="poster"
        width={150}
        height={225}
        className="w-full object-cover rounded-lg"
      />

      <div className="p-2">
        <div className="font-bold">{movie.original_title}</div>
        <div className="text-sm text-gray-400 text-black/95">
          {movie.release_date}
        </div>
      </div>
    </div>
  );
};

export default SIngleMovie;
