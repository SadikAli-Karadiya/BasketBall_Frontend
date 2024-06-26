import React from 'react'
import { RxDotFilled } from 'react-icons/rx';
import { BsCalendar2Week } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import moment from 'moment'

function Tournaments_cards({ tournament }) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/tournament/${tournament.id}`);
    }
    const prevSlide = () => {
        var tournament = document.getElementById("tournament")
        tournament.scrollLeft = tournament.scrollLeft - 380;
    };

    const nextSlide = () => {
        var tournament = document.getElementById("tournament")
        tournament.scrollLeft = tournament.scrollLeft + 380;
    };

    const maxLength = 20;

    const truncatedText = tournament.tournament_name.length > maxLength ? tournament.tournament_name.slice(0, maxLength) + '...' : tournament.tournament_name;

    return (
        <>
            <div className="relative shadow-lg bg-white shadow-[#f7d12520] min-w-[260px] hover:scale-105  duration-300 xs:min-w-[320px] rounded-lg sm:min-w-[350px] md:min-w-[330px] max-w-[300px] h-[170px] xs:h-[190px]  group cursor-pointer" onClick={handleClick}>
                <div className='w-full flex justify-end items-end '>
                    <img src="/CBL_Images/495f339d-92fe-4b3c-a820-621336d292f6.jpg" alt="" className='rounded-lg w-2/4 xs:w-2/4 sm:w-1/2 lg:w-2.5/5 xl:w-2/4 2xl:w-2.5/5' />
                </div>
                {
                    tournament.status == 2
                        ?
                        <div className='flex items-end justify-start w-full absolute top-0 left-0 '>
                            <p className='uppercase font-semibold text-green-600 rounded-tl-lg  text-[10px] md:text-[12px]  flex items-center px-1 pt-1'>
                                <RxDotFilled className='md:text-base animate-ping' />
                                Ongoing
                            </p>
                        </div>
                        :
                        tournament.status == 1
                            ?
                            <div className='flex items-end justify-start w-full absolute top-0 left-0 '>
                                <p className='uppercase font-semibold text-red-600 rounded-tl-lg  text-[10px] md:text-[12px]  flex items-center px-2 pt-1'>
                                    Upcoming
                                </p>
                            </div>
                            :
                            <div className='flex items-end justify-start w-full absolute top-0 left-0 '>
                                <p className='uppercase font-semibold text-gray-400 rounded-tl-lg  text-[10px] md:text-[12px]  flex items-center px-2 pt-1'>
                                    Ended
                                </p>
                            </div>
                }
                <div className='absolute left-6 top-5 space-y-3 w-1/2 h-1/3 flex justify-start items-center  '>
                    <h1 className="text-2xl uppercase font-bold ">
                        {truncatedText}
                    </h1>
                </div>
                <div className=''>
                    <div className='w-full flex justify-center items-center z-[2] space-x-5 mt-0 xs:mt-2 sm:mt-0 '>
                        <BsCalendar2Week className=' text-base transition-all text-black' />
                        <div className='flex  justify-center items-center   '>
                            <p className=" transition-all text-black text-[12px] md:text-[12px] font-semibold xl:text-base">
                                {moment(tournament.start_date).format('DD/MM/YYYY')}
                            </p>
                            <p className='mx-2  font-medium transition-all hidden md:block text-[#ee6730]  text-[7px] md:text-base'>to</p>
                            <p className='mx-2  font-medium transition-all md:hidden text-[#ee6730]  text-[7px] md:text-base'>/</p>
                            <p className="transition-all text-black text-[12px] md:text-[12px] font-semibold xl:text-base">
                                {moment(tournament.end_date).format('DD/MM/YYYY')}
                            </p>
                        </div>
                    </div>
                    <div className='bg-[#ee6730] rounded-md mt-3 text-center text-sm py-1 text-white mx-8 line-clamp-1 text-ellipsis'>
                        {tournament.address}
                    </div>
                </div>
            </div>

            {/* Left Arrow  */}
            <div onClick={prevSlide}
                className="justify-center hidden lg:block absolute left-2 bottom-[40%] active:scale-90 hover:bg-black duration-300 group items-center p-2 bg-white  text-black shadow-xl  rounded-full cursor-pointer">
                <FaChevronLeft
                    className="text-lg group-hover:text-white" />
            </div>
            {/* Right Arrow  */}
            <div onClick={nextSlide}
                className="justify-center hidden lg:block absolute bottom-[40%] right-2 active:scale-90 hover:bg-black duration-300 group items-center p-2 bg-white  text-black shadow-xl  rounded-full cursor-pointer">
                <FaChevronRight
                    className="text-lg group-hover:text-white" />
            </div>
        </>
    )
}

export default Tournaments_cards

