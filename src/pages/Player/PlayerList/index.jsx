import React from "react";
import Heading from "../../../Component/Heading";
import { AiOutlineSearch } from "react-icons/ai";
import { GiBasketballJersey } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useGetAllPlayersQuery } from '../../../services/player';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Loader from "../../../Component/Loader";
import Pagination from 'react-responsive-pagination'
import '../../../Component/Pagination/pagination.css'


const PlayerList = () => {
  const [search, setSearch] = React.useState("");
  const [pageNo, setPageNo] = React.useState(1);
  const { isLoading, data } = useGetAllPlayersQuery({
    pageNo: pageNo - 1,
    search,
  });
  return (
    <section className="min-h-screen-fit">
      <div>
        {isLoading && <Loader />}
        {data && (
          <div>
            <div className="flex flex-col min-h-screen px-4 sm:px-10 2xl:px-32 lg:px-14">
              <div className="xs:py-10 py-10">
                <h1 className="xs:text-3xl sm:text-3xl md:text-4xl text-center font-bold  italic uppercase text-[#ee6730]  ">All Players</h1>
              </div>
              <div className="mx-auto w-full">
                <div className="flex mb-10 justify-center ">
                  <input
                    type="text"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    value={search}
                    className=" rounded-lg w-full lg:w-2/3 rounded-r-none  appearance-none border border-gray-400 border-r-0 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:shadow-2xl duration-300 text-base focus:outline-none  "
                    name="search"
                    placeholder="Search Player"
                  />
                  <button className="text-2xl rounded-lg border rounded-l-none border-[#ee6730] border-l-0 bg-[#ee6730]  hover:bg-gray-800 group text-white px-2 shadow-2xl ">
                    <AiOutlineSearch className="group-hover:scale-110 duration-300" />
                  </button>
                </div>
                <div className="flex w-full flex-col items-center lg:px-8  space-y-6 py-3 sm:py-0 ">
                  {data?.data && data?.data?.length > 0 ? (
                    data?.data.map((player, index) => {
                      return (
                        <Link
                          key={player.id}
                          className="w-full  scale-105"
                          to={`/player/profile-detail/${player.id}`}
                        >
                          <div className="duration-300 relative justify-end bg-black rounded-lg text-white overflow-hidden shadow-xl cursor-pointer hover:scale-[1.03] w-6/7  md:w-full h-full ">
                            <div className=" flex justify-end items-center ">
                              <img
                                src={player?.team_players[0]?.teams?.logo ? player?.team_players[0]?.teams?.logo : ""}
                                alt=""
                                className="w-28 h-28 object-cover opacity-20 "
                              />
                            </div>
                            <div className="bg-gradient-to-b  from-[#e64100]  absolute  md:top-[-32px] md:left-[-20px] w-10 h-10 rotate-[30deg] top-[-15px] left-[-15px] md:h-20 md:w-14 content-start md:rotate-[45deg] flex justify-center items-center">
                              <h1 className="rotate-[-30deg] md:rotate-[315deg] text-xs font-bold md:text-lg mt-1 ml-5 md:ml-6">
                                {(index + 1) + ((pageNo - 1) * 10)}
                              </h1>
                            </div>
                            <div className=" flex flex-col px-5 space-y-2 sm:space-y-0 sm:px-8 lg:px-12 sm:flex-row w-full absolute top-2 sm:top-5 md:top-5 xl:top-4 content-center">
                              {/* avtar start */}
                              <div className="text-center sm:w-[65%] space-x-1 sm:space-x-2 w-full items-center justify-start flex">
                                <div className="w-1/3 lg:w-40">
                                  <img
                                    src={player?.photo ? player?.photo : "/CBL_Images/player-default-profile.webp"}
                                    className=" object-cover h-12 w-14 sm:w-20 sm:h-16 xl:h-20 rounded-full shadow-md "
                                  />
                                </div>
                                <div className="flex justify-center items-center w-1/2">
                                  <h1 className="text-gray-600 font-bold xs:text-[10px] sm:text-xs lg:text-base uppercase">
                                    {player?.playing_position ? player?.playing_position : "...."}
                                  </h1>
                                </div>
                                <div className="flex flex-col w-full justify-start">
                                  <h1 className="text-white font-extrabold text-base sm:text-lg md:text-xl lg:text-[24px] text-start ">
                                    {player?.first_name}
                                  </h1>
                                  <h1 className="text-gray-600 font-bold text-[8px] sm:text-[10px] lg:text-xs xl:text-sm text-start ">
                                    {player?.team_players[0]?.teams?.team_name ? player?.team_players[0]?.teams?.team_name : "...."}
                                  </h1>
                                </div>
                              </div>
                              {/* avtar end */}
                              {/* statiscs start */}
                              <div className="2xl:justify-end py-1 g:p-2 w-full sm:w-[35%] flex items-center justify-center ">
                                <div className="flex justify-between w-full ">
                                  <div className="flex flex-col text-center">
                                    <h1
                                      className="text-sm sm:text-lg md:text-2xl  lg:text-3xl 
                             font-bold text-[#373B4E]"
                                    >
                                      {player?.player_statistics[0]?.matches_played ? player?.player_statistics[0]?.matches_played : "0"}
                                    </h1>
                                    <span className="text-[10px] md:text-[11px] lg:text-xs xl:text-base text-[#1c76bb] font-bold">
                                      Total
                                    </span>
                                  </div>
                                  <div className="flex flex-col text-center">
                                    <h1
                                      className="text-sm sm:text-lg md:text-2xl lg:text-3xl 
                             font-bold text-green-600"
                                    >
                                      {player?.player_statistics[0]?.matches_won ? player?.player_statistics[0]?.matches_won : "0"}
                                    </h1>
                                    <span className="text-[10px] md:text-[11px] lg:text-xs xl:text-base text-[#1c76bb] font-bold">
                                      Won
                                    </span>
                                  </div>
                                  <div className="flex flex-col text-center">
                                    <h1
                                      className="text-sm sm:text-lg md:text-2xl lg:text-3xl 
                             font-bold text-red-600"
                                    >
                                      {player?.player_statistics[0]?.matches_lost ? player?.player_statistics[0]?.matches_lost : "0"}
                                    </h1>
                                    <span className="text-[10px] md:text-[11px] lg:text-xs xl:text-base text-[#1c76bb] font-bold">
                                      lost
                                    </span>
                                  </div>
                                  <div className="flex flex-col text-center">
                                    <h1
                                      className="text-sm sm:text-lg md:text-2xl lg:text-3xl
                             font-bold text-green-600"
                                    >
                                      {player?.player_statistics[0]?.points ? player?.player_statistics[0]?.points : "0"}
                                    </h1>
                                    <span className="text-[10px] md:text-[11px] lg:text-xs xl:text-base text-[#1c76bb] font-bold">
                                      Points
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* statics end */}
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="flex justify-center items-center mt-16 md:mt-24">
                      {!isLoading && (
                        <GiBasketballJersey className="text-2xl xs:text-3xl sm:text-5xl text-gray-400 mr-2" />
                      )}
                      <p className="text-xs xs:text-sm sm:text-lg font-medium text-gray-400">
                        {isLoading ? <div>Loading .....</div> : "Player Not Found"}
                      </p>
                    </div>
                  )}

                </div>


                <div className='mx-auto px-20 py-12 sm:px-24 sm:py-12 md:px-28 md:py-16'>
                  <Pagination
                    total={data && data.pageCount ? data.pageCount : 0}
                    current={pageNo}
                    onPageChange={(page) => setPageNo(page)}
                  // previousLabel="Previous" nextLabel="Next"
                  />
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </section>




  );
};

export default PlayerList;
