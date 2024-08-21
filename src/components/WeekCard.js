"use client"

import {useStore} from "@/zustand/zustand";

const WeekCard = () => {
    const {gameWeek} = useStore((state) => state)
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
                    Week: {gameWeek}
                </span>
            </div>
        </div>
    )
}

export default WeekCard
