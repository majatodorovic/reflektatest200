"use client";
import { useState, useCallback, useEffect } from "react";
import { list, get } from "@/app/api/api";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Layout from "@/components/UI/Layout";
import { useParams } from "next/navigation";

const Seo = dynamic(() => import("@/components/Seo/Seo"), {
  ssr: false,
  loading: () => null,
});

const BlogPage = () => {
  const params = useParams();
  const bid = params?.bid;
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      const fetchBlog = await list(`news/category/list/${bid}`).then((res) =>
        setBlog(res?.payload?.items)
      );
    };
    fetchBlog();
  }, []);
  const [postNum, setPostNum] = useState(15);

  function handleClick() {
    setPostNum((prevPostNum) => prevPostNum + 3);
  }
  const numPostsLoaded = Math.min(postNum, blog.length);
  const allPostsLoaded = numPostsLoaded === blog.length;
  return (
    <>
      <Layout>
        <Seo
          title="Blog"
          keywords="blog"
          description="Blog"
          ogtitle="Blog"
          ogdescription="Blog"
          ogurl={`${process.env.BASE_URL}blog`}
        />
        <div className="mx-auto 4xl:container text-black">
          <div className=" blogHolder mx-4">
            <div className=" titleHolder">
              <h1 className="mt-10 mb-6 text-center text-4xl font-bold uppercase">
                Vesti
              </h1>
              {/*<p className="mb-16 text-center text-lg">Blog tekstovi</p>*/}
            </div>
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
              {blog?.slice(0, postNum).map((row) => {
                return (
                  // <div className="col-span-1 mb-6 p-4" key={row?.id}>
                  //   <Link href={`/blog/${row?.id}`} className={``}>
                  //     <div className="flex flex-col" id={row.id}>
                  //       <div className="!h-[200px] flex-1">
                  //         <Image
                  //           src={row.images.thumb_image}
                  //           className="rounded-xl cursor-pointer object-cover h-[270px]"
                  //           alt={row.title}
                  //           width={2050}
                  //           height={3250}
                  //         />
                  //       </div>
                  //       <div className="">
                  //         <h5 className="mt-2 mb-2 text-[1.2rem] font-bold uppercase">
                  //           {row.basic_data.title}
                  //         </h5>
                  //         <button className=" blogReadMore flex items-center text-[18px]">
                  //           Pročitajte više
                  //           <i className="fa-solid fa-arrow-right ml-2 h-[20px] text-base hover:text-croonus-4 " />
                  //         </button>
                  //       </div>
                  //     </div>
                  //   </Link>
                  // </div>
                  <div className={`col-span-1 h-full w-full`} key={row?.id}>
                    <Link
                      href={`/reference/vest/${row?.slug}`}
                      className={`flex flex-col gap-2 w-full h-[100%]`}
                    >
                      <div
                        className={`h-[300px] max-sm:h-[180px] w-full relative`}
                      >
                        <Image
                          src={row.images.thumb_image}
                          className="rounded-xl w-full cursor-pointer object-cover"
                          alt={row.title}
                          fill
                          priority
                        />
                      </div>
                      <div className="">
                        <h5 className="mt-2 mb-2 text-[1.2rem] max-sm:text-[0.9rem] font-bold uppercase">
                          {row.basic_data.title}
                        </h5>
                        <button className=" blogReadMore flex items-center text-[0.8rem] sm:text-[18px]">
                          Pročitajte više
                          <i className="fa-solid fa-arrow-right ml-2 h-[20px] text-base hover:text-croonus-4 " />
                        </button>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          {allPostsLoaded ? (
            <button className="loadMoreButton">Nema više</button>
          ) : (
            <button onClick={handleClick} className="loadMoreButton">
              Učitaj još
            </button>
          )}
        </div>
      </Layout>
    </>
  );
};

export default BlogPage;

// import { get } from "../../api/api";
// import Layout from "@/components/UI/Layout";
//
// const getBlogPost = async (bid) => {
//   const getBlogPost = await get(`/news/${bid}`).then(
//     (response) => response?.payload
//   );
//   return getBlogPost;
// };
//
// export async function generateMetadata({ params: { bid } }) {
//   const blogpost = await getBlogPost(bid);
//   return {
//     title: `${blogpost?.basic_data?.title} - Reflekta`,
//     description: blogpost?.basic_data?.short_description,
//     openGraph: {
//       title: `${blogpost?.basic_data?.title} - Reflekta`,
//       description: blogpost?.basic_data?.short_description,
//       images: [
//         {
//           url: blogpost?.images?.thumb_image,
//           width: 800,
//           height: 600,
//           alt: blogpost?.basic_data?.title,
//           description: blogpost?.basic_data?.short_description,
//         },
//       ],
//     },
//   };
// }
// const BlogPost = async ({ params: { bid } }) => {
//   const blogpost = await getBlogPost(bid);
//   console.log(blogpost)
//   return (
//     <>
//       <Layout>
//       </Layout>
//     </>
//   );
// };
//
// export default BlogPost;
