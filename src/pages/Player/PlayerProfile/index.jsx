import React, { useEffect } from "react";
import Heading from "../../../Component/Heading";
import MatchCard from "../../../Component/MatchCard";
import TeamCard from "../../../Component/TeamCard";
import { motion } from "framer-motion";
import PlayerAvtar from "../PlayerAvtar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findPlayer } from "../../../redux/actions/Player";
import PlayerInfo from "./PlayerInfo";
import PlayerStatics from "./PlayerStatics";
import Notification from "../../../Component/Notification/Notification";
import { AiFillEye } from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import { useGetPlayerDetailsQuery } from '../../../services/player';



export default function PlayerProfile() {
  const params = useParams();
  const { data, isLoading, error } = useGetPlayerDetailsQuery(params.id);
  const PlayerDetail = [
    {
      id: 1,
      status: true,
      basicinfo: {
        img: "/CBL_Images/player-default-profile.webp",
        firstName: "Deepak",
        email: "wellbenix@gmail.com",
        lastName: "Prajapati",
        dateofbirth: new Date(),
        gender: "m",
        pincode: "382340",
      },
      gameinfo: {
        height: "168",
        weight: "200",
        playerPosition: "Center",
        JerseyNumber: "69",
        Experience:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ur amet. Tempora aspernatur accusantium ipsam adipisci voluptatibus.",
      },
      statics: {
        totalMatch: 100,
        matchWon: 100,
        matchLoss: 0,
        totalScore: 320,
      },
      teamDetails: [
        {
          team_id: 1001,
          team_logo: "/CBL_Images/basketball_team_logo_2.webp",
          team_name: "Mehta Ke Mahaarathi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adip, Lorem ipsum dolor sit amet, consectetur adip",
          coach_name: "Mohammadshad Mohammadsajid Rajput",
          coach_mobile: "9000000000",
          assistant_coach_name: "coach abc",
          assistant_coach_mobile: "9989999999",
          total_players: 7,
          captain: 1,
          matches_played: 22,
          matches_won: 18,
          matches_lost: 4,
        },
      ],
    },
  ];

  useEffect(() => {
    // dispatch(findPlayer(params.id));
  }, []);

  const [tab, setTab] = React.useState(1);
  const match = {
    match_id: 12,
    tournament_name: "Gokuldham Premier League",
    team_1_logo: "/CBL_Images/basketball_team_logo_2.webp",
    team_2_logo: "/CBL_Images/basketball_team_logo_1.webp",
    team_1_name: "Mehta Ke Maharathi",
    team_2_name: "Jetha Ke Jabaaz",
    team_1_score: 24,
    team_2_score: 22,
    duration: 45,
    address: "Amber tower, Sarkhej, Ahmedabad 380055",
    isSuccessfull: 1,
    date: "12/12/2022",
  };

  return (
    <div className="mx-auto px-6 py-10 sm:px-20 sm:py-12 md:px-20 md:py-12 lg:px-24 xl:px-28 2xl:px-32 min-h-screen  ">
      {/* Player Detail Section */}
      <div className="flex flex-col lg:flex-row space-y-5 ">
        <div className="lg:w-1/2 flex">
          <PlayerAvtar player={data} />
        </div>
        <div className="flex-1    ">
          <PlayerInfo PlayerDetail={data} />
        </div>
      </div>
      {/* Player Detail Section End */}

      {/* Player Staticstc start */}
      <PlayerStatics PlayerDetail={data} />
      {/* Player Statics End */}

      {/* ------------------notification Section -------------*/}
      {data?.SinglePlayerDetails?.id == params.id && <Notification />}
      {/*--------- notification seciton end--------------- */}

      {/* new sec */}
      <div className="flex">
        <div className=" p-4 space-y-8  mt-4">
          <div className=" flex justify-center">
            <Heading
              text={"Team"}
              className={"text-center py-1 px-3 text-3xl"}
              margin={true}
            />
          </div>
          {data?.SinglePlayerDetails?.id != params.id && (
            <div className="flex  mx-auto">
              {data?.SinglePlayerDetails?.team_players.map((team) => {
                return <TeamCard  teamDetails={team.teams} />;
              })}
            </div>
          )}
          {data?.SinglePlayerDetails?.id == params.id && (
            <div className="overflow-x-scroll">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3  text-sm md:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Team Name
                    </th>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3  text-sm md:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Total Players
                    </th>
                    <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3  text-sm md:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.SinglePlayerDetails?.team_players.map((team) => {
                    console.log(team)
                    return (
                      <tr className="cursor-pointer border-b">
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0  text-sm md:text-base whitespace-nowrap p-4 text-left text-gray-700 capitalize">
                          {team?.teams?.team_name}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  text-sm md:text-base whitespace-nowrap p-4 capitalize">
                          {team?.teams?.matches_played}
                        </td>
                        <td className=" flex space-x-3  border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 capitalize">
                          <div title={`View ${team?.teams?.team_name}`}>
                            <Link to={`/team/profile-detail/${team?.teams?.id}`}>
                              <AiFillEye className="hover:text-green-900" />
                            </Link>
                          </div>
                          <div
                            title={`Leave ${team?.teams?.team_name}`}
                            className="hover:text-red-600"
                          >
                            <ImExit />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {data?.SinglePlayerDetails?.team_players < 1 && (
                    <tr className="cursor-pointer border-b">
                      <td
                        className="border-t-0  px-6 text-center bg-red-100 text-red-800 font-bold align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 capitalize"
                        colSpan={3}
                      >
                        You are not in any Team
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* <div className=" py-4">
          <div className="px-1 text-lg lg:w-1/3 mx-auto  py-1 text-white  flex  text-center justify-center items-center mt-2 rounded-full space-x-2 bg-black">
            <motion.span
              animate={{
                backgroundColor: tab === 1 ? "#ee6730" : "#000000",
              }}
              onClick={(e) => setTab(1)}
              className=" cursor-pointer    rounded-full  w-1/2 py-2 text-sm shadow-2xl"
            >
              Past
            </motion.span>
            <motion.span
              animate={{
                backgroundColor: tab === 1 ? "#000000" : "#ee6730",
              }}
              onClick={(e) => setTab(2)}
              className=" bg-black cursor-pointer  rounded-full  w-1/2 py-2 text-sm shadow-2xl"
            >
              Upcomming
            </motion.span>
          </div>
          <div className="   px-2 py-2 player-container w-full flex flex-nowrap gap-8 sm:gap-16 md:gap-20 mt-10 overflow-x-auto ">
            <MatchCard match={match} />
            <MatchCard match={match} />
            <MatchCard match={match} />
            <MatchCard match={match} />
            <MatchCard match={match} />
            <MatchCard match={match} />
          </div>
        </div> */}
      </div>
    </div>
  );
}
