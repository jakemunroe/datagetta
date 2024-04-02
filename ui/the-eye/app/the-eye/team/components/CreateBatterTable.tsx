import { prisma } from '@/app/utils/db';
import BatterTable from './BatterTable';
import { batter_stats } from '@/app/utils/types';
import { batter_replacer } from '@/app/utils/replacer';

export default async function CreateBatterTable({ team }: { team: string }) {        
    const batters = await prisma.$queryRaw<batter_stats[]>`SELECT * FROM batter_stats_view_2024 WHERE "BatterTeam" = ${team}`;

    return (
        <BatterTable players={JSON.parse(JSON.stringify(batters, batter_replacer))}/>
    );
}