import { prisma } from '@/app/utils/db';
import { batter_stats, pitcher_stats } from "@/app/utils/types";
import { batter_replacer } from '@/app/utils/replacer';
import Box from '@mui/material/Box';
import BattingStatsBarChart from './BattingStatsBarChart';

export default async function CreateStatsDiagrams(
    {player, team, startDate, endDate}: {player: string, team: string, startDate: string, endDate: string})
{    
    // https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-4#raw-query-mapping-postgresql-type-casts
    // In SQL function, get_batter_stats takes the params (text, text, date, date)
    // ::date explicitly casts the startDate and endDate strings to a SQL date type
    
    const batters = await prisma.$queryRaw<batter_stats[]>`SELECT * FROM get_batter_stats(${player}, ${team}, ${startDate}::date, ${endDate}::date)`;
    if (batters.length != 0) {
        return (
            <Box>
                <BattingStatsBarChart player = {JSON.parse(JSON.stringify(batters, batter_replacer))}/>
            </Box>
        );
    } else {
        const pitchers = await prisma.$queryRaw<pitcher_stats[]>`SELECT * FROM get_pitcher_stats(${player}, ${team}, ${startDate}::date, ${endDate}::date)`;
        return (
            <Box>
                <h2>Pitcher Stats</h2>
            </Box>
        );
    }
}