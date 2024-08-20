"use client"
import {superLigTeams} from "@/constants/constants";
import ScoreBoard from "@/components/ScoreBoard";
import {useState} from "react";

const Match = () => {
    const [isMatchStarted, setIsMatchStarted] = useState(false);
    const homeTeam = superLigTeams[3];
    const awayTeam = superLigTeams[7];
    const otherMatches = [{
        homeTeam: superLigTeams[0], awayTeam: superLigTeams[2]
    }, {
        homeTeam: superLigTeams[1], awayTeam: superLigTeams[9]
    }, {
        homeTeam: superLigTeams[11], awayTeam: superLigTeams[15]
    }]

    return (<div className="page" style={{height: '100vh'}}>
        <div style={{display: 'flex', flex: 3, padding: '20px', borderRight: '1px solid #ccc'}}>
            <ScoreBoard
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                isMainMatch={true}
                onMatchStart={() => setIsMatchStarted(true)}>
            </ScoreBoard>
        </div>
        <div style={{flex: 1, padding: '20px'}}>
            <h3>Other Match Scores</h3>
            {otherMatches.map(match =>
                <ScoreBoard
                    homeTeam={match.homeTeam}
                    awayTeam={match.awayTeam}
                    isMainMatch={false}
                    startMatch={isMatchStarted}>
                </ScoreBoard>)
            }
        </div>
    </div>);
};

export default Match;