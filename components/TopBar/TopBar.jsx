import Link from "next/link";
import LanguageSelector from "../LanguageSelector/LanguageSelector"

const TopBar = () => {
  return (
    <div className="bg-black/90 backdrop-blur-md pt-3 pb-1 max-md:hidden w-[100%] z-[600] text-white px-[0.4rem] relative">
      <div className="mx-auto flex flex-row justify-between w-[90%] items-center">
        <div className="text-xs text-white max-lg:flex max-lg:justify-between">
          {/* <span className="max-lg:text-sm text-[1rem] font-medium mr-3"><Link href="tel:+38131524" className="hover:cursor-pointer">{process.env.TELEPHONE}</Link></span>
          <span className="max-lg:text-sm text-[1rem] font-medium">{process.env.WORKINGHOURS}</span> */}
        </div>
       
        <div className="text-[1rem] font-medium text-white lg:block ml-6">
        <span className="max-lg:text-sm text-[1rem] font-medium mr-3"> <Link href={`tel:${process.env.TELEPHONE}`} className="hover:cursor-pointer">{process.env.TELEPHONE}</Link></span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
