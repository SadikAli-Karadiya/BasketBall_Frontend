import { motion } from "framer-motion";
import React from "react";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../Component/Button";
import Heading from "../../Component/Heading";


export default function AfterRole() {
  const navigate = useNavigate();

  const [role, setRole] = React.useState([
    {
      title: "Visitor",
      isSelected: false,
      path: "/player/add-edit",
      icon: "/icons/847.jpg",
    },
    {
      title: "Player",
      isSelected: false,
      path: "/player/add-edit",
      icon: "/icons/player.png",
    },
    {
      title: "Team Owner",
      isSelected: false,
      path: "/team/add-edit",
      icon: "/icons/Team.png",
    },
    {
      title: "Tournament Host",
      isSelected: false,
      path: "/tournament/add-edit",
      icon: "/icons/tournament.png",
    },
  ]);

  function handleClick(index) {
    let newArray = role.map((m, i) => {
      if (index == i) {
        m.isSelected = !m.isSelected;
      } else {
        m.isSelected = false;
      }

      return m;
    });

    setRole(() => newArray);
  }

  function handleSubmit() {
    let selected = false;
    role.map((role) => {
      if (role.isSelected) {
        navigate(role.path);
        selected = true;
        return;
      }
    });

    if (!selected) {
      toast.error("Please Select Your Role");
    }
  }
  return (
    <div className="flex flex-col  justify-center px-8 items-center lg:px-20 lg:py-5 ">
      <div className="mt-5 text-center flex flex-col justify-center w-full lg:px-20 space-y-3 ">
        {/* <Heading
          text={"Select Your Role"}
          className="text-2xl px-2"
          margin={true}
        /> */}
        <h1 className="heading text-[30px] font-bold text-center text-[#ee6730] uppercase ">Select your role</h1>
        
        <p className=" text-gray-500 p-1 text-center">
          Rise to the Top: Choose Your Role as Visitor, Player, Tournament Host,
          or Team Manager and Dominate the Court
        </p>
      </div>
      <div className="grid my-14 rounded-lg  xl:px-8 xl:mx-10 xs:grid-cols-1 w-full justify-center sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 ">
        {role.map((r, i) => {
          return (
            <motion.div
              animate={{
                borderColor: r.isSelected ? "#ee6730" : "white",
                // backgroundColor: r.isSelected ? '#FFFFFF' : "#F3F4F6",
                boxShadow: r.isSelected
                  ? "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                  : "",
              }}
              transition={{
                duration: .5,
              }}
              onClick={(e) => handleClick(i)}
              key={i}
              className="cursor-pointer relative w-full bg-white lg:pt-3 xl:pb-8 hover:scale-110 duration-500  rounded-lg shadow-lg shadow-black/20  border-4   "
            >
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  backgroundColor: r.isSelected ? "#ee6730" : "#F3F4F6",

                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                }}
                className={`${r?.isSelected ? "" : "hidden"
                  } w-8 h-8 flex justify-center items-center  rounded-full absolute top-[-23px] left-[46%]  -translate-x-2 translate-y-1`}
              >
                <MdDone className="text-center text-white font-bold text-xl " />
              </motion.div>
              <div className="flex justify-center items-center   xl:h-[90%] w-full">
              <img className="w-[60%] lg:w-[70%] xl:w-[60%]  mx-auto" src={r.icon} />

              </div>
              <motion.div
                animate={{
                  color: r.isSelected ? "#ee6730" : "black",
                }}
                className="text-center m-2 rounded-md mx-10 text-sm lg:text-lg font-semibold"
              >
                <h1 className="overflow-hidden text-xl">{r.title} </h1>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-end items-center lg:px-10 space-x-16 py-5">
        <button
          type="submit"
          className="bg-slate-900 relative inline-flex items-center justify-center px-24 py-3 rounded-full overflow-hidden text-white cursor-pointer group"
          onClick={handleSubmit}
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#ee6730] rounded-lg group-hover:w-full group-hover:h-56"></span>
          <span className="relative">
            Continue
          </span>
        </button>
      </div>
    </div>
  );
}
