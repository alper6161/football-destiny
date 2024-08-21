"use client"
import Results from '../../components/Results'

const Score = () => {
    return (
        <div className="page centered">
            <div className="widget centered" style={{margin: '.5rem 1rem'}}>
                <Results />
            </div>
            <div className="widget centered" style={{margin: '.5rem 1rem'}}>
                League Table
            </div>
        </div>
    )
}

export default Score
