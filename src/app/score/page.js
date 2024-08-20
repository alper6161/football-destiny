"use client"
import Results from '../../components/Results'

const Score = ({currentWeekFixture, weekResults, week}) => {
    return (
        <div className="page centered">
            <div className="flex-1 widget centered">
                <Results currentWeekFixture={currentWeekFixture} weekResults={weekResults} week={1}/>
            </div>
            <div className="flex-1 widget centered">
                League Table
            </div>
        </div>
    )
}

export default Score
