"use client"

import {useStore} from "@/zustand/zustand";
import {SYSTEM_COLORS} from "@/constants/constants";

const MoneyCard = () => {
    const {gameDetails} = useStore((state) => state);

    return (
        <div style={cardStyle}>
            <div style={titleStyle}>MONEY</div>
            <div style={moneyStyle} className='centered'>
                {gameDetails?.money}$
            </div>
        </div>
    );
}

export default MoneyCard;

const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '20px',
    textAlign: 'center',
};

const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
};

const moneyStyle = {
    flex: 1,
    fontSize: '35px',
    fontWeight: 'bold',
    color: SYSTEM_COLORS.green,
    marginBottom: '15px',
};