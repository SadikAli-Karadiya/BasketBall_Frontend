import {
  getPlayers,
  setBasicForm,
  setGameForm,
  setNotfication,
  setPlayerDetail,
} from "../slices/PlayerSlice";

const PlayerList = [];

export const getPlayerList = (index) => {
  return async (dispatch) => {
    dispatch(getPlayers(PlayerList));
  };
};

export const searchPlayers = (search) => {
  return async (dispatch) => {
    const Searchresult = PlayerList.filter((player) =>
      player.basicinfo.firstName.toLowerCase().includes(search.toLowerCase())
    );
    dispatch(getPlayers(Searchresult));
  };
};

export const findPlayer = (id) => {
  const player = PlayerList.find((player) => player.id == id);
  return async (dispatch) => {
    dispatch(setPlayerDetail(player));
  };
};

export const setBasicInfoForm = (basicInfo) => {
  return async (dispatch) => {
    dispatch(setBasicForm(basicInfo));
  };
};

export const setGameInfoForm = (basicInfo) => {
  return async (dispatch) => {
    dispatch(setGameForm(basicInfo));
  };
};

export const getNotification = () => {
  let Notification = [
    {
      id: 1,
      msg: "Shoot for the moon. Even if you miss, you'll land among the stars.",
      isSeen: false,
    },
    {
      id: 2,
      msg: "Good, better, best. Never let it rest. Until your good is better and your better is best.",
      isSeen: false,
    },
    {
      id: 3,
      msg: "Excellence is not a singular act, but a habit. You are what you repeatedly do.",
      isSeen: false,
    },
    {
      id: 4,
      msg: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
      isSeen: false,
    },
  ];
  return async (dispatch) => {
    dispatch(setNotfication({ ok: true, data: Notification }));
  };
};
