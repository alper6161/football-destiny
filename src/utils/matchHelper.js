const HOME_TEAM_COEFFICENT = 55;
const AWAY_TEAM_COEFFICENT = 45;
const POSSIBLE_LOWEST_GOAL_CHANCE = 0.02;
const POWER_DIFF_COEFFICIENT = 2;

const simulateMatch = (team1, team2) => {
    let team1Attack = team1.attack;
    let team1Defense = team1.defense;
    let team2Attack = team2.attack;
    let team2Defense = team2.defense;

    let team1Score = 0;
    let team2Score = 0;

    for (let minute = 0; minute < 90; minute++) {
        let team1GoalChance = Math.random() * 100;
        let team2GoalChance = Math.random() * 100;
        let team1GoalProbability = Math.max(POSSIBLE_LOWEST_GOAL_CHANCE ,((team1Attack - team2Defense) * POWER_DIFF_COEFFICIENT + HOME_TEAM_COEFFICENT) / 100);
        let team2GoalProbability = Math.max(POSSIBLE_LOWEST_GOAL_CHANCE ,((team2Attack - team1Defense) * POWER_DIFF_COEFFICIENT + AWAY_TEAM_COEFFICENT) / 100);


        if (team1GoalChance < team1GoalProbability) {
            team1Score++;
        }

        if (team2GoalChance < team2GoalProbability) {
            team2Score++;
        }

    }

    return {
        team1Score: team1Score,
        team2Score: team2Score
    };
}

//For Simulation and Test purposes
const team1 = {attack: 85, defense: 85};
const team2 = { attack: 85, defense: 85};

let team1Wins = 0;
let team2Wins = 0;
let draw = 0;
let highestScoreDiff= {
    team1Score: 0,
    team2Score: 0,
};
let scoreOccurence = {};

for( let i = 0; i < 1000; i++){
    let result = simulateMatch(team1, team2);

    if(result.team1Score > result.team2Score){
        team1Wins++;
    } else if (result.team1Score < result.team2Score){
        team2Wins++;
    } else {
        draw++;
    }

    if(scoreOccurence[`${result.team1Score}-${result.team2Score}`]){
        scoreOccurence[`${result.team1Score}-${result.team2Score}`]++;
    }else {
        scoreOccurence[`${result.team1Score}-${result.team2Score}`] = 1;
    }

    if(Math.abs(result.team1Score - result.team2Score) > Math.abs(highestScoreDiff.team1Score- highestScoreDiff.team2Score)){
        highestScoreDiff = result;
    }
}

console.log('TEAM 1 ATK:', team1.attack, ' DEF:', team1.defense);
console.log('TEAM 2 ATK:', team2.attack, ' DEF:', team2.defense);
console.log('1000 games played');
console.log('TEAM 1 won:', team1Wins);
console.log('TEAM 2 won:', team2Wins);
console.log('draw:', draw);
console.log('Highest Goal Difference:', highestScoreDiff.team1Score, ':',  highestScoreDiff. team2Score);
console.log('Score Occurence:', scoreOccurence);

