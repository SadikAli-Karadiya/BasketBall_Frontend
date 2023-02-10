import { getPlayers } from "../slices/PlayerSlice";

export const getPlayerList = (index) => {
  return async (dispatch) => {
    let PlayerList = [
      {
        id: 1,
        basicinfo: {
          img: "/CBL_Images/player-default-profile.webp",
          firstName: "Deepak",
          email: "wellbenix@gmail.com",
          lastName: "Prajapati",
          dateofbirth: new Date(),
          gender: "m",
          pincode: "382340",
        },
        gameinfo: {
          height: "168",
          weight: "200",
          playerPosition: "Center",
          JerseyNumber: "69",
          Experience:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ur amet. Tempora aspernatur accusantium ipsam adipisci voluptatibus.",
        },
        statics: {
          totalMatch: 100,
          matchWon: 100,
          matchLoss: 0,
          totalScore: 320,
        },
        teamDetails: {
          team_id: 1001,
          team_logo: "/CBL_Images/basketball_team_logo_2.webp",
          team_name: "Mehta Ke Mahaarathi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adip, Lorem ipsum dolor sit amet, consectetur adip",
          coach_name: "Mohammadshad Mohammadsajid Rajput",
          coach_mobile: "9000000000",
          assistant_coach_name: "coach abc",
          assistant_coach_mobile: "9989999999",
          total_players: 7,
          captain: 1,
          matches_played: 22,
          matches_won: 18,
          matches_lost: 4,
        },
      },
      {
        id: 2,
        basicinfo: {
          img: "/CBL_Images/player-default-profile.webp",
          firstName: "Sadik",
          email: "wellbenix@gmail.com",
          lastName: "Prajapati",
          dateofbirth: new Date(),
          gender: "m",
          pincode: "382340",
        },
        gameinfo: {
          height: "168",
          weight: "200",
          playerPosition: "Center",
          JerseyNumber: "69",
          Experience:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ur amet. Tempora aspernatur accusantium ipsam adipisci voluptatibus.",
        },
        statics: {
          totalMatch: 100,
          matchWon: 100,
          matchLoss: 0,
          totalScore: 320,
        },
        teamDetails: {
          team_id: 1001,
          team_logo: "/CBL_Images/basketball_team_logo_2.webp",
          team_name: "Mehta Ke Mahaarathi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adip, Lorem ipsum dolor sit amet, consectetur adip",
          coach_name: "Mohammadshad Mohammadsajid Rajput",
          coach_mobile: "9000000000",
          assistant_coach_name: "coach abc",
          assistant_coach_mobile: "9989999999",
          total_players: 7,
          captain: 1,
          matches_played: 22,
          matches_won: 18,
          matches_lost: 4,
        },
      },
      {
        id: 3,
        basicinfo: {
          img: "/CBL_Images/player-default-profile.webp",
          firstName: "Shad",
          email: "wellbenix@gmail.com",
          lastName: "Prajapati",
          dateofbirth: new Date(),
          gender: "m",
          pincode: "382340",
        },
        gameinfo: {
          height: "168",
          weight: "200",
          playerPosition: "Center",
          JerseyNumber: "69",
          Experience:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ur amet. Tempora aspernatur accusantium ipsam adipisci voluptatibus.",
        },
        statics: {
          totalMatch: 100,
          matchWon: 100,
          matchLoss: 0,
          totalScore: 320,
        },
        teamDetails: {
          team_id: 1001,
          team_logo: "/CBL_Images/basketball_team_logo_2.webp",
          team_name: "Mehta Ke Mahaarathi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adip, Lorem ipsum dolor sit amet, consectetur adip",
          coach_name: "Mohammadshad Mohammadsajid Rajput",
          coach_mobile: "9000000000",
          assistant_coach_name: "coach abc",
          assistant_coach_mobile: "9989999999",
          total_players: 7,
          captain: 1,
          matches_played: 22,
          matches_won: 18,
          matches_lost: 4,
        },
      },
      {
        id: 4,
        basicinfo: {
          img: "/CBL_Images/player-default-profile.webp",
          firstName: "Monu",
          email: "wellbenix@gmail.com",
          lastName: "Prajapati",
          dateofbirth: new Date(),
          gender: "m",
          pincode: "382340",
        },
        gameinfo: {
          height: "168",
          weight: "200",
          playerPosition: "Center",
          JerseyNumber: "69",
          Experience:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ur amet. Tempora aspernatur accusantium ipsam adipisci voluptatibus.",
        },
        statics: {
          totalMatch: 100,
          matchWon: 100,
          matchLoss: 0,
          totalScore: 320,
        },
        teamDetails: {
          team_id: 1001,
          team_logo: "/CBL_Images/basketball_team_logo_2.webp",
          team_name: "Mehta Ke Mahaarathi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adip, Lorem ipsum dolor sit amet, consectetur adip",
          coach_name: "Mohammadshad Mohammadsajid Rajput",
          coach_mobile: "9000000000",
          assistant_coach_name: "coach abc",
          assistant_coach_mobile: "9989999999",
          total_players: 7,
          captain: 1,
          matches_played: 22,
          matches_won: 18,
          matches_lost: 4,
        },
      },
      {
        id: 5,
        basicinfo: {
          img: "/CBL_Images/player-default-profile.webp",
          firstName: "po",
          email: "wellbenix@gmail.com",
          lastName: "Prajapati",
          dateofbirth: new Date(),
          gender: "m",
          pincode: "382340",
        },
        gameinfo: {
          height: "168",
          weight: "200",
          playerPosition: "Center",
          JerseyNumber: "69",
          Experience:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ur amet. Tempora aspernatur accusantium ipsam adipisci voluptatibus.",
        },
        statics: {
          totalMatch: 100,
          matchWon: 100,
          matchLoss: 0,
          totalScore: 320,
        },
        teamDetails: {
          team_id: 1001,
          team_logo: "/CBL_Images/basketball_team_logo_2.webp",
          team_name: "Mehta Ke Mahaarathi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adip, Lorem ipsum dolor sit amet, consectetur adip",
          coach_name: "Mohammadshad Mohammadsajid Rajput",
          coach_mobile: "9000000000",
          assistant_coach_name: "coach abc",
          assistant_coach_mobile: "9989999999",
          total_players: 7,
          captain: 1,
          matches_played: 22,
          matches_won: 18,
          matches_lost: 4,
        },
      },
    ];
    dispatch(getPlayers(PlayerList));
  };
};