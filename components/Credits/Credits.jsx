import { format } from "date-fns";

const Credits = () => {
  const currentYear = format(new Date(), "yyyy");

  return (
    <div className="flex items-center bg-croonus-1">
      <div className="flex w-full items-center justify-center py-3 text-center text-base text-white md:mx-auto md:w-[90%]">
        <span className="text-center">
          &copy; {currentYear} {process.env.COMPANY} | Sva prava zadržana. Powered by{" "}
          <a href="https://www.croonus.com/" className="text-[#44b849]">
            Croonus Technologies.
          </a>
        </span>
      </div>
    </div>
  );
};

export default Credits;
