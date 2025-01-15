import Filter from "../Filter/Filter";
import { useEffect, useState } from "react";
import { sortKeys } from "@/helpers/const";
import { useSearchParams } from "next/navigation";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Link from "next/link";
import { icons } from "@/lib/icons";
const Filters = ({
  selectedFilters,
  setSelectedFilters,
  availableFilters,
  changeFilters,
  setTempSelectedFilters,
  setChangeFilters,
  tempSelectedFilters,
  sort,
  setSort,
  setIsBeingFiltered,
  setLabel,
  active_categories_ids,
  categories,
  categoryChildren,
  isLoading,
}) => {
  const [openIndex, setOpenIndex] = useState({ key: null });
  const [activeSort, setActiveSort] = useState({ label: "" });
  const [sortingActive, setSortingActive] = useState(false);
  const urlParams = useSearchParams();

  useEffect(() => {
    const getSortFromUrl = () => {
      const sort = urlParams.get("sort");
      const sortArr = sort?.split("_");
      if (sort) {
        sortKeys.filter((item) => {
          if (item?.field === sortArr[0] && item?.direction === sortArr[1]) {
            setActiveSort({ label: item?.label });
            setLabel(item?.label);
          } else return;
        });
      }
    };
    getSortFromUrl();
  }, []);

  const buildAccordions = (categories = [], activeCategoryIds = []) => {
    return (categories ?? [])?.map((category) => {
      const hasChildren = category?.children?.length > 0;

      // Conditional class names for styling
      const summaryClasses = `hover:!bg-[#f5f5f5] group ${
        activeCategoryIds.includes(category?.id) ? "!bg-[#f5f5f5]" : ""
      }`;

      if (hasChildren) {
        return (
          <Accordion
            key={category?.id}
            defaultExpanded={activeCategoryIds.includes(category?.id)}
          >
            <AccordionSummary
              expandIcon={icons?.chevron_down}
              className={`aria-expanded:!bg-[#f5f5f5] ${summaryClasses}`}
              aria-expanded={activeCategoryIds.includes(category?.id)}
            >
              <div className={`flex items-center gap-2`}>
                <Link
                  href={`/kategorije/${category?.slug_path}`}
                  className={`hover:text-croonus-3`}
                >
                  {category?.name}
                </Link>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {buildAccordions(category?.children, activeCategoryIds)}
            </AccordionDetails>
          </Accordion>
        );
      }

      return (
        <Accordion key={category?.id} expanded={false}>
          <AccordionSummary className={summaryClasses}>
            <Link
              href={`/kategorije/${category?.slug_path}`}
              className={`group-hover:text-croonus-3`}
            >
              {category?.name}
            </Link>
          </AccordionSummary>
          <AccordionDetails>
            {/* Additional details or content for categories without children */}
            <div>{/* Place any additional content here */}</div>
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return (
    <>
      <div className="h-full ">
        <div className={`mb-[4rem]`}>
          {buildAccordions(categories, active_categories_ids)}
        </div>
        <div
          className={`flex flex-col py-[1.5rem] border-b border-b-[#f5f5f5] overflow-hidden ${(categoryChildren?.length > 0 || isLoading) && "!hidden"}`}
        >
          <div
            className="flex flex-row justify-between cursor-pointer items-center"
            onClick={() => setSortingActive(!sortingActive)}
          >
            <h1 className="text-[0.938rem] font-bold">Sortiranje</h1>
            <div className="flex items-center cursor-pointer">
              <p className="text-[#171717] font-bold">
                {sortingActive ? "-" : "+"}
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={
                sortingActive
                  ? `mt-0 transition-all py-[20px] duration-[750ms] flex flex-row gap-[11px] flex-wrap`
                  : `flex transition-all py-[20px] duration-[750ms] flex-row gap-[11px] flex-wrap -mt-52`
              }
            >
              {sortKeys?.map((item, index) => {
                const isActive = activeSort?.label === item?.label;
                return (
                  <div
                    key={index}
                    className={
                      isActive && sort.field !== "" && sort.direction !== ""
                        ? `px-3 select-none border-2 border-croonus-1 cursor-pointer py-[10px] font-medium rounded-lg bg-croonus-1 text-white`
                        : `px-3 select-none cursor-pointer py-[10px] border-2 rounded-lg border-[#e8e8e8]`
                    }
                    onClick={() => {
                      setActiveSort({
                        label:
                          activeSort?.label === item?.label
                            ? null
                            : item?.label,
                      });
                      setSort({
                        field: item?.field,
                        direction: item?.direction,
                      });
                      setLabel(item?.label);
                      setIsBeingFiltered(true);
                    }}
                  >
                    <p className="font-light text-[13px]">{item?.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {availableFilters?.map((filter, index) => {
          if (
            filter?.attribute?.name !== "Cena" &&
            filter?.group?.name !== "Cena"
          ) {
            const isOpen = openIndex.key === filter.key;

            return (
              <>
                <div
                  className={`flex ${(categoryChildren?.length > 0 || isLoading) && "!hidden"} cursor-pointer py-[1.375rem] select-none border-b border-b-[#f5f5f5] items-center justify-between`}
                  onClick={() =>
                    setOpenIndex({
                      key: openIndex?.key === filter?.key ? null : filter?.key,
                    })
                  }
                  key={filter?.key}
                >
                  <h1 className="text-[0.938rem] font-bold">
                    {filter?.attribute?.name || filter?.group?.name}
                  </h1>
                  <div>
                    <h1 className={`text-[#171717] font-bold `}>
                      {isOpen ? `-` : `+`}
                    </h1>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div
                    className={
                      isOpen
                        ? `mt-0  py-[1rem] transition-all duration-[750ms]`
                        : `hidden py-[1rem]  transition-all duration-[750ms] `
                    }
                  >
                    <Filter
                      filter={filter}
                      selectedFilters={selectedFilters}
                      setTempSelectedFilters={setTempSelectedFilters}
                      changeFilters={changeFilters}
                      setChangeFilters={setChangeFilters}
                      setSelectedFilters={setSelectedFilters}
                      tempSelectedFilters={tempSelectedFilters}
                    />
                  </div>
                </div>
              </>
            );
          } else {
            // Ako je ime filtera "Cena", ne prikazujte ga
            return null;
          }
        })}
      </div>
    </>
  );
};

export default Filters;
