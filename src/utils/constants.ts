require('dotenv').config();

export const MTeamAPIToken = process.env.M_TEAM_API_TOKEN!;

export const Minute = 1000 * 60;

export const SEARCH_KEYWORD = process.env.SEARCH_KEYWORD || undefined;