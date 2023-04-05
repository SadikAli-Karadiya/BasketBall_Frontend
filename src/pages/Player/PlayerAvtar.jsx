import React from "react";
import ReadMoreReact from 'read-more-react';

export default function PlayerAvtar({ player }) {

  const defaultImage = "/CBL_Images/60111-removebg-preview.png";
  return (
    <div className=" flex flex-col items-center  mx-auto   ">
      <img
        className="mx-auto w-32 h-32 md:w-44 md:h-44 lg:w-60   lg:h-60 object-cover shadow rounded-full"
        src={player?.SinglePlayerDetails?.photo ? player?.SinglePlayerDetails?.photo : defaultImage}
      />

      <div className="p-2 flex flex-col justify-center items-center space-y-1 overflow-hidden ">
        <h1 className="text-3xl text-center text-gray-900">
          {player?.SinglePlayerDetails?.first_name} {player?.SinglePlayerDetails?.last_name}
        </h1>
        <div className="flex items-center justify-center ">
          <span className="px-2    text-xs italic  font-semibold text-white rounded-lg ">
            {player?.SinglePlayerDetails?.team_players[0]?.teams?.team_name ? player?.SinglePlayerDetails?.team_players[0]?.teams?.team_name : "--"}
          </span>
          <span>-</span>
          <span className="px-2  text-xs italic bg-gray-800 font-semibold text-white rounded-lg ">
            {player?.SinglePlayerDetails?.playing_position}
          </span>
        </div>
        <div className="flex items-start justify-start w-[100%] h-full overflow-hidden">
          <p className='text-center text-gray-600 text-sm lg:w-1/2 mx-auto '>
            {player.SinglePlayerDetails.about}
          </p>
        </div>
        {
          player?.SinglePlayerDetails?.about?.length > 70 ?
            <h1 className="text-center text-sm cursor-pointer font-semibold">Read More</h1>
            :
            ""
        }
      </div>
    </div>
  );
}
