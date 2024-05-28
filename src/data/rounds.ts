import { RED_TEAM_ID } from "@/data/teams";
import { BLUE_TEAM_ID } from "@/data/teams";

export const ROUND_1_ID: string = "round1";
export const ROUND_2_ID: string = "round2";
export const ROUND_3_ID: string = "round3";
export const ENDGAME_ID: string = "end";

const points = {
    [RED_TEAM_ID]: 0,
    [BLUE_TEAM_ID]: 0,
};

export const gameRounds = {
    [ROUND_1_ID]: {
        id: ROUND_1_ID,
        name: "1",
        rules: [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Consectetur adipisicing elit",
            "Sed do eiusmod tempor",
        ],
        points: points,
        canSkipWord: false,
        nextRound: ROUND_2_ID,
    },
    [ROUND_2_ID]: {
        id: ROUND_2_ID,
        name: "2",
        rules: [
            "Tempor incididunt ut labore et dolore magna aliqua",
            "Lorem ipsum dolor",
        ],
        points: points,
        canSkipWord: true,
        nextRound: ROUND_3_ID,
    },
    [ROUND_3_ID]: {
        id: ROUND_3_ID,
        name: "3",
        rules: [
            "Do eiusmod tempor incididunt",
            "Dolor sit amet, consectetur adipisicing elit",
        ],
        points: points,
        canSkipWord: true,
        nextRound: ENDGAME_ID,
    },
};
