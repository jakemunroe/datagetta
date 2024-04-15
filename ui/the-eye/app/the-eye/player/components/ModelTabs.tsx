'use client'

import Box from "@mui/material/Box";
import Link from "@/app/utils/Link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function ModelTabs ({team, player}: {team: string, player: string}) {
    const currentURL = '/the-eye/player/';
    
    const pathName = usePathname();

    const [statsUnderline, setStatsUnderline] = useState<'none' | 'hover' | 'always' | undefined>('hover');
    const [model1Underline, setModel1Underline] = useState<'none' | 'hover' | 'always' | undefined>('hover');
    const [model2Underline, setModel2Underline] = useState<'none' | 'hover' | 'always' | undefined>('hover');
    const [model3Underline, setModel3Underline] = useState<'none' | 'hover' | 'always' | undefined>('hover');
    
    useEffect(() => {
        setStatsUnderline('hover');
        setModel1Underline('hover');
        setModel2Underline('hover');
        setModel3Underline('hover');

        if (pathName.includes('/stats')) {
            setStatsUnderline('always');
        } else if (pathName.includes('/shiftModel')) {
            setModel1Underline('always');
        } else if (pathName.includes('/model2')) {
            setModel2Underline('always');
        } else if (pathName.includes('/model3')) {
            setModel3Underline('always');
        }
    }, [pathName])
    
    return (
        <Box
            sx={{
                display: 'flex',
                columnGap: 8, rowGap: 2,
                flexWrap: 'wrap',
            }}
        >
            <Link 
                href = {currentURL.concat(team + '/' + player).concat('/stats')}
                name = 'Stats'
                fontWeight = {600}
                underline = {statsUnderline}
            />
            <Link 
                href = {currentURL.concat(team + '/' + player).concat('/shiftModel')}
                name = 'Defensive Shift'
                fontWeight = {600}
                underline = {model1Underline}
            />
            <Link 
                href = {currentURL.concat(team + '/' + player).concat('/model2')}
                name = 'Model 2'
                fontWeight = {600}
                underline = {model2Underline}
            />
            <Link 
                href = {currentURL.concat(team + '/' + player).concat('/model3')}
                name = 'Model 3'
                fontWeight = {600}
                underline = {model3Underline}
            />

        </Box>
    )
}