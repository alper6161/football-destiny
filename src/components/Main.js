"use client"

import {useEffect} from "react";
import {getApi, postApi} from "../../firebase";
import {INITIAL_WEEK, superLigTeams} from "@/constants/constants";
import {createLeagueFixture, getInitializedLeagueTable} from "@/utils/leagueHelper";
import {useStore} from "@/zustand/zustand";

const Main = ({children}) => {
    const {
        gameDetails, gameWeek, leagueFixture, teams,
        setCurrentWeekFixture, setGameDetails, setGameWeek, setLeagueFixture, setLeagueTable, setTeams
    } = useStore((state) => state)

    useEffect(() => {
        getApi('gameDetails').then(res => setGameDetails(res[0]));
        getApi('teams').then(res => setTeams(superLigTeams));
        getApi('leagueFixture').then(res => {
            if(res){
                setLeagueFixture(res?.map(weekFixture => weekFixture.matches))
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
            } else if (leagueFixture) {
                setCurrentWeekFixture(leagueFixture[gameWeek - 1]);
            }
        }
    }, [gameWeek, leagueFixture])

    const initializeGame = () => {
        const initialLeagueTable = getInitializedLeagueTable(teams);
        updateLeague(initialLeagueTable);
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
            <button onClick={() => nextWeek()}>aaaa</button>
            {children}
        </div>
    )
}

export default Main
