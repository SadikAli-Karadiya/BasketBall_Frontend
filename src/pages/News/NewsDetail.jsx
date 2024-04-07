import React from "react";
import { useParams } from "react-router-dom";
import { WhatsappIcon } from "react-share";
import { WhatsappShareButton } from "react-share";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useGetNewsDetailsQuery } from "../../services/news";
import moment from 'moment'
import { API_BASE_URL } from "../../../constant";

const   NewsDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, isLoading, error } = useGetNewsDetailsQuery(params.id);
 

  let tags = data?.oneNewsDetails?.tags?.split(",");

  return (
    <div className="flex justify-center min-h-screen min-w-screen">
      <div className=" lg:px-28 py-8 lg:w-5/4 w-full">
        <div className="flex justify-end mr-3 sm:mr-5">
          <button
            onClick={(e) => navigate(-1)}
            className={
              "px-4  font-bold bg-black rounded-xl hover:scale-110 duration-200 hover:bg-orange-600 text-white flex justify-center items-center space-x-2 md:text-lg py-1"
            }
          >
            {" "}
            <BiArrowBack /> <span className="text-xs md:text-sm"> Go back </span>
          </button>
        </div>
        <div className="px-4 sm:px-8 md:px-12 py-4 space-y-3 w-full">
          <h1 className="text-2xl  lg:text-5xl ">{data?.oneNewsDetails?.title}</h1>
          <div className="flex  pt-4 space-x-3 text-xs font-bold uppercase italic">
            {tags?.map((tag) => (
              <span className="bg-orange-600 px-3 text-white rounded ">
                {tag}{" "}
              </span>
            ))}
            <span className="text-right">{moment(data?.oneNewsDetails).format('DD MMM YYYY')}</span>
          </div>
          <div className="rounded min-w-screen overflow-hidden max-h-[600px]">
            <img className="mx-auto w-full h-full object-fit" src={data?.oneNewsDetails?.photo} />
          </div>
          <p className=" text-sm md:text-base pt-4  ">{data?.oneNewsDetails?.description}</p>
          <div className=" flex justify-end items-center space-x-2">
            <span className="italic font-semibold text-lg"> Share on</span>
            <WhatsappShareButton
              className=""
              separator=""
              url={`https://${API_BASE_URL}/news/${params.id}/${params.title}`}
              quote={""}
            >
              <WhatsappIcon
                className="animate-pulse w-10 lg:w-12 hover:w-14 duration-300"
                round={true}
              />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
