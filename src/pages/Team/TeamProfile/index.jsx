import React from "react";
import TeamCard from "../../../Component/TeamCard";
import Heading from "../../../Component/Heading";
import { AiOutlineTeam } from "react-icons/ai";
import { useGetuserTeamsQuery } from "../../../services/team";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Component/Loader";

function TeamProfile() {
  const {user} = useSelector((state) => state.user);

  const userId = user.id;

  const teamData = useGetuserTeamsQuery({ userId });

  if(teamData.isLoading){
    return <Loader/>
  }
  return (
    <section className="min-h-screen-fit">
      <div className="mx-auto px-4 sm:px-20  md:px-20 lg:px-24 xl:px-28 2xl:px-32">
        <div className="xs:py-10 py-10 xl:py-14">
            <h1 className="xs:text-3xl sm:text-3xl md:text-4xl text-center font-bold  italic uppercase text-[#ee6730] ">Your Teams</h1>
        </div>
        {teamData?.data?.data?.length > 0 ? (
          teamData?.data?.data?.map((team, i) => {
            return <TeamCard key={i} teamDetails={team} isPublic={true} />;
          })
        ) : (
          <div className="flex justify-center items-center mt-16 md:mt-24">
            <AiOutlineTeam className="text-2xl xs:text-3xl sm:text-5xl text-gray-400 mr-2" />
            <p className="text-xs xs:text-sm sm:text-lg font-medium text-gray-400">
              No Team Found
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default TeamProfile;
