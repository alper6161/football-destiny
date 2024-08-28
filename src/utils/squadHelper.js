import {
    getNameByCountry,
    getRandomAge,
    getRandomFormation,
    getRandomizedPlayerPosition,
    getRandomizedPlayerStats, getRandomizedTacticType
} from "./playerHelper.js";

export const createInitialSquad = () => {
    const INITIAL_SQUAD_SIZE = 22;
    const squad = [];

    for( let i = 0; i < INITIAL_SQUAD_SIZE; i++){
        const position = getRandomizedPlayerPosition(i);
        const stats = getRandomizedPlayerStats(position);
        squad.push({
            name: getNameByCountry('TR'),
            position: position,
            attack: stats.attack,
            defence: stats.defence,
            formation: getRandomFormation(),
            age: getRandomAge(),
            country: 'TR',
            favTactic: getRandomizedTacticType()
        })
    }
    return squad;
};


//console.log(createInitialSquad());