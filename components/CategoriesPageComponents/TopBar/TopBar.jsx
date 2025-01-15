import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import GenerateBreadcrumbs from "../../../helpers/GenerateBreadCrumbs";
import Layout from "../../UI/Layout";

const TopBarCategories = ({ asPath, categoryData }) => {
  return (
    <div className="bg-croonus-1 py-16 max-lg:py-10">
      <Layout>
        <div className="flex flex-col  items-center justify-between max-lg:gap-6 lg:flex-row ">
          <div className="flex flex-col gap-3">
            <div className="hidden items-center gap-2 lg:flex">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-base text-croonus-3"
              />
              <span className="text-base text-croonus-3">
                <Link href="/">Početna</Link>
              </span>
            </div>
            <h1 className="text-3xl font-bold text-croonus-3">{categoryData.basic_data.name}</h1>
          </div>

          <GenerateBreadcrumbs asPath={categoryData.basic_data.name} />
        </div>
      </Layout>
    </div>
  );
};

export default TopBarCategories;
