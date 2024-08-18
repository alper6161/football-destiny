"use client"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getApi, postApi} from "../../firebase";
import {useEffect, useState} from "react";
import {superLigTeams} from "@/constants/constants";
import {createWeeklyLeagueFixture, initializeLeague, simulateWeekByLeagueFixture, updateLeagueTableByResults} from "@/utils/leagueHelper";

const WeekCard = ({data, updateLeague}) => {

    const [gameDetails, setGameDetails] = useState(null);
    const [teams, setTeams] = useState(superLigTeams);
    const [leagueFixture, setLeagueFixture] = useState(null);
    const [currentWeekFixture, setCurrentWeekFixture] = useState();
    const INITIAL_WEEK = 0;

    useEffect(() => {
        getApi('gameDetails').then(res => setGameDetails(res[0]));
        getApi('teams').then(res => setTeams(superLigTeams));
    }, []);

    useEffect(() => {
        console.log("gameDetails", gameDetails)
        if (gameDetails && teams) {

            if(isInitialWeek(gameDetails.week)) {
                const leagueFixture = createWeeklyLeagueFixture(teams);
            }
            let leagueStanding = isInitialWeek(gameDetails.week) ? initializeLeague(teams) : null;
            console.log("leagueStanding", leagueStanding)
            leagueStanding.map(team => postApi('league', team?.id, team));
        }
    }, [gameDetails, teams]);

    const isInitialWeek = (week) => week === INITIAL_WEEK;

    const nextWeek = () => {
        // Update game details with +1 week;
        const weekResults = simulateWeekByLeagueFixture(currentWeekFixture);
    };

    const goToStanding= () => {
        // Update game details with +1 week;
        updateLeagueTableByResults(leagueStanding, weekResults);
    };

    return (
        <div style={{width: '20rem', height: '20rem', border: '1px solid #7a8893',borderRadius: '15px', flexDirection: 'column'}} className="centered">
            <div style={{ fontWeight: 'bold', fontSize: '72px', flex: 4}} className="centered">
                <span>
                    {1}
                </span>
            </div>
            <div style={{flex: 1}}>
                <button className="button" >
                    Next Week
                </button>
            </div>
        </div>
    )
}

export default WeekCard
