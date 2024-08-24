export const sortLeague = (league, key) => hasElement(league) ? league.sort((a,b) => b[key] - a[key]) : [];

export const hasElement = element => element && element.length > 0;
