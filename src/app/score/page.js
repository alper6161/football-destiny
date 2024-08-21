"use client"
import Results from '../../components/Results'

const Score = ({currentWeekFixture, weekResults, week}) => {
    return (
        <div className="page centered">
            <div className="widget centered" style={{margin: '.5rem 1rem'}}>
                <Results currentWeekFixture={currentWeekFixture} weekResults={weekResults} week={1}/>
            </div>
            <div className="widget centered" style={{margin: '.5rem 1rem'}}>
                League Table
            </div>
        </div>
    )
}

export default Score
