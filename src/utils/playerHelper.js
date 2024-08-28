import {FORMATIONS, POSITIONS, TACTIC_TYPES} from "../constants/constants.js";
import {faker, fakerTR} from "@faker-js/faker";

export const getNameByCountry = (country) => {
    switch (country) {
        case('TR'):
            return fakerTR.person.fullName({sex: 'male'});
        default:
            return faker.person.fullName({sex: 'male'});
    }
};

export const getRandomFormation = () => {
    const randomIndex = Math.floor(Math.random() * FORMATIONS.length);
    return FORMATIONS[randomIndex];
};

export const getRandomAge = () => {
    const maxAge = 34;
    const minAge = 19;
    return Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
};

export const getRandomizedPlayerStats = (position) => {
    const MAX_PLAYER_STAT = 35;
    const MID_PLAYER_STAT = 20;
    const MIN_PLAYER_STAT = 5;
    let attack, defence;

    switch (position) {
        case POSITIONS.ATK:
            attack = Math.floor(Math.random() * (MAX_PLAYER_STAT - MID_PLAYER_STAT + 1)) + MID_PLAYER_STAT;
            defence = Math.floor(Math.random() * (MID_PLAYER_STAT - MIN_PLAYER_STAT + 1)) + MIN_PLAYER_STAT;
            break;
        case POSITIONS.DEF:
            attack = Math.floor(Math.random() * (MID_PLAYER_STAT - MIN_PLAYER_STAT + 1)) + MIN_PLAYER_STAT;
            defence = Math.floor(Math.random() * (MAX_PLAYER_STAT - MID_PLAYER_STAT + 1)) + MID_PLAYER_STAT;
            break;
        case POSITIONS.GK:
            attack = 0;
            defence = Math.floor(Math.random() * (MAX_PLAYER_STAT - MID_PLAYER_STAT + 1)) + MID_PLAYER_STAT;
            break;
        case POSITIONS.MID:
        default:
            attack = Math.floor(Math.random() * (MAX_PLAYER_STAT - MID_PLAYER_STAT + 1)) + MID_PLAYER_STAT;
            defence = Math.floor(Math.random() * (MAX_PLAYER_STAT - MID_PLAYER_STAT + 1)) + MID_PLAYER_STAT
            break;
    }

    return {attack, defence};
};

export const getRandomizedPlayerPosition = (index) => {
    switch (true) {
        case (index >= 0 && index <= 2):
            return POSITIONS.GK;
        case (index >= 3 && index <= 9):
            return POSITIONS.DEF;
        case (index >= 10 && index <= 16):
            return POSITIONS.MID;
        case (index >= 17 && index <= 21):
        default:
            return POSITIONS.ATK;
    }
};

export const getRandomizedTacticType = () => {
    const randomIndex = Math.floor(Math.random() * TACTIC_TYPES.length);
    return TACTIC_TYPES[randomIndex];
};

/*
console.log(getRandomizedTacticType())
console.log(getRandomizedPlayerStats(POSITIONS.ATK))
console.log(getRandomizedPlayerStats(POSITIONS.MID))
console.log(getRandomizedPlayerStats(POSITIONS.DEF))
console.log(getRandomFormation());
console.log('Turkish Random Name:', getNameByCountry('TR'));
console.log('Foreign Random Name:', getNameByCountry('US'));
*/
