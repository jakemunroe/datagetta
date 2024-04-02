import { prisma } from '@/app/utils/db';
import RosterTable from './RosterTable';

export default async function CreateRosterTable({ team }: { team: string }) {    
    
    const players = await prisma.players.findMany({
        where: {
            TeamName: team,
        },
        orderBy: {
            PlayerName: 'asc',
        },
    });

    return (
        <RosterTable players = {players}/>
    );
}