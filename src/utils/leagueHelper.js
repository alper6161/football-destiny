const simulateMatch = require('./matchHelper');
const superLigTeams = [
    {name: 'Galatasaray', attack: 85, defense: 80},
    {name: 'Fenerbahçe', attack: 83, defense: 79},
    {name: 'Beşiktaş', attack: 82, defense: 78},
    {name: 'Trabzonspor', attack: 81, defense: 77},
    {name: 'Başakşehir', attack: 79, defense: 76},
    {name: 'Adana Demirspor', attack: 78, defense: 75},
    {name: 'Sivasspor', attack: 76, defense: 74},
    {name: 'Alanyaspor', attack: 75, defense: 73},
    {name: 'Antalyaspor', attack: 74, defense: 72},
    {name: 'Gaziantep FK', attack: 73, defense: 71},
    {name: 'Konyaspor', attack: 72, defense: 70},
    {name: 'Kayserispor', attack: 71, defense: 69},
    {name: 'Rizespor', attack: 70, defense: 68},
    {name: 'Hatayspor', attack: 69, defense: 67},
    {name: 'Göztepe', attack: 68, defense: 66},
    {name: 'Çaykur Rizespor', attack: 67, defense: 65},
    {name: 'Gençlerbirliği', attack: 66, defense: 64},
    {name: 'Ankaragücü', attack: 65, defense: 63}
];

const simulateLeague = (teams, schedule) => {
    let standings = teams.map(team => ({
        name: team.name,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0
    }));

    schedule.forEach((week, index) => {
        //console.log('WEEK ', index + 1);
        //console.log('-----------------------------------');
        week.forEach(match => {
            let team1 = teams.find(t => t.name === match.homeTeam);
            let team2 = teams.find(t => t.name === match.awayTeam);
            let result = simulateMatch(team1, team2);
            //console.log(`${team1.name}: ${result.team1Score} - ${team2.name}: ${result.team2Score}`)

            let team1Standing = standings.find(s => s.name === team1.name);
            let team2Standing = standings.find(s => s.name === team2.name);

            team1Standing.played++;
            team2Standing.played++;
            team1Standing.goalsFor += result.team1Score;
            team1Standing.goalsAgainst += result.team2Score;
            team2Standing.goalsFor += result.team2Score;
            team2Standing.goalsAgainst += result.team1Score;

            if (result.team1Score > result.team2Score) {
                team1Standing.won++;
                team1Standing.points += 3;
                team2Standing.lost++;
            } else if (result.team2Score > result.team1Score) {
                team2Standing.won++;
                team2Standing.points += 3;
                team1Standing.lost++;
            } else {
                team1Standing.drawn++;
                team2Standing.drawn++;
                team1Standing.points += 1;
                team2Standing.points += 1;
            }
        });
    });

    standings.sort((a, b) => b.points - a.points || b.goalsFor - a.goalsFor || a.goalsAgainst - b.goalsAgainst);

    return standings;
}

const createWeeklyLeagueFixture = (teams) => {
    let schedule = [];
    let totalTeams = teams.length;
    let totalRounds = (totalTeams - 1) * 2;
    let matchesPerWeek = totalTeams / 2;

    for (let round = 0; round < totalRounds / 2; round++) {
        let weeklyMatches = [];

        for (let match = 0; match < matchesPerWeek; match++) {
            let homeTeam = teams[match].name;
            let awayTeam = teams[totalTeams - match - 1].name;

            weeklyMatches.push({
                homeTeam: homeTeam,
                awayTeam: awayTeam
            });
        }

        schedule.push(weeklyMatches);

        // Rotate teams for next round
        teams.splice(1, 0, teams.pop());
    }

    // For return leg (reverse fixtures)
    let returnLeg = schedule.map(week => week.map(match => ({
        homeTeam: match.awayTeam,
        awayTeam: match.homeTeam
    })));
    return schedule.concat(returnLeg);
}

const weeklyLeagueSchedule = createWeeklyLeagueFixture(superLigTeams);
let championshipCount = {}
for (let i = 0; i < 1000; i++) {
    let leagueStandings = simulateLeague(superLigTeams, weeklyLeagueSchedule);
    championshipCount = {
        ...championshipCount,
        [leagueStandings[0].name]: championshipCount[leagueStandings[0].name] ? championshipCount[leagueStandings[0].name]+1 : 1
    }
}
console.log('AFTER 1000 LEAGUE CHAMPIONSHIP COUNTS')
const sortedTeams = Object.entries(championshipCount)
    .sort(([, a], [, b]) => b - a)
    .map(([name, score]) => ({ name, score }));
console.log(sortedTeams);

