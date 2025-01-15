
import { list } from "../api/api";
import Link from "next/link";
import dynamic from "next/dynamic";


const getData = (slug) => {
    return list("/static-pages/content/o-nama").then((res) => {
        return res?.payload;
    });
};

const Onama = async () => {
    const data = await getData();

    const staticData = data?.items?.map((items) => {
        return items;
    });

    const keyGenerator = (prefix) => {
        return `${prefix}-${Math.random().toString(36)}`;
    };

    return (
        <>
            <div className={`4xl:container mx-auto py-[1.2rem]`}>
                <div className="w-[90%] mx-auto prose !max-w-full">


                    {staticData?.map((item) => {
                        return (
                            <div dangerouslySetInnerHTML={{ __html: item?.content }}></div>
                        )
                    })}

                </div>
            </div>

        </>
    );
};


export default Onama;
