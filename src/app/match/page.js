"use client"
import ScoreBoard from "@/components/ScoreBoard";
import {useEffect, useState} from "react";
import {useStore} from "@/zustand/zustand";
import {simulateWeekByLeagueFixture} from "@/utils/leagueHelper";

const Match = () => {
    const {weekResults, setWeekResults} = useStore((state) => state)
    const {currentWeekFixture, gameDetails} = useStore(state => state);
    const [isMatchStarted, setIsMatchStarted] = useState(false);
    const [homeTeam, setHomeTeam] = useState();
    const [awayTeam, setAwayTeam] = useState();

    useEffect(() => {
        if (currentWeekFixture) {
            currentWeekFixture.forEach(match => {
                if ((match.homeTeam.name === gameDetails.myTeam) || (match.awayTeam.name === gameDetails.myTeam)) {
                    setHomeTeam(match.homeTeam);
                    setAwayTeam(match.awayTeam);
                }
            })
            setWeekResults(simulateWeekByLeagueFixture(currentWeekFixture))
        }
    }, [currentWeekFixture])

    return (<div className="page" style={{height: '100vh'}}>
        <div className="centered" style={{display: 'flex', flex: 3, padding: '20px', borderRight: '1px solid #ccc'}}>
            {homeTeam && awayTeam && weekResults && <ScoreBoard
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                isMainMatch={true}
                onMatchStart={() => setIsMatchStarted(true)}
                result={weekResults.find(match => match.homeTeam === gameDetails.myTeam || match.awayTeam === gameDetails.myTeam)}>
            </ScoreBoard>}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '20px', overflow: 'auto', maxHeight: '45rem'}}>
            {weekResults && currentWeekFixture.map((match, index) =>
                    <ScoreBoard
                        homeTeam={match.homeTeam}
                        awayTeam={match.awayTeam}
                        isMainMatch={false}
                        startMatch={isMatchStarted}
                        result={weekResults[index]}>
                    </ScoreBoard>)
            }
        </div>
    </div>);
};

export default Match;