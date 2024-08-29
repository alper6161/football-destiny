import { create } from 'zustand'

export const useStore = create(
        (set) => ({
            gameDetails: null,
            teams: null,
            leagueTable: [],
            leagueFixture: [],
            gameWeek: null,
            currentWeekFixture: null,
            weekResults: null,
            manager: null,
            facility: null,
            squad: null,
            setGameDetails: (newGameDetails) => set(() => ({gameDetails: newGameDetails})),
            setGameWeek: newGameWeek => set(() => ({gameWeek: newGameWeek})),
            setWeekResults: newWeekResult => set(() => ({weekResults: newWeekResult})),
            setTeams: newTeams => set(() => ({teams: newTeams})),
            setLeagueFixture: newLeagueFixture => set(() => ({leagueFixture: newLeagueFixture})),
            setLeagueTable: newLeagueTable => set(() => ({leagueTable: newLeagueTable})),
            setCurrentWeekFixture: newCurrentWeekFixture => set(() => ({currentWeekFixture: newCurrentWeekFixture})),
            setManager: manager => set(() => ({manager: manager})),
            setFacility: facility => set(() => ({facility: facility})),
            setSquad: squad => set(() => ({squad: squad})),
        })
);