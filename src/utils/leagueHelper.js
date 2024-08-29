import {simulateMatch} from "../utils/matchHelper.js";

export const createLeagueFixture = (teams) => {
    let schedule = [];
    let totalTeams = teams.length;
    let totalRounds = (totalTeams - 1) * 2;
    let matchesPerWeek = totalTeams / 2;

    for (let round = 0; round < totalRounds / 2; round++) {
        let weeklyMatches = [];

        for (let match = 0; match < matchesPerWeek; match++) {
            let homeTeam = teams[match];
            let awayTeam = teams[totalTeams - match - 1];

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

export const getInitializedLeagueTable = (teams) => {
    return teams.map(team => ({
        id: team.name,
        name: team.name,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
        points: 0
    }));
}

export const simulateWeekByLeagueFixture = (weeklyFixture) => {
    const weekResults = [];
    weeklyFixture.forEach(match => {
        let result = simulateMatch(match.homeTeam, match.awayTeam);
        weekResults.push({
            ...result,
            homeTeam: match.homeTeam.name,
            awayTeam: match.awayTeam.name
        });
    })

    return weekResults;
}

export const updateLeagueTableByResults = (leagueTable, weekResults) => {
    const newLeagueTable = [];
    weekResults.forEach(result => {
        const homeTeam = {...leagueTable.find(leagueTeam => leagueTeam.name === result.homeTeam)};
        const awayTeam = {...leagueTable.find(leagueTeam => leagueTeam.name === result.awayTeam)};

        if (result.homeTeamScore > result.awayTeamScore) {
            homeTeam.won++;
            homeTeam.points += 3;
            awayTeam.lost++;
        } else if (result.awayTeamScore > result.homeTeamScore) {
            awayTeam.won++;
            awayTeam.points += 3;
            homeTeam.lost++;
        } else {
            homeTeam.drawn++;
            awayTeam.drawn++;
            homeTeam.points += 1;
            awayTeam.points += 1;
        }

        homeTeam.played++;
        awayTeam.played++;
        homeTeam.goalsFor += result.homeTeamScore;
        homeTeam.goalsAgainst += result.awayTeamScore;
        homeTeam.goalDiff += result.homeTeamScore - result.awayTeamScore;
        awayTeam.goalsFor += result.awayTeamScore;
        awayTeam.goalsAgainst += result.homeTeamScore;
        awayTeam.goalDiff += result.awayTeamScore - result.homeTeamScore;

        newLeagueTable.push(homeTeam);
        newLeagueTable.push(awayTeam);
    })
    return newLeagueTable;
}

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
            let team1 = match.homeTeam;
            let team2 = match.awayTeam;
            let result = simulateMatch(team1, team2);
            //console.log(`${team1.name}: ${result.homeTeamScore} - ${team2.name}: ${result.awayTeamScore}`)

            let team1Standing = standings.find(s => s.name === team1.name);
            let team2Standing = standings.find(s => s.name === team2.name);

            team1Standing.played++;
            team2Standing.played++;
            team1Standing.goalsFor += result.homeTeamScore;
            team1Standing.goalsAgainst += result.awayTeamScore;
            team2Standing.goalsFor += result.awayTeamScore;
            team2Standing.goalsAgainst += result.homeTeamScore;

            if (result.homeTeamScore > result.awayTeamScore) {
                team1Standing.won++;
                team1Standing.points += 3;
                team2Standing.lost++;
            } else if (result.awayTeamScore > result.homeTeamScore) {
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

/*
const schedule = createWeeklyLeagueFixture(superLigTeams);
simulateWeekByLeagueFixture(schedule[0]);

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
*/
