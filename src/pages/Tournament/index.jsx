import React from "react";
import { Route, Routes } from "react-router-dom";
import TournamentAddEdit from "./TournamentAddEdit";
import TournamentsList from "./TournamentsList";
import TournamentsOfOrganizer from "./TournamentsOfOrganizer";
import TournamentDetails from "./TournamentDetails";
import TeamRegister from "./TournamentDetails/TeamRegister";
import ManualMatchFormation from "./TournamentDetails/ManualMatchFormation";

const Tournament = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/add-edit" element={<TournamentAddEdit />} />
          <Route
            path="/team-register/:tournament_id"
            element={<TeamRegister />}
          />
          <Route path="/:tournament_id" element={<TournamentDetails />} />
          <Route path="/:tournament_id/manual-match-formation" element={<ManualMatchFormation />} />
          <Route path="/organizer" element={<TournamentsOfOrganizer />} />
          <Route path="/" element={<TournamentsList />} />
        </Route>
      </Routes>
    </>
  );
};

export default Tournament;
