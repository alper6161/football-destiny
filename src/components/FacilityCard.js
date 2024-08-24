"use client"

import {useStore} from "@/zustand/zustand";
import {SYSTEM_COLORS} from "@/constants/constants";

const FacilityCard = () => {
    const {facility} = useStore((state) => state);

    return (
        <div style={cardStyle}>
            <div style={titleStyle}>FACILITIES</div>
            <div style={facilityContainerStyle}>
                <div style={facilityBoxStyle(SYSTEM_COLORS.green)}>
                    Youth Academy
                    <div style={valueStyle}>{facility?.youth_academy}</div>
                </div>
                <div style={facilityBoxStyle(SYSTEM_COLORS.red)}>
                    Training Ground
                    <div style={valueStyle}>{facility?.training_ground}</div>
                </div>
                <div style={facilityBoxStyle((SYSTEM_COLORS.darkBlue))}>
                    Stadium
                    <div style={valueStyle}>{facility?.stadium}</div>
                </div>
            </div>
        </div>
    );
}

export default FacilityCard;

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

const facilityContainerStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    gap: '10px'
};

const facilityBoxStyle = (backgroundColor) => ({
    backgroundColor: backgroundColor,
    padding: '10px',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
});

const valueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
};