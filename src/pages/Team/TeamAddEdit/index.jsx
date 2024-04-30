import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Heading from "../../../Component/Heading";
import { useDispatch, useSelector } from "react-redux";
import { TeamInfoSchema } from "../../../models/TeamInfoModel";
import { useRegisterTeam } from "../../../hooks/usePost";
import {
  useTeamRegistrationMutation,
  useTeamUpdateMutation,
} from "../../../services/team";
import { useSearchPlayerByNumbmerQuery } from "../../../services/player";
import { useState } from "react";

function TeamAddEdit() {
  const location = useLocation();
  const [number, setNumber] = useState("");
  const [teamRegistration, { ...thing }] = useTeamRegistrationMutation();
  const [teamUpdate, { ...updateData }] = useTeamUpdateMutation();
  const data = useSearchPlayerByNumbmerQuery({ number });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TeamForm } = useSelector((state) => state.team);
  const [logo, setLogo] = React.useState("");
  const [captain, setCaptain] = React.useState(0);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    validationSchema: TeamInfoSchema,
    initialValues: location?.state?.isEdit
      ? location.state.teamDetail
      : TeamForm.TeamInfo,
    onSubmit: (data) => {
      
      if (selectedPlayers.length < 5) {
        toast.error("Please select atleast 5 players");
        return;
      }
      
      if (captain === 0) {
        toast.error("Please select team captain");
        return;
      }

      try {
        const fb = new FormData();
        let ok = JSON.stringify({
          TeamInfo: data,
          PlayerList: selectedPlayers,
          captain: captain,
        });
        fb.append("data", ok);
        fb.append("team_logo", logo);

        if (location?.state?.isEdit) {
          fb.append("id", location.state.teamDetail.id);
          teamUpdate({ body: fb, team_id: location.state.teamDetail.id }).then();
        } else {
          teamRegistration(fb).then();
        }
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  const [searchedPlayers, setSearchedPlayers] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);

  const handlePlayerSearch = (e) => {
    setSearchValue(() => {
      e.target.value;
    });
    if (e.target.value.length == 10) setNumber(e.target.value);
  };

  const handleSearchPlayerClick = (player_id) => {
    //Cant select more than 12 players
    if (selectedPlayers?.length == 12) {
      toast.error("Can't select more than 12 players");
      return;
    }

    //If player already selected
    let isFound = false;
    selectedPlayers?.map((item) => {
      if (item.id == player_id) isFound = true;
    });

    if (isFound) {
      toast.error("Player already seleted");
      return;
    }

    setSearchValue("");
    setSearchedPlayers([]);
    const selected = searchedPlayers.filter((item) => {
      return item.id == player_id;
    });

    setSelectedPlayers((prevData) => {
      return [...prevData, ...selected];
    });
  };

  const handleEditPosition = (player_id) => {
    setSelectedPlayers(
      selectedPlayers.map((item) => {
        return {
          ...item,
          isEditable: item.id == player_id ? true : item.isEditable,
        };
      })
    );
  };

  React.useEffect(() => {
    if (thing.isError) {
      toast.error(thing?.error?.data?.message);
    }
    if (thing.isSuccess) {
      if (thing?.data?.success) {
        toast.success("Team Registration Successful");

        navigate(`/team/profile-detail/${thing?.data?.team?.id}`, {
          state: { isPublic: true },
        });
      }
    }
  }, [thing.isError, thing.isSuccess]);

  React.useEffect(() => {
    if (updateData.isError) {
      toast.error(updateData?.error?.data?.message);
    }
    if (updateData.isSuccess) {
      if (updateData?.data?.success) {
        toast.success("Team Updated Successfully");
        navigate(`/team/profile-detail/${updateData?.data?.team?.id}`, {
          state: { isPublic: true },
        });
      }
    }
  }, [updateData.isError, updateData.isSuccess]);

  const handleSave = (player_id) => {
    setSelectedPlayers(
      selectedPlayers.map((item) => {
        return {
          ...item,
          isEditable: item.id == player_id ? false : item.isEditable,
        };
      })
    );
  };

  const handleRemovePlayer = (player_id) => {
    setFieldValue("captain", "")
    setSelectedPlayers(
      selectedPlayers.filter((item) => {
        return item.id != player_id;
      })
    );
  };

  const handlePositionChange = (e, player_id) => {
    setSelectedPlayers(
      selectedPlayers.map((item) => {
        return {
          ...item,
          playing_position:
            item.id == player_id ? e.target.value : item.playing_position,
        };
      })
    );
  };

  function handleImageUpload(e) {
    setLogo(e.target.files[0]);
  }

  React.useEffect(() => {
    setSelectedPlayers(location?.state?.isEdit ? location?.state?.players : []);
    setCaptain(() =>
      location?.state?.isEdit ? location?.state?.teamDetail?.captain_id : 0
    );
  }, []);

  React.useEffect(() => {
    if (data?.data) {
      setSearchedPlayers((e) => [{ ...data?.data?.data }]);
    }
  }, [data.isSuccess, data]);

  return (
    <section className="min-h-screen-fit py-5 px-8">
      <div className=" flex justify-center items-center">
        <div>
          <h1 className=" items-end  text-center font-semibold text-2xl lg:text-3xl">
            {location?.state?.isEdit ? "Team Edit" : "Team Registration"}
          </h1>
        </div>
        <img src={"/icons/team_icon.png"} className="w-20" />
      </div>
      <p className="text-center text-gray-700 text-sm md:text-base italic pb-5">
        A team that works together, wins together, and celebrates together.
      </p>
      <div className="mx-auto lg:px-10 ">
        <form
          action=""
          onSubmit={handleSubmit}
          className=" rounded-lg shadow-xl px-5 py-5 md:px-10 md:py-8"
        >
          <div className="">
            <h3 className=" text-xl sm:text-2xl font-semibold text-[#ee6730]">
              Team Information:
            </h3>
          </div>
          <div className="flex md:flex-row flex-col gap-6 my-7">
            <div className="flex flex-1 flex-col">
              <div className="flex flex-col">
                <label className="mb-2">Team Name *</label>
                <input
                  className="w rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  placeholder="Enter team name"
                  type="text"
                  name="team_name"
                  id="team_name"
                  value={values.team_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.team_name && touched.team_name ? (
                  <small className="text-sm font-semibold text-red-600 px-1">
                    {errors.team_name}
                  </small>
                ) : null}
              </div>
              <div className="flex flex-col mt-5">
                <label className="mb-2">
                  Choose Logo ( PNG, JPG, JPEG ) (size &lt; 1MB)
                </label>
                <input
                  className="w-full  rounded-lg border-transparent flex-1 appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  type="file"
                  name="team_l"
                  id="team_logo"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => handleImageUpload(e)}
                />
              </div>
            </div>
            <div className="flex flex-1">
              <div className="w-full flex flex-col">
                <label className="mb-2">About Team</label>
                <textarea
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  name="about_team"
                  placeholder="Write something about your team"
                  rows="6"
                  value={values.about_team}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-20">
            <h3 className=" text-xl sm:text-2xl font-semibold text-[#ee6730]">
              Coach Information:
            </h3>
          </div>
          <div className="coach-container w-full flex flex-col lg:flex-row gap-6 my-7">
            <div className="coach-1-container flex flex-1 flex-col sm:flex-row gap-6">
              <div className="coach-1-name flex flex-1 flex-col">
                <label className="mb-2">Coach Name</label>
                <input
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  placeholder="Enter coach name"
                  type="text"
                  name="coach_name"
                  id="coach_name"
                  value={values.coach_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.coach_name && touched.coach_name ? (
                  <small className="text-red-600 mt-2">
                    {errors.coach_name}
                  </small>
                ) : null}
              </div>
              <div className="coach-1-mobile flex flex-1 flex-col">
                <label className="mb-2">Coach Mobile</label>
                <input
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  placeholder="Enter coach mobile no."
                  type="text"
                  name="coach_mobile"
                  id="coach_mobile"
                  value={values.coach_mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.coach_mobile && touched.coach_mobile ? (
                  <small className="text-red-600 mt-2">
                    {errors.coach_mobile}
                  </small>
                ) : null}
              </div>
            </div>
            <div className="coach-2-container flex flex-1 flex-col sm:flex-row gap-6">
              <div className="coach-2-name flex flex-1 flex-col">
                <label className="mb-2">Assistant Coach Name</label>
                <input
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  placeholder="Enter asst. coach name"
                  type="text"
                  name="asst_coach_name"
                  id="asst_coach_name"
                  value={values.asst_coach_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.asst_coach_name && touched.asst_coach_name ? (
                  <small className="text-red-600 mt-2">
                    {errors.asst_coach_name}
                  </small>
                ) : null}
              </div>
              <div className="coach-2-mobile flex flex-1 flex-col">
                <label className="mb-2">Assistant Coach Mobile</label>
                <input
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  placeholder="Enter asst. coach mobile no."
                  type="text"
                  name="asst_coach_mobile"
                  id="asst_coach_mobile"
                  value={values.asst_coach_mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.asst_coach_mobile && touched.asst_coach_mobile ? (
                  <small className="text-red-600 mt-2">
                    {errors.asst_coach_mobile}
                  </small>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-20">
            <h3 className=" text-xl sm:text-2xl font-semibold text-[#ee6730]">
              Player Selection:
            </h3>
          </div>
          <div className="player-selection w-full flex flex-col xl:flex-row gap-6">
            <div className="relative player-search-input-container flex flex-1 flex-col mt-9">
              <div className="player-input border-orange-500 rounded-lg border-transparent flex items-center appearance-none  w-full py-1 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none  focus:border-transparent">
                <span className="text-xl ml-4 text-gray-500">
                  <ImSearch />
                </span>
                <input
                  type="text"
                  className="player-input w-full border-blue-200 w-ful p-2 sm:p-3 rounded-lg text-sm outline-none"
                  placeholder="Search player by mobile no."
                  value={searchValue}
                  onChange={(e) => handlePlayerSearch(e)}
                  onFocus={() =>
                    document
                      .querySelector(".player-input")
                      .classList.add("border-2")
                  }
                  onBlur={() =>
                    document
                      .querySelector(".player-input")
                      .classList.remove("border-2")
                  }
                />
              </div>
              {searchValue != "" ? (
                <div
                  className={`absolute top-16 players-search-list-container w-full mt-2 bg-white px-4 py-4 border-2 rounded-lg`}
                >
                  <table className="items-center bg-transparent w-full border-collapse ">
                    <thead>
                      <tr>
                        <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Name
                        </th>
                        <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Position
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedPlayers.length > 0 &&
                      searchedPlayers[0]?.id > 0 ? (
                        searchedPlayers.map((player, index) => {
                          return (
                            <tr
                              key={index}
                              className="cursor-pointer border-b"
                              onClick={() => handleSearchPlayerClick(player.id)}
                            >
                              <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-gray-700 capitalize">
                                {player.first_name}
                              </th>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize">
                                {player.playing_position}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-semibold text-red-500"
                            colSpan="2"
                          >
                            No player found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
            <div className="players-list-container flex flex-col flex-1 lg:mt-0 mt-5 ">
              <h4 className="text-lg font-semibold text-center text-gray-700">
                Selected Players (Atleast 5)
              </h4>
              <div className="players-list w-full overflow-x-auto">
                <table className="w-full mt-2 rounded-md overflow-hidden">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="pl-6 border py-3 text-sm text-gray-300 uppercase border-gray-700 whitespace-nowrap font-semibold text-left">
                        Sr.
                      </th>
                      <th className="border py-3 text-sm text-gray-300 uppercase border-gray-700 whitespace-nowrap font-semibold text-left">
                        Name
                      </th>
                      <th className="border py-3 text-sm text-gray-300 uppercase border-gray-700 whitespace-nowrap font-semibold text-left">
                        Position
                      </th>
                      <th className="border py-3 text-sm text-gray-300 uppercase border-gray-700 whitespace-nowrap font-semibold text-left">
                        Captain
                      </th>
                      <th className="border py-3 text-sm text-gray-300 uppercase border-gray-700 whitespace-nowrap font-semibold text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                  
                    {selectedPlayers?.length > 0 ? (
                      selectedPlayers.map((player, index) => {
                        return (
                          <tr key={index} className="border-t-2 ">
                            <th className="border-t-0 px-6 border-l-0 border-r-0 text-sm whitespace-nowrap pl-6 py-4 text-left text-gray-700 capitalize">
                              {index + 1}
                            </th>
                            <th className="text-left text-gray-700 capitalize">
                              {player.first_name}
                            </th>
                            <td>
                              <select
                                name=""
                                id=""
                                className="sm:px-1 py-1 rounded-md outline-blue-200 text-sm bg-white border border-gray-200"
                                disabled={!player.isEditable}
                                value={player.playing_position}
                                onChange={(e) =>
                                  handlePositionChange(e, player.id)
                                }
                              >
                                <option value="point guard">Point Guard</option>
                                <option value="shooting guard">
                                  Shooting Guard
                                </option>
                                <option value="center">Center</option>
                                <option value="power forward">
                                  Power Forward
                                </option>
                                <option value="shooting forward">
                                  Shooting Forward
                                </option>
                              </select>
                            </td>
                            <td>
                              <input
                                className="w-4 h-4 cursor-pointer"
                                type="radio"
                                checked={player.id == captain}
                                id="captain"
                                disabled={!player.isEditable}
                                name="captain"
                                value={player.id}
                                onChange={(e) => setCaptain(e.target.value)}
                                onBlur={(e) => setCaptain(e.target.value)}
                              />
                            </td>
                            <td>
                              {player.isEditable ? (
                                <button
                                  className="px-2 py-0.5 text-white text-sm rounded-md bg-green-600"
                                  onClick={() => handleSave(player.id)}
                                >
                                  Save
                                </button>
                              ) : (
                                <span className="flex">
                                  <BiEdit
                                    className="cursor-pointer text-xl text-blue-500 mr-4"
                                    onClick={() =>
                                      handleEditPosition(player.id)
                                    }
                                  />

                                  <MdDelete
                                    className="cursor-pointer text-xl text-red-500"
                                    onClick={() =>
                                      handleRemovePlayer(player.id)
                                    }
                                  />
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          className="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-semibold text-red-500"
                          colSpan="5"
                        >
                          No players selected
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* <div className="mt-8">
                    <div className="flex">
                      <p className="font-medium text-lg text-purple-600 tracking-wide">*Captain:</p>
                      <div className="flex flex-col w-52 ml-4">
                        <Select
                          className='w-full outline-blue-200'
                          name="captain"
                          value={values.captain}
                          onChange={e => {
                            let event = {target: {name: 'captain', value: e}}
                            handleChange(event)
                          }}
                          // onChange={handleChange}
                          onBlur={() => {
                            handleBlur({target: {name: 'captain'}});
                          }}
                          isSearchable={true}
                          styles={customStyles}
                          options={
                            selectedPlayers.map(item => {
                              return{
                                value: item.id, label: item.name
                              }
                            })
                          }
                        />
                      </div>
                    </div>
                  </div> */}
            </div>
          </div>
          <div className="w-full flex justify-end mt-5 sm:mt-10">
            {location?.state?.isEdit ? (
              <button
                type="button"
                className="bg-[#ee6730] relative inline-flex items-center justify-center px-7 py-2 overflow-hidden text-white rounded-lg cursor-pointer group mr-3"
                onClick={() => navigate(-1)}
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-slate-900 rounded-lg group-hover:w-full group-hover:h-56"></span>
                <span className="relative">Cancel</span>
              </button>
            ) : (
              <button
                type="reset"
                className="bg-[#ee6730] relative inline-flex items-center justify-center px-8 py-2 overflow-hidden text-white rounded-lg cursor-pointer group mr-3"
                onClick={() => {
                  resetForm();
                  setSelectedPlayers([]);
                }}
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-slate-900 rounded-lg group-hover:w-full group-hover:h-56"></span>
                <span className="relative">Clear</span>
              </button>
            )}
            <button
              type="submit"
              className="bg-slate-900 relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-white rounded-lg cursor-pointer group"
              onClick={handleSubmit}
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#ee6730] rounded-lg group-hover:w-full group-hover:h-56"></span>
              <span className="relative">
                {thing.isLoading
                  ? "SUBMIT..."
                  : updateData.isLoading
                  ? "Updating..."
                  : location?.state?.isEdit
                  ? "UPDATE"
                  : "SUBMIT"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default TeamAddEdit;
