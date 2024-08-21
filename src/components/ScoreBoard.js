'use client'
import './scoreBoard.css'
import simulateMatch from "@/utils/matchHelper";
import {useEffect, useState} from "react";

const ScoreBoard = ({homeTeam, awayTeam, isMainMatch, onMatchStart, startMatch}) => {

    const [result, setResult] = useState(null);
    const [minute, setMinute] = useState(0);
    const [isMatchPlaying, setIsMatchPlaying] = useState(false);
    const [homeTeamScore, setHomeTeamScore] = useState(0);
    const [awayTeamScore, setAwayTeamScore] = useState(0);
    const [homeTeamGoals, setHomeTeamGoals] = useState([]);
    const [awayTeamGoals, setAwayTeamGoals] = useState([]);
    const MINUTE_INTERVAL_AS_MS = 300;
    let interval = null;

    useEffect(() => {
        if(homeTeam && awayTeam){
            setResult(simulateMatch(homeTeam, awayTeam));
        }
    }, []);

    useEffect(() => {
        if(isMatchPlaying){
            interval = setInterval(() => {
                setMinute(prevMinute => prevMinute + 1);
            }, MINUTE_INTERVAL_AS_MS);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isMatchPlaying]);

    useEffect(() => {
        if(result?.homeTeamGoalMinutes.includes(minute)) {
            setHomeTeamGoals([...homeTeamGoals, minute]);
            setHomeTeamScore(homeTeamScore + 1);
        }
        if(result?.awayTeamGoalMinutes.includes(minute)) {
            setAwayTeamGoals([...awayTeamGoals, minute]);
            setAwayTeamScore(awayTeamScore + 1);
        }
        if(minute >= 90) {
            clearInterval(interval);
            setIsMatchPlaying(false);
        }
    }, [minute]);

    useEffect(() => {
        if (startMatch){
            setIsMatchPlaying(true)
        }
    }, [startMatch])

    return (
        <div className="scoreboard">
            <div className="team home">
                <span className="team-name">{homeTeam.name}</span>
                <span className="team-score">{homeTeamScore}</span>
                <div className="goal-times">
                    {
                        homeTeamGoals.map(goal => <span className="goal-time" key={goal}>{goal}'</span>)
                    }
                </div>
            </div>
            <div className="match-info">
                <span className="minute">{minute}'</span>
                {
                    isMainMatch &&
                    <button className="start-button" onClick={() => {
                        setIsMatchPlaying(true);
                        onMatchStart();
                    }}>
                        {isMatchPlaying ? 'Pause' : 'Start'}
                    </button>
                }
            </div>
            <div className="team away">
                <span className="team-name">{awayTeam.name}</span>
                <span className="team-score">{awayTeamScore}</span>
                <div className="goal-times">
                    {
                        awayTeamGoals.map(goal => <span className="goal-time" key={goal}>{goal}'</span>)
                    }
                </div>
            </div>
        </div>
    )
}

export default ScoreBoard
