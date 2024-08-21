import { useStore } from "@/zustand/zustand";

const Results = () => {
    const {currentWeekFixture, week, weekResults} = useStore(state => state);

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <div>
                {week}
            </div>
            <div style={{ flex:1 }}>
                {
                    currentWeekFixture && currentWeekFixture?.map((match, index) =>
                        <div key={index}>
                            <span>{match.homeTeam.name}</span>
                            {weekResults && <span>{weekResults[index]?.homeTeamScore}</span>}
                            -
                            {weekResults && <span>{weekResults[index]?.awayTeamScore}</span>}
                            <span>{match.awayTeam.name}</span>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Results
