'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import {INITIAL_WEEK, superLigTeams} from "@/constants/constants";

export const useStore = create(
        (set) => ({
            gameDetails: null,
            teams: superLigTeams,
            leagueTable: [],
            leagueFixture: [],
            gameWeek: null,
            currentWeekFixture: null,
            weekResults: null,
            manager: null,
            setGameDetails: (newGameDetails) => set(() => ({gameDetails: newGameDetails})),
            setGameWeek: newGameWeek => set(() => ({gameWeek: newGameWeek})),
            setWeekResults: newWeekResult => set(() => ({weekResults: newWeekResult})),
            setTeams: newTeams => set(() => ({teams: newTeams})),
            setLeagueFixture: newLeagueFixture => set(() => ({leagueFixture: newLeagueFixture})),
            setLeagueTable: newLeagueTable => set(() => ({leagueTable: newLeagueTable})),
            setCurrentWeekFixture: newCurrentWeekFixture => set(() => ({currentWeekFixture: newCurrentWeekFixture})),
            setManager: manager => set(() => ({manager: manager})),
        })
);