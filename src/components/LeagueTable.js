"use client";
import {useStore} from "@/zustand/zustand";
import {useEffect} from "react";
import './LeagueTable.css'
import {updateLeagueTableByResults} from "@/utils/leagueHelper";
import {hasElement, sortLeague} from "@/utils/commonHelper";

const LeagueTable = () => {
    const {leagueTable, weekResults, setLeagueTable} = useStore(state => state);

    useEffect(() => {
        if (weekResults) {
            setLeagueTable(sortLeague(updateLeagueTableByResults(leagueTable, weekResults), 'points'));
        }
    }, [weekResults]);

    const leagueMap = {
        name: 'Name',
        played: 'P',
        won: 'W',
        drawn: 'D',
        lost: 'L',
        goalsFor: 'GF',
        goalsAgainst: 'GA',
        goalDiff: 'GD',
        points: 'Points'
    }

    return (
        <table className="table">
            <thead className="table-head">
                <tr>
                    {
                        Object.values(leagueMap).map(title => (
                            <th key={title} className="table-title">{title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody className="table-body">
                {
                    hasElement(leagueTable) && leagueTable.map((element, pos) => (
                        <tr key={pos}>
                            {
                                Object.keys(leagueMap).map((key, index) => (
                                    <td key={key} className="table-label">
                                        {index === 0 &&
                                            <span style={{color: 'black', marginRight: '.25rem'}}>{pos + 1 + '.'}</span>
                                        }
                                        {element[key]}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default LeagueTable
