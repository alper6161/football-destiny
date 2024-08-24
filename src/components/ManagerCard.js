"use client"

import {useStore} from "@/zustand/zustand";
import {SYSTEM_COLORS} from "@/constants/constants";

const ManagerCard = () => {
    const {manager} = useStore((state) => state);

    return (
        <div style={cardStyle}>
            <div style={titleStyle}>MANAGER</div>
            <div style={nameStyle} className='centered'>{manager?.name}</div>
            <div style={statContainerStyle} className='centered'>
                <div style={statBoxStyle(SYSTEM_COLORS.red)}>Attack<br /><br />{manager?.attack}</div>
                <div style={statBoxStyle(SYSTEM_COLORS.blue)}>Defence<br /><br />{manager?.defence}</div>
                <div style={statBoxStyle(SYSTEM_COLORS.purple)}>Coaching<br /><br />{manager?.coaching}</div>
                <div style={statBoxStyle(SYSTEM_COLORS.green)}>Transfer<br /><br />{manager?.transfer}</div>
            </div>
        </div>
    );
}

export default ManagerCard;

const cardStyle = {
    border: '2px solid #ddd',
    borderRadius: '12px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%'
};

const titleStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
};

const nameStyle = {
    fontSize: '40px',
    fontWeight: 'bold',
};

const statContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '15px',
    flex: 1
};

const statBoxStyle = (backgroundColor) => ({
    backgroundColor: backgroundColor,
    padding: '15px',
    borderRadius: '10px',
    color: '#fff',
    fontWeight: 'bold',
    width: '7rem',
    textAlign: 'center',
    fontSize: '27px',
});