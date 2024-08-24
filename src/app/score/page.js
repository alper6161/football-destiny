"use client"
import Results from '../../components/Results'
import LeagueTable from "@/components/LeagueTable";

const Score = () => {
    return (
        <div className="page centered">
            <div className="widget" style={{margin: '.5rem 1rem'}}>
                <Results />
            </div>
            <div className="widget centered" style={{margin: '.5rem 1rem'}}>
                <LeagueTable />
            </div>
        </div>
    )
}

export default Score
