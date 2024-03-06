import React from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from 'moment';
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useMatchFormationManualMutation } from "../../../services/organizer";

function ManualMatchFormation() {
  const location = useLocation();
  const navigate = useNavigate();

  let teams = location.state.tournament_teams
  const age_categories = location.state.age_categories;
  const gender_types = location.state.gender_types;

  const {tournament_id} = useParams();
  
  const [team1List, setTeam1List] = React.useState([]);
  const [team2List, setTeam2List] = React.useState([]);
  const [formedMatches, setFormedMatches] = React.useState([])
  const [roundName, setRoundName] = React.useState('');
  const [roundNameError, setRoundNameError] = React.useState('');
  
  const [matchFormationManual, {isLoading}] = useMatchFormationManualMutation();

  const today = new Date();
  today.setHours(0, 0, 0, 0)

  const validationSchema = ()=> Yup.object({
    team_1: Yup.string().required("Please select the team"),
    team_2: Yup.string().required("Please select the team"),
    age_category: Yup.string().required("Please select age category"),
    gender_type: Yup.string().required("Please select gender type"),
    start_date: Yup.date().min(today, "Date cannot be in the past")
  });

  const initialValues = {
    team_1: "",
    team_2: "",
    age_category: "",
    gender_type: "",
    start_date: "",
    start_time: "",
    address: "",
  }

  const findTeamNameFromId = (id) => {
    const team = teams.find((item)=> item.teams.id == id)
    return team.teams.team_name
  }

   const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (data) => {
      resetForm();
      const team_1_name = findTeamNameFromId(data.team_1)
      const team_2_name = findTeamNameFromId(data.team_2)
      Object.assign(data,{'team_1_name': team_1_name, 'team_2_name': team_2_name})

      setFormedMatches((item)=>[...item, data])
      const isMatchFound = formedMatches.find(item => item.team_1 == data.team_1 && item.team_2 == data.team_2)
      
      if(isMatchFound) toast.warning('These teams already having a match')
    }
  });

  const handleTeam1Change = (e)=>{
    setFieldValue('team_1', e.target.value);

    setTeam2List(()=> teams.filter((item)=>{
      return item.teams.id != e.target.value
    }))
  }

  const handleTeam2Change = (e)=>{
    setFieldValue('team_2', e.target.value);

    setTeam1List(()=> teams.filter((item)=>{
      return item.teams.id != e.target.value
    }))
  }

  const handleRemoveMatch = (idx) => {
    setFormedMatches(formedMatches.filter((item, index)=> index != idx))
  }

  const handleCancelFormation = () =>{
    navigate(-1)
  }

  const handleAgeCategoryChange = (e) =>{
    setFieldValue('age_category', e.target.value)
     setFieldTouched('age_category', false);

    if(e.target.value && values.gender_type){
      const filteredTeams = teams.filter((item) => {
        const data = item.tournament_teams_reg_type.filter(item2 => {
          return item2.age_category == e.target.value && item2.gender_type == values.gender_type && !item2.is_disqualified;
        });
        if (item.is_selected && data.length > 0) {
          return item;
        } else {
          return false;
        }
      });
      setTeam1List(filteredTeams)
      setTeam2List(filteredTeams)

      setFieldValue('team_1', '')
      setFieldValue('team_2', '')
    }
  }

  const handleGenderTypeChange = (e) =>{
    setFieldValue('gender_type', e.target.value)
     setFieldTouched('gender_type', false);
    
    if(e.target.value && values.age_category){
      const filteredTeams = teams.filter((item) => {
        const data = item.tournament_teams_reg_type.filter(item2 => {
          return item2.gender_type == e.target.value && item2.age_category == values.age_category && !item2.is_disqualified;
        });

        if (item.is_selected && data.length > 0) {
          return item;
        } else {
          return false;
        }
      });

      setTeam1List(filteredTeams)
      setTeam2List(filteredTeams)

      setFieldValue('team_1', '')
      setFieldValue('team_2', '')
    }
  }

  const handleRoundNameChange = (e) => {
    setRoundName(e.target.value);

    if(e.target.value == '' || e.target.value == ' ') {
      setRoundNameError('Please enter round name');
    }
    else{
      setRoundNameError('');
    }
  }

  const handleCreateMatches = async () =>{
    if(roundName == ''){
      setRoundNameError('Please enter round name');
      return
    }

    const response = await matchFormationManual({
      tournament_id: tournament_id, 
      round_name: roundName, 
      matches: formedMatches
    });

     if(response.error){
      toast.error(response.error.data.message)
    }
    else if(response.data.success){
      toast.success(response.data.message);
      navigate(`/tournament/${tournament_id}`)
    }

  }


  return (
    <section className="px-4 md:px-10 lg:px-16 py-5 min-h-screen">
      <div>
        <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">{location.state.tournament_name}</h3>
        <p className='text-center text-gray-600 text-sm md:text-base mt-4'>Manual Match Formation</p>
      </div>

      <form action="" onSubmit={handleSubmit} encType="multipart/form-data" className='mt-10'>
        <div className='flex flex-col xs:flex-row justify-center items-center gap-4 mb-7'>
          <div className='flex flex-col w-full'>
            <label className="mb-2">Age Category *</label>
            <select name="age_category"
              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-1.5 sm:py-2 md:py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
              id=""
              value={values.age_category}
              onChange={(e)=> {handleAgeCategoryChange(e)}}
              onBlur={handleBlur} 
              >
              <option value="">Select...</option>
              {
                age_categories.map((item, i) => <option key={i} value={`${item}`}>{item}</option>)
              }
            </select>
            {
              errors.age_category && touched.age_category
                ?
                <small className='text-sm font-semibold text-red-600 px-1 mt-1'>{errors.age_category}</small>
                :
                null
            }
          </div>
          <div className='flex flex-col w-full'>
            <label className="mb-2">Gender Type *</label>
            <select name="gender_type"
              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-1.5 sm:py-2 md:py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
              id=""
              value={values.gender_type}
              onChange={(e)=> {handleGenderTypeChange(e)}}
              onBlur={handleBlur} 
              >
              <option value="">Select...</option>
              {
                gender_types.map((item, i) => <option key={i} value={`${item}`}>{item}</option>)
              }
            </select>
            {
              errors.gender_type && touched.gender_type
                ?
                <small className='text-sm font-semibold text-red-600 px-1 mt-1'>{errors.gender_type}</small>
                :
                null
            }
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col md:flex-row  gap-6 w-full">
            <div className="flex flex-col w-full">
              <label className="mb-2">Team 1 *</label>
              <select name="team_1"
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-1.5 sm:py-2 md:py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                id=""
                value={values.team_1}
                onChange={handleTeam1Change}
                onBlur={handleBlur} 
                >
                <option value="">Select...</option>
                {
                  team1List.map((item) => <option key={item.teams.id} value={`${item.teams.id}`}>{item.teams.team_name}</option>)
                }
              </select>
              {
                errors.team_1 && touched.team_1
                  ?
                  <small className='text-sm font-semibold text-red-600 px-1 mt-1'>{errors.team_1}</small>
                  :
                  null
              }
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2">Team 2 *</label>
              <select name="team_2"
                className="h-4 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full  py-1.5 sm:py-2 md:py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                id=""
                value={values.team_2}
                onChange={handleTeam2Change}
                onBlur={handleBlur} 
                >
                <option value="">Select...</option>
                {
                  team2List.map((item) => <option key={item.teams.id} value={`${item.teams.id}`}>{item.teams.team_name}</option>)
                }
              </select>
              {
                errors.team_2 && touched.team_2
                  ?
                  <small className='text-sm font-semibold text-red-600 px-1 mt-1'>{errors.team_2}</small>
                  :
                  null
              }
            </div>
          </div>
          <div className="flex flex-col md:flex-row  gap-6 w-full mb-7">
            <div className="flex flex-col w-full md:w-1/4">
              <label className="mb-2">Start Date</label>
              <input
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 mt-2 w-full  py-1.5 sm:py-2 md:py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                type="date"
                name="start_date"
                id="start_date"
                value={values.start_date}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {
                errors.start_date && touched.start_date
                  ?
                  <small className='text-sm font-semibold text-red-600 px-1 mt-1'>{errors.start_date}</small>
                  :
                  null
              }
            </div>
            <div className="flex flex-col w-full md:w-1/4">
              <label className="mb-2">Start Time</label>
              <input
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 mt-2 w-full  py-1.5 sm:py-2 md:py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                type="time"
                name="start_time"
                id="start_time"
                value={values.start_time}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex flex-col w-full md:w-2/4">
              <label className="mb-2">Address</label>
              <textarea
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 mt-2 w-full py-1.5 sm:py-2 md:py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                name="address"
                id="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <button type="reset" className='px-3 py-1.5 text-sm sm:text-base text-white bg-gray-800  hover:opacity-80 rounded-md' onClick={()=> resetForm()}>Clear</button>
          <button type="submit" className='px-3 py-1.5 text-sm sm:text-base text-white bg-[#1c76bb] hover:opacity-80 rounded-md'>Add to list</button>
        </div>
      </form>

      <div className='flex justify-center mt-10 mb-4'>
        <h4 className='text-gray-700 font-semibold text-lg sm:text-xl md:text-2xl'>Matches</h4>
      </div>
      <div className="table-container relative overflow-x-auto shadow-md rounded-md sm:rounded-lg ">
        <table className="w-full text-sm text-left ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-50 ">
              <tr>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Sr.
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Team 1
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Team 2
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Date
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Time
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Address
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
            {
              formedMatches.length > 0
              ?
              formedMatches.map((match, idx)=>{
                return <tr key={idx} className="bg-white border-b text-white dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                        {idx+1}
                    </th>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                        <span className="cursor-pointer hover:text-gray-300" onClick={()=> navigate(`/team/profile-detail/${match.team_1.id}`)}>{match.team_1_name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        VS
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                        <span className="cursor-pointer hover:text-gray-300" onClick={()=> navigate(`/team/profile-detail/${match.team_2.id}`)}>{match.team_2_name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {
                        match.start_date != '' && match.start_date != undefined
                        ?
                            <>
                                {moment(match.start_date).format("DD/MM/YYYY")}
                            </>
                        :
                            "--"
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {
                        match.start_time != '' && match.start_time != undefined
                        ?
                            <>
                                {moment(match.start_time, 'h:mm a').format("h:mm A")}
                            </>
                        :
                            "--"
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {
                          match.address != '' && match.address != undefined
                          ?
                            match.address
                          :
                            '--'
                        }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-red-500 hover:opacity-70 text-lg" onClick={()=>handleRemoveMatch(idx)}><MdDelete /></button>
                    </td>
                </tr>
              })
              :
              <tr>
                <td colSpan="10" className='text-center text-red-300 py-3'>No matches added</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      {
        formedMatches.length > 0
        ?
          <div className="mt-10 flex flex-col">
            <label className="mb-2">Round Name *</label>
            <input
              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 mt-2 w-full py-1.5 sm:py-2 md:py-3 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
              type="text"
              name="round_name"
              id="round_name"
              placeholder='Enter round name e.g. Semifinal'
              value={roundName}
              onChange={handleRoundNameChange}
            />
            {
                roundNameError != ''
                ?
                  <small className='text-sm font-semibold text-red-600 mt-1'>{roundNameError}</small>
                :
                  null
            }
            <span className="text-sm text-orange-300 mt-2 italic">Note: If you want to add matches in existing round then enter the exact name (with case sensitive) of existing round.</span>
          </div>
        :
          null
      }
      <div className='flex justify-end mt-10 mb-4 gap-4'>
        <button className='px-3 py-1.5 text-sm sm:text-base text-white bg-red-700 rounded-md' onClick={handleCancelFormation}>Cancel Formation</button>
        {
          formedMatches.length > 0
          ?
            <button disabled={isLoading} className={`px-3 py-1.5 text-sm sm:text-base text-white bg-green-700 rounded-md ${isLoading ? 'opacity-60' : ''}`} onClick={handleCreateMatches}>{isLoading ? 'Loading...' : 'Create Matches'}</button>
          :
            null
        }
      </div>
    </section>
  )
}

export default ManualMatchFormation