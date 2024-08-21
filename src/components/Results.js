import {useStore} from "@/zustand/zustand";
import './results.css';

const Results = () => {
    const {currentWeekFixture, gameWeek, weekResults} = useStore(state => state);

    return (
        <div className='container'>
            <div className='week'>
                Week: {gameWeek}
            </div>
            <div className='matchList'>
                {currentWeekFixture && currentWeekFixture.map((match, index) => (
                    <div key={index} className='matchCard'>
                        <div className='teamName centered'>
                            {match.homeTeam.name}
                        </div>
                        <div className='score centered'>
                            <>
                                <div className='goals'>{weekResults ? weekResults[index]?.homeTeamScore : ''}</div>
                                <div> - </div>
                                <div className='goals'>{weekResults ? weekResults[index]?.awayTeamScore : ''}</div>
                            </>
                        </div>
                        <div className='teamName centered'>
                            {match.awayTeam.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Results
