import { get } from "../../api/api";
import dynamic from "next/dynamic";
import parse from "html-react-parser";
import Layout from "@/components/UI/Layout";


const getCareerPost = async (kid) => {
  const getCareerPost = await get(`career/${kid}`).then(
    (response) => response?.payload?.items
  );
  return getCareerPost;
};


const CareerPost = async ({ params: { kid } }) => {
  const careerpost = await getCareerPost(kid);

  return (
    
    <>
      <Layout>
        <div className="mx-auto 4xl:container">
            {careerpost?.map((item, index) => {
                return(
                    <div className="my-[4rem] text-center md:min-h-[400px]">
                        <h1 className="text-3xl font-semibold uppercase ">{item?.name}</h1>
                        <div className="mt-1 text-[#8e8e8e]">
                        {item?.candidates_number > 1 ? (
                            <span >{item?.candidates_number} Izvršioca</span>
                        ) : (
                            <span >{item?.candidates_number} Izvršilac</span>
                        )}
                        </div>
                        <p className="mt-[3rem]"> <div dangerouslySetInnerHTML={{ __html: item?.description }}></div></p>
                    </div>
                )
            })}
        </div>
      </Layout>
    </>
  );
};

export default CareerPost;
