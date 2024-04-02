/*
 * API endpoint for modeling team that focuses on ...
 * 
 * Returns JSON response of the requested info below from BASE_URL/modeling2
 */

import { prisma } from '@/app/utils/db'
import { NextRequest, NextResponse} from 'next/server'


/**
 * Method for to handle GET requests.
 * 
 * @param request Simple Request
 * @returns JSON of needed trackman info from trackman_pitcher data.
 */
export async function GET(request: Request) {
    const trackman_pitchers = await prisma.trackman_pitcher.findMany({
        select: { // Specified data used by team
            PitchUID: true,
            TaggedPitchType: true,
            PlateLocHeight: true,
            PlateLocSide: true,
            RelSpeed: true,
            RelHeight: true,
            InducedVert: true,
            HorzBreak: true,
            Extension: true
        }
    })

    return NextResponse.json(trackman_pitchers)
}