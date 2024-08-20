"use client"

import {useEffect, useState} from "react";
import {getApi, postApi} from "../../firebase";
import {superLigTeams} from "@/constants/constants";
import {createLeagueFixture, getInitializedLeagueTable, simulateWeekByLeagueFixture} from "@/utils/leagueHelper";

const Main = ({children}) => {
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
        setGameWeek(gameWeek + 1);
    };

    const getResults = () => {
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
        <div className="centered background" style={{flexDirection: 'column'}}>
            {/*<WeekCard week={gameWeek} />*/}
            {children}
        </div>
    )
}

export default Main
