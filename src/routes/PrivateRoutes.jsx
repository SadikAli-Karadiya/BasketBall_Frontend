import React, { lazy } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PrivateLayout from "../layouts/PrivateLayout";
import Team from "../pages/Team";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Dashboard from "../pages/Dashboard";
import Gallery from "../pages/Gallery";
import News from "../pages/News";
import Player from "../pages/Player";
import Role from "../pages/Role";
import VisitorProfile from "../pages/Profile";
import AfterRole from "../pages/RegisterAfterLogin";
import TermsandConditions from "../pages/Term&Conditions";
import MatchsList from "../pages/Matches";
import TeamProfileDetail from "../pages/Team/TeamProfileDetail";
import PageNotFound from "../pages/Error";
import MatchDetails from "../pages/Matches/MatchDetails";
import Scoreboard from "../pages/Scoreboard";
import Tournament from "../pages/Tournament";
import ResendVerificationEmail from "../pages/ResendVerificationEmail";
import Loader from "../Component/Loader";
import { toast } from "react-toastify";
import { authentication } from "../redux/actions/User";
import { useGetUserDataQuery } from "../services/user";
import MatchPlayerSelection from "../pages/Matches/MatchPlayerSelection";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Admin from '../pages/Admin'
import { logout } from "../redux/actions/User";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [querySkip, setQuerySkip] = React.useState(true);

  const { token, user } = useSelector((state) => state.user);
  
  const { data, isLoading, isError, error } = useGetUserDataQuery(undefined, { skip: querySkip });

  React.useEffect(() => {
    
    const token = localStorage.getItem("token");
      if (token && !Object.keys(user).length) {
        setQuerySkip(false);
      }
  }, []);

  React.useEffect(() => {
    
    if (isError) {
      setQuerySkip(true);
      dispatch(logout());
      navigate("/");
    } 
    else if (data && data.success) {
      setQuerySkip(true);
      dispatch(authentication(token, data.user));
    }
  
  }, [data, isError]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Routes>
      {
        !user.is_verified
        ?
          <>
            <Route path="/user/resend-verification-link/:user_id" element={<ResendVerificationEmail />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route index element={<ResendVerificationEmail />} />
          </>
        :
          <>
            <Route element={<PrivateLayout />}>
              <Route path="/match" element={<MatchsList />} />
              <Route path="/match-details/:id" element={<MatchDetails />} />
              <Route
                path="/profile-detail/:team_id"
                element={<TeamProfileDetail />}
              />
              <Route path="/visitor-profile" element={<VisitorProfile />} />
              <Route path="/role" element={<Role />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="news/*" element={<News />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="player/*" element={<Player />} />
              <Route path="tournament/*" element={<Tournament />} />
              <Route path="team/*" element={<Team />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route
                path="/match/playerselection"
                element={<MatchPlayerSelection />}
              />
              <Route path="/registration" element={<AfterRole />} />
              <Route path="/term&condition" element={<TermsandConditions />} />
              <Route path="/" element={<Dashboard />} />
                  
              <Route path="/*" element={<PageNotFound />} />

              <Route index element={<Dashboard />} />
            </Route>

            {
              user.is_admin
              ?
                <Route element={<AdminLayout />}>
                  <Route path="admin/*" element={<Admin />} />
                  <Route index element={<AdminDashboard />} />
                </Route>
              :
                null
            }

          </>
            
      }
      <Route path="/scoreboard/:match_id/:token" element={<Scoreboard />} />
    </Routes>
  );
};

export default PrivateRoutes;
