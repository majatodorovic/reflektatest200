import StaticPage from "@/components/StaticPage/StaticPage";
import { list } from "@/app/api/api";

const DynamicStaticPage = ({ params: { slug } }) => {
  return <StaticPage slug={slug} />;
};

export default DynamicStaticPage;

// export async function generateStaticParams() {
//   const data = await list("/static-pages/list").then((res) => res?.payload);
//
//   return data?.items?.map((item) => ({
//     slug: item?.slug?.toString(),
//   }));
// }
// export const revalidate = 30;
