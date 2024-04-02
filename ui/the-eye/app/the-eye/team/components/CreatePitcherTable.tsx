import { prisma } from '@/app/utils/db';
import { pitcher_replacer } from '@/app/utils/replacer';
import { pitcher_stats } from '@/app/utils/types';
import PitcherTable from './PitcherTable';

export default async function CreatePitcherTable({ team }: { team: string }) {    
    const pitchers = await prisma.$queryRaw<pitcher_stats[]>`SELECT * FROM pitcher_stats_view_2024 WHERE "PitcherTeam" = ${team}`;

    return (
        <PitcherTable players={JSON.parse(JSON.stringify(pitchers, pitcher_replacer))}/>
    );
}