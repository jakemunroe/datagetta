import * as React from 'react';
import Box from "@mui/material/Box";
import { prisma } from '@/app/db';
import TeamInfo from '../components/TeamInfo';
import RosterTable from '../components/RosterTable';

export default async function TeamPage({ params }: { params: { teamName: string } }) {
    const teamName_addSpace = params.teamName.replace(/%20/g, ' ');
    
    const team = await prisma.team.findUnique({
        where: {
            team_name: teamName_addSpace,
        }
    });

    return (
        <Box >
            <TeamInfo 
                name = {team?.team_name as string}
                conference = {team?.conference_name as string}
                wins = {team?.number_wins as number}
                losses = {team?.number_losses as number}
            />
            
            <RosterTable />
        </Box>
    );
}