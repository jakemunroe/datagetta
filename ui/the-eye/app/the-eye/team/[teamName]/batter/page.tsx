import CreateBatterTable from '../../components/CreateBatterTable';
import { Suspense } from 'react';
import TableSkeleton from '../../components/TableSkeleton';

export default async function TeamPage({ params }: { params: { teamName: string } }) {    
    const decodedTeamName = decodeURIComponent(params.teamName);

    return (
        <Suspense fallback={<TableSkeleton />}>
            <CreateBatterTable team = {decodedTeamName}/>
        </Suspense>
    );
}