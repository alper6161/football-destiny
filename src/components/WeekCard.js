"use client"

import {useStore} from "@/zustand/zustand";

const WeekCard = () => {
    const {gameWeek, gameDetails} = useStore((state) => state)
    return (
        <div style={{flex: 1, flexDirection: 'column', display: 'flex'}}>
            <div style={{flex: 1, fontWeight: 'bold', fontSize: '72px', display: 'flex', flexDirection: 'column'}}>
                <span style={{flex: 1}} className="centered">
                    Year: {gameDetails?.year}
                </span>
                <span style={{flex: 1}} className="centered">
                    Week: {gameWeek}
                </span>
            </div>
        </div>
    )
}

export default WeekCard;
