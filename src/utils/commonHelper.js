import {postApi} from "../../firebase.js";
import {league1Teams, league2Teams, league3Teams, league4Teams, superLigTeams} from "@/constants/constants.js";

export const sortLeague = (league, key) => hasElement(league) ? league.sort((a,b) => b[key] - a[key]) : [];

export const hasElement = element => element && element.length > 0;

export const createAllLeagueTeams = () => {
    postApi('teams', 'league_1', { teams: superLigTeams});
    postApi('teams', 'league_2', { teams: league1Teams});
    postApi('teams', 'league_3', { teams: league2Teams});
    postApi('teams', 'league_4', { teams: league3Teams});
    postApi('teams', 'league_5', { teams: league4Teams});
}
