import { prisma } from '@/app/utils/db';
import { batter_stats, pitcher_stats, pitch_sums } from "@/app/utils/types";
import { batter_replacer, pitcher_replacer } from '@/app/utils/replacer';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import BattingStatsBarChart from './BattingStatsBarChart';
import BattingStatsTable from './BattingStatsTable';
import PitchSumsBarChart from './PitchSumsBarChart';
import PitchingStatsTable from './PitchingStatsTable';

export default async function CreateStatsDiagrams(
    {player, team, startDate, endDate}: {player: string, team: string, startDate: string, endDate: string})
{    
    // https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-4#raw-query-mapping-postgresql-type-casts
    // In SQL function, get_batter_stats takes the params (text, text, date, date)
    // ::date explicitly casts the startDate and endDate strings to a SQL date type
    
    const batter = await prisma.$queryRaw<batter_stats[]>`SELECT * FROM get_batter_stats(${player}, ${team}, ${startDate}::date, ${endDate}::date)`;
    const pitcher = await prisma.$queryRaw<pitcher_stats[]>`SELECT * FROM get_pitcher_stats(${player}, ${team}, ${startDate}::date, ${endDate}::date)`;
    const pitches = await prisma.$queryRaw<pitch_sums[]>`SELECT * FROM get_pitch_count(${player}, ${team}, ${startDate}::date, ${endDate}::date)`;
    
    if (batter.length != 0 && pitcher.length != 0) {
        return (
            <Grid container spacing={2}>
                <Grid sm={6} md={4} xl={3}>
                    <BattingStatsTable player = {JSON.parse(JSON.stringify(batter, batter_replacer))}/>
                </Grid>

                <Grid sm={12} md={8} xl={9}>
                    <BattingStatsBarChart player = {JSON.parse(JSON.stringify(batter, batter_replacer))}/>
                </Grid>

                <Grid sm={6} md={4} xl={3}>
                    <PitchingStatsTable player = {JSON.parse(JSON.stringify(pitcher, pitcher_replacer))}/>
                </Grid>

                <Grid sm={12} md={8} xl={9}>
                    <PitchSumsBarChart player = {JSON.parse(JSON.stringify(pitches, pitcher_replacer))}/>
                </Grid>
            </Grid>
        );
    } 
    
    else if (batter.length != 0) {
        return (
            <Grid container spacing={2}>
                <Grid sm={6} md={4} xl={3}>
                    <BattingStatsTable player = {JSON.parse(JSON.stringify(batter, batter_replacer))}/>
                </Grid>

                <Grid sm={12} md={8} xl={9}>
                    <BattingStatsBarChart player = {JSON.parse(JSON.stringify(batter, batter_replacer))}/>
                </Grid>
            </Grid>
        );
    } 
    
    else if (pitcher.length != 0) {        
        return (
            <Grid container spacing={2}>
                <Grid sm={6} md={4} xl={3}>
                    <PitchingStatsTable player = {JSON.parse(JSON.stringify(pitcher, pitcher_replacer))}/>
                </Grid>

                <Grid sm={12} md={8} xl={9}>
                    <PitchSumsBarChart player = {JSON.parse(JSON.stringify(pitches, pitcher_replacer))}/>
                </Grid>
            </Grid>
        );
    } 
    
    else {
        return (
            <Typography variant='h6' color = '#d32f2f'><strong>Strikeout!</strong><br/>No stats found for this date range.</Typography>
        );
    }


}