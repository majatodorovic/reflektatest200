"use client";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import Breadcrumbs from "@/helpers/generateBreadCrumbsServer";
import Image from "next/image";
import Link from "next/link";
import Brand1 from "../../assets/Brands/zumtobel.png";
import Brand2 from "../../assets/Brands/thorneco.png";
import Brand3 from "../../assets/Brands/osram.png";
import Brand4 from "../../assets/Brands/ledvance.png";
import Brand5 from "../../assets/Brands/ave.png";
import Brand6 from "../../assets/Brands/viokeff.png";
import Brand7 from "../../assets/Brands/zambelis.png";
import Brand8 from "../../assets/Brands/sikrea.png";
import Brand9 from "../../assets/Brands/esperia.png";
import Brand10 from "../../assets/Brands/gibas.png";
import Brand11 from "../../assets/Brands/tooy.png";
import Brand12 from "../../assets/Brands/venicem.png";
import Brand13 from "../../assets/Brands/fabbian.png";
import Brand14 from "../../assets/Brands/foscarini.png";
import Brand15 from "../../assets/Brands/lumina.png";
import Brand16 from "../../assets/Brands/oluce.png";
import Brand17 from "../../assets/Brands/qeeboo.png";
import Brand18 from "../../assets/Brands/ondaluce.png";
import Brand19 from "../../assets/Brands/slamp.png";
import Brand20 from "../../assets/Brands/ines_artdesign.png";
import Brand21 from "../../assets/Brands/slv.png";
import Brand22 from "../../assets/Brands/flexxica.png";
import Brand23 from "../../assets/Brands/zumaline.png";
import Brand24 from "../../assets/Brands/fama.png";
import Brand25 from "../../assets/Brands/buzziispace.png";
import Brand212 from "../../assets/Brands/thorn.png"
import Brand55 from "../../assets/Brands/aca.png";
import Brand77 from "../../assets/Brands/vk.png"
import Brand35 from "../../assets/Brands/maytoni.png"
import Brand222 from "../../assets/Brands/alphabet.png"
import Brand122 from "../../assets/Brands/biffi.png"
import Brand1222 from "../../assets/Brands/aqlus.png"
import Brand12222 from "../../assets/Brands/delightfull.png"
import Brand99 from "../../assets/Brands/leucos.png"

const Seo = dynamic(() => import("@/components/Seo/Seo"), {
  ssr: false,
  loading: () => null,
});

const Brendovi = () => {
  const router = useRouter();
  const { asPath } = router;

  const data = [
    { id: 1, image: Brand1, link:"https://www.zumtobel.com/com-en/index.html" },
    { id: 4, image: Brand4, link:"https://www.ledvance.com/" },
    { id: 212, image: Brand212, link:"https://www.thornlighting.com/en" },
    { id: 3, image: Brand3, link:"https://www.osram.com/cb/" },
    { id: 2, image: Brand2, link:"https://thorn-eco.com/en/" },
    { id: 13, image: Brand13, link:"https://www.fabbian.com/en" },
    { id: 14, image: Brand14, link:"https://www.foscarini.com/en/" },
    { id: 8, image: Brand8, link:"https://www.sikrea.com/?lang=en" },
    { id: 17, image: Brand17, link:"https://www.qeeboo.com/en" },
    { id: 19, image: Brand19, link:"https://www.slamp.com/en" },
    { id: 24, image: Brand24, link:"https://famasofas.com/inicio-en" },
    { id: 5, image: Brand5, link:"https://avespa.rs/" },
    { id: 55, image: Brand55, link:"https://acalight.gr/" },
    { id: 6, image: Brand6, link:"https://viokef.com/en/home/" },
    { id: 7, image: Brand7, link:"https://www.zambelislights.gr/en/" },
    { id: 77, image: Brand77, link:"https://vkled.gr/en/" },
    { id: 16, image: Brand16, link:"https://www.oluce.com/en/" },
    { id: 25, image: Brand25, link:"https://www.buzzi.space/" },
    { id: 15, image: Brand15, link:"https://www.lumina.it/" },
    { id: 35, image: Brand35, link:"/" },
    { id: 23, image: Brand23, link:"https://zumaline.lighting/" },
    { id: 22, image: Brand22, link:"https://flexxica.com/" },
    { id: 222, image: Brand222, link:"https://alphabetlights.com/" },
    { id: 18, image: Brand18, link:"https://www.ondaluce-illuminazione.com/en/%20%C2%A0%C2%A0" },
    { id: 11, image: Brand11, link:"https://www.tooy.it/" },
    { id: 12, image: Brand12, link:"https://www.venicem.com/" },
    { id: 122, image: Brand122, link:"https://www.biffi.com/it/" },
    { id: 1222, image: Brand1222, link:"https://www.aqlus.com/" },
    { id: 12222, image: Brand12222, link:"https://new.delightfull.eu/" },
    { id: 9, image: Brand9, link:"https://www.esperialuci.com/en" },
    { id: 99, image: Brand99, link:"https://www.leucos.com/en/" },
    { id: 20, image: Brand20, link:"https://www.in-es.com/" },
    { id: 10, image: Brand10, link:"https://www.gibas.it/" },
    { id: 21, image: Brand21, link:"https://www.slv.com/uk_en/" },
  ];

  return (
    <div className="mx-auto">
      <Seo
        title="O nama"
        description="O nama"
        ogtitle="O nama"
        ogdescription="O nama"
        ogurl={`${process.env.BASE_URL}o-nama`}
      />
      <div className="bg-croonus-4 py-4 text-croonus-1">
        <div className="w-[90%] lg:w-[86%] 2xl:w-[70%] mx-auto">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-2">
                <i className="fa-solid fa-chevron-left text-lg w-[10px]" />
                <p
                  className="cursor-pointer text-base"
                  onClick={() => router.back()}
                >
                  Nazad
                </p>
              </div>

              <p className="text-2xl font-bold">Brendovi</p>
            </div>
            <Breadcrumbs asPath={asPath} />
          </div>
        </div>
      </div>
      <div className="w-[90%] lg:w-[86%] 2xl:w-[70%] mx-auto py-[2rem]">
        <p>Brendove koje zastupamo kao i njihove proizvode možete pronaći na sledećim linkovima:</p>
        <div className="grid grid-cols-5 gap-3 mt-[2rem]">
        {data?.map(({ id, image, link }) => {
            return (
              <div key={id} className="col-span-5 md:col-span-1">
                <div className="max-md:m-[0.2rem] bordergray py-[1rem] max-md:py-[0.6rem] max-md:px-[0.6rem] px-[3rem]">
                  <Link href={link} target="_blank">
                    <Image
                      src={image}
                      alt="brand"
                      width={300}
                      height={140}
                      quality={100}
                      sizes={`100vw`}
                      className={`max-h-[100px] hoverbrand`}
                    />
                  </Link>
                </div>
                </div>
              )})}
          </div>
        </div>
 
      </div>

  );
};

export default Brendovi;
