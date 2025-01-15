import { get } from "@/app/api/api";
import Layout from "@/components/UI/Layout";
import BlogSlider from "@/components/BlogSlider/BlogSlider";

const getBlogPost = async (bid) => {
  const getBlogPost = await get(`/news/details/${bid}`).then(
    (response) => response?.payload
  );
  return getBlogPost;
};

export async function generateMetadata({ params: { slug } }) {
  const blogpost = await getBlogPost(slug);
  return {
    title: `${blogpost?.basic_data?.title} - Reflekta`,
    description: blogpost?.basic_data?.short_description,
    openGraph: {
      title: `${blogpost?.basic_data?.title} - Reflekta`,
      description: blogpost?.basic_data?.short_description,
      images: [
        {
          url: blogpost?.images?.thumb_image,
          width: 800,
          height: 600,
          alt: blogpost?.basic_data?.title,
          description: blogpost?.basic_data?.short_description,
        },
      ],
    },
  };
}
const BlogPost = async ({ params: { slug } }) => {
  const blogpost = await getBlogPost(slug);
  return (
    <>
      <Layout>
        {" "}
        <div className="mx-auto 4xl:container">
          <div className=" blogPostHolder mb-16 text-black">
            <div className=" imgHolder">
              <img
                src={blogpost?.images?.thumb_image}
                alt={blogpost?.basic_data?.title}
                className=" flex mx-auto mt-10 mb-4 max-sm:h-[230px] h-[350px] w-auto"
              />
            </div>
            <div className=" titleHolder">
              <h1 className="text-4xl mt-10 text-center text-black font-bold uppercase">
                {blogpost?.basic_data?.title}
              </h1>
              <p className="mt-3 date text-center font-medium text-black">
                {blogpost?.basic_data?.short_description}
              </p>
            </div>{" "}
            <div className="txtHolder max-md:!w-[95%] max-md:!mx-auto  prose md:!max-w-full max-w-screen prose-img:!max-h-[500px] prose-img:!object-cover prose-img:!w-full text-center">
              <div
                className=" text-black"
                dangerouslySetInnerHTML={{
                  __html: blogpost?.basic_data?.description,
                }}
              />
            </div>
            
            {blogpost?.gallery?.length > 0 && (
              <div className="md:w-[60%] mx-auto mt-[3rem]">
              <BlogSlider images={blogpost?.gallery} />
              </div>
            )}
            
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BlogPost;
