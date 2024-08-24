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
        played: 'Played',
        won: 'Win',
        drawn: 'Draw',
        lost: 'Lost',
        goalsFor: 'Goals',
        goalsAgainst: 'Goals Against',
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
                    hasElement(leagueTable) && leagueTable.map((element) => (
                        <tr>
                            {
                                Object.keys(leagueMap).map(key => (
                                    <td className="table-label">
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
