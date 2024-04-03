import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import ShiftingModel from "../../../components/ShiftingModel";

export default function Page (
    { params }:
    { params: { teamName: string, playerName: string } })
{
    const decodedTeamName = decodeURIComponent(params.teamName);
    const decodedPlayerName = decodeURIComponent(params.playerName);
    
    return(
        <Grid container spacing={2}>
            <Grid sm={12} md={6} xl={6}>
                <ShiftingModel />
            </Grid>
        </Grid>
    );

}