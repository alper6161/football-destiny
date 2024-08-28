"use client"

import {useEffect, useState} from "react";
import {getApi, postApi} from "../../firebase";
import {INITIAL_WEEK, superLigTeams} from "@/constants/constants";
import {createLeagueFixture, getInitializedLeagueTable} from "@/utils/leagueHelper";
import {useStore} from "@/zustand/zustand";
import {hasElement, sortLeague} from "@/utils/commonHelper";
import {createInitialSquad} from "@/utils/squadHelper.js";

const Main = ({children}) => {
    const {
        gameDetails, gameWeek, leagueFixture, teams, weekResults, leagueTable, squad,
        setCurrentWeekFixture, setGameDetails, setGameWeek, setLeagueFixture, setLeagueTable, setTeams, setManager, setFacility, setWeekResults, setSquad
    } = useStore((state) => state);

    const [squadPullComplete, setSquadPullComplete] = useState(false);
    const [isSquadCreated, setIsSquadCreated] = useState(false);

    useEffect(() => {
        getApi('gameDetails').then(res => setGameDetails(res[0]));
        getApi('teams').then(res => setTeams(superLigTeams));
        getApi('leagueFixture').then(res => {
            if(res){
                setLeagueFixture(res?.map(weekFixture => weekFixture.matches))
            }
        });
        getApi('manager').then(res => setManager(res[0]));
        getApi('facility').then(res => setFacility(res[0]));
        getApi('weekResults').then(res => setWeekResults(res[0].matches));
        getApi('squad').then(res => {
            setSquad(res);
            setSquadPullComplete(true);
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
            } else if (leagueFixture) {
                getApi('league').then(res => setLeagueTable(sortLeague(res, 'points')));
                setCurrentWeekFixture(leagueFixture[gameWeek - 1]);
            }
        }
    }, [gameWeek])

    useEffect(() => {
        updateWeekResults(weekResults);
    }, [weekResults]);

    useEffect(() => {
        if(leagueTable) {
            updateLeague(leagueTable);
        }
    }, [leagueTable]);

    useEffect(() => {
        if(!hasElement(squad) && squadPullComplete && !isSquadCreated) {
            const squad = createInitialSquad();
            setSquad(squad);
            updateSquad(squad);
            setIsSquadCreated(true);
        }
    }, [squad]);

    const initializeGame = () => {
        const initialLeagueTable = getInitializedLeagueTable(teams);
        setLeagueTable(initialLeagueTable);
        const leagueFixture = createLeagueFixture(teams);
        updateFixture(leagueFixture);
        setLeagueFixture(leagueFixture);
    }

    const isInitialWeek = (week) => week === INITIAL_WEEK;

    const nextWeek = () => {
        setGameWeek(gameWeek + 1);
    };

    const updateLeague = (leagueStanding) => {
        leagueStanding?.map(team => postApi('league', team?.id, team));
    };

    const updateFixture = (fixture) => {
        fixture.map((weekFixture, index) => postApi('leagueFixture', index.toString(), {
            matches: weekFixture,
            id: index.toString()
        }));
    };

    const updateGameWeek = (gameWeek) => postApi('gameDetails', 'game_details', {...gameDetails, week: gameWeek});

    const updateWeekResults = weekResults => postApi('weekResults', 'week_results', {id: 'week_results', matches: weekResults});

    const updateSquad = squad => {
        squad.map(player => postApi('squad', player.name, player))
    }

    return (
        <div className="centered background" style={{flexDirection: 'column'}}>
            {/*<WeekCard week={gameWeek} />*/}
            <button onClick={() => nextWeek()}>aaaa</button>
            {children}
        </div>
    )
}

export default Main
