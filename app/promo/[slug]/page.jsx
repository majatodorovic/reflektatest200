import LandingPage from "@/components/PromoPage/LandingPage";

const PromoPage = async ({ params: { slug } }) => {
  return (
    <>
      <LandingPage slug={slug} />
    </>
  );
};

export default PromoPage;
