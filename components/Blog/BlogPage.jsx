"use client";
import { useState, useEffect } from "react";
import { list, get } from "@/app/api/api";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/UI/Layout";

const BlogPage = () => {
  const [blog, setBlog] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredBlog, setFilteredBlog] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const getCategories = await get("news/categories/tree").then((response) =>
        setCategories(response?.payload)
      );
    };
    getCategories();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await list("news/category/list/all");
      setBlog(res?.payload?.items);
      setFilteredBlog(res?.payload?.items);
    };
    fetchBlog();
  }, []);

  const [postNum, setPostNum] = useState(3);
  function handleClick() {
    setPostNum((prevPostNum) => prevPostNum + 3);
  }
  const numPostsLoaded = Math.min(postNum, blog.length);
  const allPostsLoaded = numPostsLoaded === blog.length;

  return (
    <>
      <Layout>
        <div className="mx-auto 4xl:container text-black">
          <div className=" blogHolder mx-4 relative md:min-h-[300px]">
            <div className=" titleHolder">
              <h1 className="mt-10 mb-6 text-center text-4xl font-bold uppercase">
                Kategorije
              </h1>
            </div>
            <div className="flex my-[4rem] md:min-h-[500px]">
              {categories?.map((category) => {
                return (
                  <div className="col-span-1 mr-6">
                    <Link href={`/reference/${category?.slug}`}>
                      {category?.image ? (
                        <Image
                          src={category?.image}
                          width={400}
                          height={300}
                          className="rounded-lg"
                        />
                      ) : null}

                      <span className="text-lg mt-[1rem] block">
                        {category?.name}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BlogPage;
