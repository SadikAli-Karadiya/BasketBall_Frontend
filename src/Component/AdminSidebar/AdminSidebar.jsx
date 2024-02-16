import React, { useState } from "react";
import { BsTrophy } from "react-icons/bs";
import { GiBasketballJersey } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { IoImagesSharp, IoArrowBackCircle } from "react-icons/io5";
import { BiNews, BiExit  } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import {logout} from '../../redux/actions/User'
import { useDispatch } from "react-redux";
import '../../App.css'

function AdminSidebar() {
  const [show, setShow] = useState(true);
  const [tooltipStatus, setTooltipStatus] = useState(0);
  const dispatch = useDispatch();

  return (
    <>
      {/* Vertical navigation starts */}
      <div className="flex flex-no-wrap h-full">
        <div className="h-full bg-gray-900 p-4">
          <div className="flex w-full h-full">
            <div className=" flex flex-col h-full justify-between">
              <div>
                <div className="flex flex-col items-center">
                  <img
                    src="/CBL_Images/logo.png"
                    className={`${show ? "w-16" : "w-10"} `}
                  />
                  {show && (
                    <div className="mt-2" id="closed">
                      <h1 className="text-lg text-gray-300 font-sans">
                        Admin Panel
                      </h1>
                    </div>
                  )}
                </div>
                <div className="mt-10 flex items-center relative">
                  <hr className="absolute w-full" />
                  <div className="-mt-5 z-20" onClick={() => setShow(!show)}>
                    {show ? (
                      <button
                        aria-label="minimize sidebar"
                        id="close"
                        className="w-6 h-6 right-0 -mr-7 bg-orange-500 absolute shadow rounded-full flex items-center justify-center cursor-pointer hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-orange-600 transition-all"
                      >
                        <svg
                          width={17}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 4L6 8L10 12"
                            stroke="white"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        id="open"
                        className=" w-6 h-6 right-0 -mr-7 bg-orange-500 absolute shadow rounded-full flex items-center justify-center cursor-pointer hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-orange-600"
                      >
                        <svg
                          aria-label="expand sidebar"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12L10 8L6 4"
                            stroke="white"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <ul aria-orientation="vertical" className="w-full">
                    <NavLink className={({ isActive }) => (isActive ? "active" : 'non-active')} to={"/admin/dashboard"}>
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="Overview"
                        className="cursor-pointer mt-10 hover:text-white flex items-center gap-4"
                        >
                        <MdDashboard className="text-lg"/>
                        {
                          show
                          ?
                            <span>
                              Overview
                            </span>
                          :
                          null
                        }
                      </li>
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active" : 'non-active')} to={"admin/all-tournaments"}>
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="Tournaments Request"
                        className="w-full cursor-pointer mt-6 hover:text-white flex items-center gap-4"
                      >
                        <BsTrophy className=" text-lg" />
                        {
                          show
                          ?
                            <span>
                              Tournts. Requests
                            </span>
                          :
                          null
                        }
                      </li>
                    </NavLink>

                    <NavLink className={({ isActive }) => (isActive ? "active" : 'non-active')} to={"admin/news"}>
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="News"
                        className="cursor-pointer mt-6 hover:text-white flex items-center gap-4"
                      >
                        <BiNews className=" text-xl" />
                        {
                          show
                          ?
                            <span>
                              News
                            </span>
                          :
                          null
                        }
                      </li>
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active" : 'non-active')} to={"admin/gallery"}>
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="Gallery"
                        className="cursor-pointer mt-6 hover:text-white flex items-center gap-4"
                      >
                        <IoImagesSharp className=" text-lg" />
                         {
                          show
                          ?
                            <span>
                              Gallery
                            </span>
                          :
                          null
                        }
                      </li>
                    </NavLink>

                    <NavLink className={({ isActive }) => (isActive ? "active" : 'non-active')} to={"/"}>
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="Gallery"
                        className="cursor-pointer mt-6 hover:text-white flex items-center gap-4"
                      >
                        <IoArrowBackCircle className=" text-xl" />
                        {
                          show
                          ?
                            <span>
                              Go Back
                            </span>
                          :
                          null
                        }
                      </li>
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active" : 'non-active')} onClick={()=> dispatch(logout())} to={"/"}>
                      <li
                        tabIndex={0}
                        role="button"
                        aria-label="Gallery"
                        className="cursor-pointer mt-6 hover:text-white flex items-center gap-4"
                      >
                        <BiExit className=" text-xl" />
                        {
                          show
                          ?
                            <span>
                              Logout
                            </span>
                          :
                          null
                        }
                      </li>
                    </NavLink>
                    {/* <li
                      tabIndex={0}
                      role="button"
                      aria-label="Notifications"
                      className="cursor-pointer mt-6 hover:text-white"
                    >
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.3332 16.6667H1.6665V15H2.49984V9.19249C2.49984 5.03582 5.85817 1.66666 9.99984 1.66666C14.1415 1.66666 17.4998 5.03582 17.4998 9.19249V15H18.3332V16.6667ZM4.1665 15H15.8332V9.19249C15.8332 5.95666 13.2215 3.33332 9.99984 3.33332C6.77817 3.33332 4.1665 5.95666 4.1665 9.19249V15ZM7.9165 17.5H12.0832C12.0832 18.0525 11.8637 18.5824 11.473 18.9731C11.0823 19.3638 10.5524 19.5833 9.99984 19.5833C9.4473 19.5833 8.9174 19.3638 8.5267 18.9731C8.136 18.5824 7.9165 18.0525 7.9165 17.5Z"
                          fill="#9CA3AF"
                        />
                      </svg>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Vertical navigation ends */}
    </>
  );
}

export default AdminSidebar;
