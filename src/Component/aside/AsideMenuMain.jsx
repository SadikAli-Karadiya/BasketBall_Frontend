import React from "react";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare, FaUserCircle } from "react-icons/fa";
import DropDownmenu from "./DropDownmenu";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AsideMenuMain() {
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = React.useState(false);
  const [isMenu, setIsMenu] = React.useState(false);

  const navigate = useNavigate();  
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full relative">
      <div className={`py-3 bg-black  px-5 lg:px-9 flex sticky top-0 items-center justify-between w-full z-[9999] ${scrollPosition > 0 ? ' shadow-xl' : ''}`}>
        <div className="w-[18%] sm:w-[10%] md:w-[8%] xl:w-[6%] 2xl:w-[4%] ">
          <img
            src="/CBL_Images/logo.png"
            alt=""
            className="cursor-pointer w-14"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="hidden md:block">
          <ul className="items-center flex flex-col md:flex-row justify-start lg:justify-center md:space-x-5 lg:space-x-8">
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/"} >
                <h1 className="relative text-white text-base md:text-sm lg:text-base xl:text-lg  my-5 md:my-0">
                  Home
                </h1>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/player/list"}  >
                <h1 className="relative text-white text-base md:text-sm lg:text-base xl:text-lg  my-5 md:my-0">
                  Players
                </h1>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/team/list"} >
                <h1 className="relative text-white text-base md:text-sm lg:text-base xl:text-lg  my-5 md:my-0">
                  Teams
                </h1>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/tournament"} >
                <h1 className="relative text-white text-base md:text-sm lg:text-base xl:text-lg  my-5 md:my-0">
                  Tournaments
                </h1>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/match"} >
                <h1 className="relative text-white text-base md:text-sm lg:text-base xl:text-lg  my-5 md:my-0">
                  Matches
                </h1>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/news"} >
                <h1 className="relative text-white text-base md:text-sm lg:text-base xl:text-lg  my-5 md:my-0">
                  News
                </h1>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/gallery"} >
                <h1 className="relative text-white text-base md:text-sm lg:text-base xl:text-lg  my-4 md:my-0">
                  Gallery
                </h1>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/registration"} >
                <h1 className="relative text-white text-base md:text-sm lg:text-base xl:text-lg  my-4 md:my-0">
                  Registration
                </h1>
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          className={` font-semibold bg-black text-gray-800 pb-10 lg:pb-0 lg:space-y-10 fixed
                     z-50  pl-9 md:pl-0 right-0 w-3/4 md:w-72 top-0 h-screen overflow-y-auto lg:pr-0 flex flex-col justify-start items-start lg:justify-start md:items-center
                     duration-500 ease-in ${open
              ? " opacity-100"
              : "right-[-800px] lg:opacity-100 opacity-0"
            }`}
        >

          <div
            className=" pt-5 flex justify-between items-end w-full md:pl-5 pr-5"
            onClick={() => { setIsMenu(false); setOpen(!open) }}
          >
            {
              open ? 
                <>
                  <span className="flex items-center gap-2">
                    <FaUserCircle className="text-xl text-gray-400"/>
                    <p className="text-gray-400 uppercase">{user.name.split(' ')[0]}</p>
                  </span>
                  <RxCross1 className="text-gray-300 hover:text-white cursor-pointer transition-all duration-700 text-[22px]" />
                </>
              : 
                null
            }
          </div>
          <ul className="items-start flex flex-col justify-start lg:justify-center md:items-center lg:space-y-10 md:pt-5 2xl:pt-0 mt-8">
            <li className="nav-item md:hidden" onClick={() => setOpen(!open)}>
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/"} >
                <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg my-[16px] lg:my-0">
                  Home
                </h1>
              </NavLink>
            </li>
            <li className="nav-item md:hidden" onClick={() => setOpen(!open)}>
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/player/list"} >
                <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg  my-[16px] md:my-0">
                  Players
                </h1>
              </NavLink>
            </li>
            {
              user.is_organizer
              ?
                <li className="nav-item" onClick={() => setOpen(!open)}>
                  <NavLink className={({isActive}) => (isActive ? "active" : 'none')} to={"/tournament/organizer"} >
                    <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg  my-[16px] md:my-0">
                      Your Tournaments
                    </h1>
                  </NavLink>
                </li>
              :
                null
            }
            {
              user.is_manager
              ?
                <li className="nav-item" onClick={() => setOpen(!open)}>
                  <NavLink className={({isActive}) => (isActive ? "active" : 'none')} to={"/team/profile"} >
                    <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg  my-[16px] md:my-0">
                      Your Teams
                    </h1>
                  </NavLink>
                </li>
              :
                null
            }
            <li className="nav-item md:hidden" onClick={() => setOpen(!open)}>
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/team/profile"} >
                <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg my-[16px] lg:my-0">
                  Teams
                </h1>
              </NavLink>
            </li>
            <li
              className="nav-item hidden md:block"
              onClick={() => setOpen(!open)}
            >
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/About"} >
                <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg my-[16px] lg:my-0">
                  About Us
                </h1>
              </NavLink>
            </li>
            <li className="nav-item md:hidden" onClick={() => setOpen(!open)}>
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/tournament"} >
                <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg my-[16px] lg:my-0">
                  Tournament
                </h1>
              </NavLink>
            </li>
            <li className="nav-item md:hidden" onClick={() => setOpen(!open)}>
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/news"} >
                <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg my-[16px] lg:my-0">
                  News
                </h1>
              </NavLink>
            </li>
            <li className="nav-item md:hidden" onClick={() => setOpen(!open)}>
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/gallery"} >
                <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg my-[16px] lg:my-0">
                  Gallery
                </h1>
              </NavLink>
            </li>
            <li className="nav-item" onClick={() => setOpen(!open)}>
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/contact"} >
                <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg my-[16px] lg:my-0">
                  Contact Us
                </h1>
              </NavLink>
            </li>
            <li className="nav-item md:hidden" onClick={() => setOpen(!open)}>
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/About"} >
                <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg my-[16px] lg:my-0">
                  About Us
                </h1>
              </NavLink>
            </li>
            <li className="nav-item md:hidden " onClick={() => setOpen(!open)}>
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/registration"} >
                <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg my-[16px] lg:my-0">
                  Registration
                </h1>
              </NavLink>
            </li>
            <li className="nav-item " onClick={() => setOpen(!open)}>
              <NavLink className={({ isActive }) => (isActive ? "active" : 'none')} to={"/term&condition"} >
                <h1 className="relative text-white text-base md:text-base lg:text-base xl:text-lg my-[16px] lg:my-0">
                  Terms & Conditions
                </h1>
              </NavLink>
            </li>
          </ul>
          <div className="flex justify-center space-x-7 pt-6">
            <AiFillInstagram className=" rounded-full hover:text-white hover:bg-[#ee6730] text-[26px] bg-white text-[#ee6730] h-10 w-10 p-2 duration-200 hover:scale-110 cursor-pointer" onClick={()=> window.open('https://www.instagram.com/corporate_basketball_league/', '_blank')} />
            <FaFacebookSquare className=" rounded-full hover:text-white hover:bg-[#ee6730] text-[26px] bg-white text-[#ee6730] h-10 w-10 p-2 duration-200 hover:scale-110 cursor-pointer" onClick={()=> window.open('https://www.facebook.com/profile.php?id=100083664213577', '_blank')} />
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-5">
          <div className="">
            <DropDownmenu setOpen={setOpen} setIsMenu={setIsMenu} isMenu={isMenu}/>
          </div>
          <div
            className="px-1 py-[2px]  rounded-md w-8"
            onClick={() => {setIsMenu(false); setOpen(!open)}}
          >
            {open ? (
              null
            ) : (
              <RxHamburgerMenu className="text-slate-400 hover:text-white transition-all duration-700  cursor-pointer text-2xl" />
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#F5F5F7] w-full  -z-50  ">
        <Outlet />
      </div>
    </div>
  );
}
export default AsideMenuMain;
