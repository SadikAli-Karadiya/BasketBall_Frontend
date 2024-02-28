import React from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import moment from 'moment'


export default function NewsCard(news) {
  let tags = news?.news?.tags?.split(",");
  return (
    <div className="cursor-pointer relative shadow-2xl group rounded-2xl overflow-hidden">
      <Link
        className="Link"
        to={`/news/${news?.news?.id}/${news?.news?.title.split(" ").join("-")}`}
      >
        <div className="w-full">
          <LazyLoad placeholder={<WB />} once>
            <img className=" h-80 w-full object-cover" src={news?.news?.photo} />
          </LazyLoad>
        </div>
        <div
          className={`absolute overflow-hidden flex flex-col  space-y-0 md:space-y-0 justify-end w-full  bottom-0  left-0 text-white bg-gradient-to-l   from-gray-300 via-black  to-gray-900 px-2  py-2 lg:px-8 lg:pt-4 pb-2 opacity-90 group-hover:opacity-100  duration-500 transition`}>

          <div className="py-1 lg:pt-3 leading-relaxed overflow-hidden w-full">
            <h1
              className={`text-sm md:text-base lg:text-lg font-bold opacity-100 line-clamp-2`}
            >
              {news?.news?.title}
            </h1>
          </div>
          <div className="flex overflow-hidden space-x-2 py-2 lg:space-x-4 italic items-center uppercase text-xs md:text-[10px] lg:text-xs font-bold ">
            <div className="flex space-x-2">
              {tags?.map((tag) => (
                <span className="bg-orange-600 px-3  rounded ">{tag} </span>
              ))}
            </div>
            <span className=" text-orange-600 font-bold ">
              {
                news?.news?.created_at ?
                  moment(news?.news?.created_at).format('DD MMM YYYY')
                  :
                  ""
              }

            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
const WB = () => {
  return (
    <div className="bg-gray-700 rounded-2xl animate-pulse  h-60 ">
      {/* <img src="/CBL_Images/cbl.webp" className="w-full h-full" /> */}
      <h1 className="opacity-0 ">
        qui saepe odio tempore magnam incidunt? Voluptatum placeat quas dolorem?
        Quia recusandae harum quisquam esse, quos impedit vel neque provident
        placeat accusantium et, repellendus amet.
      </h1>
    </div>
  );
};
