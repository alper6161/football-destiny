'use client'
import { useStore } from "@/zustand/zustand";
import MoneyCard from "@/components/MoneyCard.js";
import { useState } from 'react';

const Facilities = () => {
    const { facility, upgradeFacility } = useStore((state) => state);
    const [upgradeCosts, setUpgradeCosts] = useState({
        training_ground: 100000,
        medical: 75000,
        youth_academy: 125000,
        stadium: 200000
    });

    const handleUpgrade = (facilityType) => {
        upgradeFacility(facilityType);
        setUpgradeCosts({
            ...upgradeCosts,
            [facilityType]: upgradeCosts[facilityType] * 1.5
        });
    };

    return (
        <div className="page" style={{height: '100vh', display: 'flex', flexDirection: 'column', padding: '2rem'}}>
            <div style={{flex: 1}}>
                <MoneyCard />
            </div>
            <div style={styles.facilitiesContainer}>
                <div style={styles.facilityCard}>
                    <h3 style={styles.facilityTitle}>Training</h3>
                    <p style={styles.facilityValue}>{facility?.training_ground}</p>
                    <p style={styles.upgradeCost}>Upgrade Cost: ${upgradeCosts.training_ground}</p>
                    <button style={styles.upgradeButton} onClick={() => handleUpgrade('training_ground')}>
                        Upgrade Training Ground
                    </button>
                </div>
                <div style={styles.facilityCard}>
                    <h3 style={styles.facilityTitle}>Medical</h3>
                    <p style={styles.facilityValue}>{facility?.medical}</p>
                    <p style={styles.upgradeCost}>Upgrade Cost: ${upgradeCosts.medical}</p>
                    <button style={styles.upgradeButton} onClick={() => handleUpgrade('medical')}>
                        Upgrade Medical Facility
                    </button>
                </div>
                <div style={styles.facilityCard}>
                    <h3 style={styles.facilityTitle}>Youth Academy</h3>
                    <p style={styles.facilityValue}>{facility?.youth_academy}</p>
                    <p style={styles.upgradeCost}>Upgrade Cost: ${upgradeCosts.youth_academy}</p>
                    <button style={styles.upgradeButton} onClick={() => handleUpgrade('youth_academy')}>
                        Upgrade Youth Academy
                    </button>
                </div>
                <div style={styles.stadiumCard}>
                    <h1 style={styles.stadiumTitle}>Stadium</h1>
                    <p style={styles.facilityValue}>{facility?.stadium}</p>
                    <p style={styles.upgradeCost}>Upgrade Cost: ${upgradeCosts.stadium}</p>
                    <button style={styles.upgradeButton} onClick={() => handleUpgrade('stadium')}>
                        Upgrade Stadium
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    facilitiesContainer: {
        flex: 4,
        display: 'flex',
        gap: '2rem',
        background: 'white',
        margin: '2rem',
        borderRadius: '2rem',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        flexWrap: 'wrap'
    },
    facilityCard: {
        flex: 1,
        background: '#f7f7f7',
        borderRadius: '1rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        minWidth: '200px'
    },
    facilityTitle: {
        margin: '0 0 1rem 0',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#333'
    },
    facilityValue: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#555'
    },
    upgradeCost: {
        fontSize: '1rem',
        color: '#777',
        marginBottom: '1rem'
    },
    upgradeButton: {
        padding: '0.5rem 1rem',
        background: '#4CAF50',
        color: 'white',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background 0.3s ease'
    },
    upgradeButtonHover: {
        background: '#45a049'
    },
    stadiumCard: {
        flex: 1,
        background: '#e3e3e3',
        borderRadius: '1rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        minWidth: '200px'
    },
    stadiumTitle: {
        margin: '0 0 1rem 0',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#222'
    }
};

export default Facilities;
