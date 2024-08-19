"use client"

const WeekCard = ({week}) => {

    return (
        <div style={{
            width: '20rem',
            height: '20rem',
            border: '1px solid #7a8893',
            borderRadius: '15px',
            flexDirection: 'column'
        }} className="centered">
            <div style={{fontWeight: 'bold', fontSize: '72px', flex: 4}} className="centered">
                <span>
                    {week}
                </span>
            </div>
        </div>
    )
}

export default WeekCard
