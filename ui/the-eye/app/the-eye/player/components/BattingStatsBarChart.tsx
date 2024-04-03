'use client'

import { BarChart } from "@mui/x-charts/BarChart";
import { batter_stats_forTable } from "@/app/utils/types";

type barChart = {
    stat: string;
    value: number;
}

function manipulateData (param : batter_stats_forTable[]) {
    let result : barChart[] = [];
    result.push({ stat: 'OBP', value: param[0].on_base_percentage });
    result.push({ stat: 'SLUG', value: param[0].slugging_percentage });
    result.push({ stat: 'OPS', value: param[0].onbase_plus_slugging });
    result.push({ stat: 'CHASE', value: param[0].chase_percentage });
    result.push({ stat: 'IZW', value: param[0].in_zone_whiff_percentage });
    result.push({ stat: 'ISO', value: param[0].isolated_power });
    result.push({ stat: 'K%', value: param[0].k_percentage });
    result.push({ stat: 'BoB', value: param[0].base_on_ball_percentage });
    return result;
}

export default function BattingStatsBarChart({player}: {player: batter_stats_forTable[]}) {
    return (
        <BarChart 
            layout = 'horizontal'
            dataset = { manipulateData(player) }
            series = {[ { dataKey: 'value', color: '#e86100' } ]}
            yAxis = {[ { scaleType: 'band', dataKey: 'stat' } ]}
            height = { 500 }
        />
    );
}