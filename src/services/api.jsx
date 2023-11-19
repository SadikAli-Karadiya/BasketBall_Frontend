import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {API_BASE_URL} from '../../constant';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authentication', `${token}`)
      }
      return headers
    },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: [
    "User, Players, Teams, Tournaments, TournamentsOfOrganizer, TeamsRequest, TeamsOfManager , News , Gallery, TournamentsRequest, TournamentGallery",
  ],
  endpoints: () => ({}),
});
