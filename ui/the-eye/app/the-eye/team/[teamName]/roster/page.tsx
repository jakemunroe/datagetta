import CreateRosterTable from '../../components/CreateRosterTable';
import { Suspense } from 'react';
import TableSkeleton from '../../components/TableSkeleton';

export default async function Page({ params }: { params: { teamName: string } }) {    
    const decodedTeamName = decodeURIComponent(params.teamName);

    return (
        <Suspense fallback={<TableSkeleton />}>
            <CreateRosterTable team = {decodedTeamName}/>
        </Suspense>
    );
}