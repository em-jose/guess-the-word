import { RED_TEAM_ID } from "@/data/teams";
import { BLUE_TEAM_ID } from "@/data/teams";

export const ROUND_1_ID = "round1";
export const ROUND_2_ID = "round2";
export const ROUND_3_ID = "round3";

const points = {
    [RED_TEAM_ID]: 0,
    [BLUE_TEAM_ID]: 0,
};

export const gameRounds = [
    {
        id: ROUND_1_ID,
        playingTeam: null,
        rules: [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Consectetur adipisicing elit",
            "Sed do eiusmod tempor",
        ],
        points: points,
        canSkipWord: false,
        nextRound: ROUND_2_ID,
    },
    {
        id: ROUND_2_ID,
        playingTeam: null,
        rules: [
            "Tempor incididunt ut labore et dolore magna aliqua",
            "Lorem ipsum dolor",
        ],
        points: points,
        canSkipWord: true,
        nextRound: ROUND_3_ID,
    },
    {
        id: ROUND_3_ID,
        playingTeam: null,
        rules: [
            "Do eiusmod tempor incididunt",
            "Dolor sit amet, consectetur adipisicing elit",
        ],
        points: points,
        canSkipWord: true,
        nextRound: null,
    },
];
