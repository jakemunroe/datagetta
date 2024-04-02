import { prisma } from "@/app/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const trackman_pitchers = await prisma.trackman_pitcher.findMany({
    select: {
      // Selected data from modeling team
      PitchUID: true,
      PitcherThrows: true,
      TaggedPitchType: true,
      PlateLocHeight: true,
      PlateLocSide: true,
      ZoneSpeed: true,
      RelSpeed: true,
      VertRelAngle: true,
      HorzRelAngle: true,
      SpinRate: true,
      SpinAxis: true,
      RelHeight: true,
      RelSide: true,
      VertBreak: true,
      InducedVert: true,
      HorzBreak: true,
      VertApprAngle: true,
      HorzApprAngle: true,
      Extension: true,
    },
  });

  const trackman_batters = await prisma.trackman_batter.findMany({
    select: {
      PitchUID: true,
      BatterSide: true,
      BatterID: true,
    },
  });

  // Merge trackman_pitchers and trackman_batters based on PitchUID
  // It is ok if VSCode is angry
  const combinedData = trackman_pitchers.map((pitcher) => {
    // Looking for pitcher and batter data that has same PitchUID
    const matchingBatter = trackman_batters.find(
      (batter) => batter.PitchUID === pitcher.PitchUID
    );
    return {
      ...pitcher,
      Batter: matchingBatter ? matchingBatter.BatterID : null,
      BatterID: matchingBatter ? matchingBatter.BatterID : null,
      BatterSide: matchingBatter ? matchingBatter.BatterSide : null,
    };
  });
  return NextResponse.json(combinedData);
}
