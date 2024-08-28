"use client";
import './SquadCard.css'
import {useStore} from "@/zustand/zustand.js";
import {POSITIONS} from "@/constants/constants.js";

const SquadCard = () => {
    const { squad } = useStore((state) => state);
    return (
        <div className="tableContainer">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Country</th>
                    <th>Attack</th>
                    <th>Defence</th>
                    <th>Favourite Tactic</th>
                    <th>Formation</th>
                </tr>
                </thead>
                <tbody>
                {squad?.map((player, index) => {
                    let attackClass = 'attack';
                    let defenceClass = 'defence';

                    if (player.position === POSITIONS.ATK) {
                        attackClass += ' bold';
                    }
                    if (player.position === POSITIONS.DEF || player.position === POSITIONS.GK) {
                        defenceClass += ' bold';
                    }

                    return (
                        <tr key={index}>
                            <td className='cell-content'>{player.name}</td>
                            <td className='cell'>{player.position}</td>
                            <td className='cell'>{player.country}</td>
                            <td className={attackClass}>{player.attack}</td>
                            <td className={defenceClass}>{player.defence}</td>
                            <td className='cell'>{player.favTactic}</td>
                            <td className='cell'>{player.formation}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default SquadCard;
