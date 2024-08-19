const Score = ({currentWeekFixture, weekResults, week}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            Score
            <div>
                {week}
            </div>
            <div style={{flex:1}}>
                {
                    currentWeekFixture && currentWeekFixture?.map((match, index) =>
                    <div>
                        <span>{match.homeTeam.name}</span>
                        {weekResults && <span>{weekResults[index].homeTeamScore}</span>}
                        -
                        {weekResults && <span>{weekResults[index].awayTeamScore}</span>}
                        <span>{match.awayTeam.name}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Score
