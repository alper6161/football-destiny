"use client"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getApi, postApi} from "../../firebase";
import {useEffect, useState} from "react";
import {superLigTeams} from "@/constants/constants";
import {
    createLeagueFixture,
    getInitializedLeagueTable,
    simulateWeekByLeagueFixture,
    updateLeagueTableByResults
} from "@/utils/leagueHelper";

const WeekCard = () => {

    const [gameWeek, setGameWeek] = useState(null);
    const [gameDetails, setGameDetails] = useState(null);
    const [leagueFixture, setLeagueFixture] = useState(null);
    const [teams, setTeams] = useState(superLigTeams);
    const [currentWeekFixture, setCurrentWeekFixture] = useState();
    const [weekResults, setWeekResults] = useState(null);
    const [leagueTable, setLeagueTable] = useState([]);
    const INITIAL_WEEK = 0;

    useEffect(() => {
        getApi('gameDetails').then(res => setGameDetails(res[0]));
        getApi('teams').then(res => setTeams(superLigTeams));
        getApi('leagueFixture').then(res => {
            if (res) {
                setLeagueFixture(res.map(weekFixture => weekFixture.matches));
            }
        });
    }, []);

    useEffect(() => {
        if (gameDetails) {
            setGameWeek(gameDetails.week);
        }
    }, [gameDetails]);

    useEffect(() => {
        if (gameWeek != null) {
            updateGameWeek(gameWeek);
            if (isInitialWeek(gameWeek)) {
                initializeGame();
            } else {
                console.log(leagueFixture);
                console.log(leagueFixture[gameWeek - 1]);
                setCurrentWeekFixture(leagueFixture[gameWeek - 1]);
            }
        }
    }, [gameWeek])

    const initializeGame = () => {
        getApi('teams').then(res => {
            const teams = superLigTeams;
            setTeams(teams);
            const initialLeagueTable = getInitializedLeagueTable(teams);
            updateLeague(initialLeagueTable);
            setLeagueTable(initialLeagueTable);
            const leagueFixture = createLeagueFixture(teams);
            setLeagueFixture(leagueFixture);
            updateFixture(leagueFixture);
        });
    }

    const isInitialWeek = (week) => week === INITIAL_WEEK;

    const nextWeek = () => {
        // Update game details with +1 week;
        setGameWeek(gameWeek + 1);
    };

    const getResults = () => {
        // Update game details with +1 week;
        setWeekResults(simulateWeekByLeagueFixture(currentWeekFixture));
    };

    const updateLeague = (leagueStanding) => {
        leagueStanding.map(team => postApi('league', team?.id, team));
    };

    const updateFixture = (fixture) => {
        fixture.map((weekFixture, index) => postApi('leagueFixture', index.toString(), {
            matches: weekFixture,
            id: index.toString()
        }));
    };

    const updateGameWeek = (gameWeek) => {
        postApi('gameDetails', 'game_details', {...gameDetails, week: gameWeek});
    };

    return (
        <div style={{
            width: '20rem',
            height: '20rem',
            border: '1px solid #7a8893',
            borderRadius: '15px',
            flexDirection: 'column'
        }} className="centered">
            <div style={{fontWeight: 'bold', fontSize: '72px', flex: 4}} className="centered">
                <span>
                    {gameWeek}
                </span>
            </div>
            <div style={{flex: 1, display: 'flex'}}>
                <button className="button" style={{flex: 1}} onClick={getResults}>
                    Results
                </button>
                <button className="button" style={{flex: 1}} onClick={nextWeek}>
                    Next Week
                </button>
            </div>
            {
                currentWeekFixture && currentWeekFixture?.map((match, index) =>
                    <div>
                        <span>{match.homeTeam.name}</span>
                        {weekResults && <span>{weekResults[index].homeTeamScore}</span>}
                        -
                        {weekResults && <span>{weekResults[index].awayTeamScore}</span>}
                        <span>{match.awayTeam.name}</span>
                    </div>
                )
            }
        </div>
    )
}

export default WeekCard
