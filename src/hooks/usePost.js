import axios from "axios";
import { useMutation } from "react-query";
import { API_BASE_URL } from '../../constant'

const SERVER = API_BASE_URL;

export function useRegisterTeam() {
  return useMutation((values) =>
    axios.post(`${SERVER}/team/registration`, values).then((res) => res.data)
  );
}

export function useRegisterPlayer() {
  return useMutation((values) =>
    axios.post(`${SERVER}/players/registration`, values).then((res) => res.data)
  );
}
