const simulateMatch = (team1, team2) => {
    let team1Attack = team1.attack;
    let team1Defense = team1.defense;
    let team2Attack = team2.attack;
    let team2Defense = team2.defense;

    let team1Score = 0;
    let team2Score = 0;

    for (let minute = 0; minute < 90; minute++) {
        let team1GoalChance = Math.random();

        if (team1GoalChance < (team1Attack / (team1Attack + team2Defense))) {
            team1Score++;
            continue;
        }

        let team2GoalChance = Math.random();
        if (team2GoalChance < (team2Attack / (team2Attack + team1Defense))) {
            team2Score++;
        }
    }

    return {
        team1Score: team1Score,
        team2Score: team2Score
    };
}

console.log(simulateMatch({attack: 26, defense: 61}, { attack: 35, defense: 16}));
