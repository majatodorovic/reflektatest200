import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center constructionHolder">
        <div className="relative z-[49] col-span-1 rounded-lg w-[300px] h-[300px] positionImage">
          <Image
            src="/icons/under-construction.png"
            alt="Reflekta"
            fill={true}
            style={{ objectFit: "contain" }}
            className="object-scale-down max-sm:w-[100%]"
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-opacity-50 constructionText text-center">
          <p className="font-medium">
            Izvinite, stranica je trenutno u izradi.
          </p>
          <Link
            href="/"
            className="mt-[1rem] flex rounded-xl bg-white px-6 py-2 text-base  text-black hover:bg-opacity-80 w-fit"
          >
            Idite na početnu
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
