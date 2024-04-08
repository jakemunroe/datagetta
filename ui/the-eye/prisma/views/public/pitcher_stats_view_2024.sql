WITH pitcher_stats_subquery AS (
  SELECT
    tp."Pitcher",
    tp."PitcherTeam",
    count(*) FILTER (
      WHERE
        ((tm."KorBB") :: text = 'Strikeout' :: text)
    ) AS total_strikeouts_pitcher,
    count(*) FILTER (
      WHERE
        ((tm."KorBB") :: text = 'Walk' :: text)
    ) AS total_walks_pitcher,
    count(*) FILTER (
      WHERE
        (
          (tp."PlateLocHeight" > 3.55)
          OR (tp."PlateLocHeight" < 1.77)
          OR (tp."PlateLocSide" > 0.86)
          OR (tp."PlateLocSide" < '-0.86' :: numeric)
        )
    ) AS total_out_of_zone_pitches,
    count(*) FILTER (
      WHERE
        (
          ((tm."PitchCall") :: text = 'StrikeSwinging' :: text)
          AND (tp."PlateLocHeight" < 3.55)
          AND (tp."PlateLocHeight" > 1.77)
          AND (tp."PlateLocSide" < 0.86)
          AND (tp."PlateLocSide" > '-0.86' :: numeric)
        )
    ) AS misses_in_zone,
    count(*) FILTER (
      WHERE
        (
          ((tm."PitchCall") :: text = 'StrikeSwinging' :: text)
          OR (
            (tm."PitchCall") :: text = 'FoulBallNotFieldable' :: text
          )
          OR (
            ((tm."PitchCall") :: text = 'InPlay' :: text)
            AND (tp."PlateLocHeight" < 3.55)
            AND (tp."PlateLocHeight" > 1.77)
            AND (tp."PlateLocSide" < 0.86)
            AND (tp."PlateLocSide" > '-0.86' :: numeric)
          )
        )
    ) AS swings_in_zone,
    count(*) FILTER (
      WHERE
        (
          ((tm."PitchCall") :: text = 'StrikeSwinging' :: text)
          OR (
            (
              (tm."PitchCall") :: text = 'FoulBallNotFieldable' :: text
            )
            AND (tp."PlateLocHeight" > 3.55)
            AND (tp."PlateLocHeight" < 1.77)
            AND (tp."PlateLocSide" > 0.86)
            AND (tp."PlateLocSide" < '-0.86' :: numeric)
          )
        )
    ) AS total_num_chases,
    count(*) AS pitches,
    count(DISTINCT tm."GameUID") AS games,
    count(*) FILTER (
      WHERE
        (
          (tm."Inning" = 1)
          AND (tm."Outs" = 0)
          AND (tm."Balls" = 0)
          AND (tm."Strikes" = 0)
          AND (tp."PAofInning" = 1)
        )
    ) AS games_started,
    round(
      (
        (
          (
            (
              count(*) FILTER (
                WHERE
                  ((tm."KorBB") :: text = 'StrikeOut' :: text)
              ) + sum((tm."OutsOnPlay") :: integer)
            ) / 3
          )
        ) :: numeric + (
          (
            (
              (
                count(*) FILTER (
                  WHERE
                    ((tm."KorBB") :: text = 'StrikeOut' :: text)
                ) + sum((tm."OutsOnPlay") :: integer)
              ) % (3) :: bigint
            )
          ) :: numeric / (10) :: numeric
        )
      ),
      1
    ) AS total_innings_pitched,
    count(
      DISTINCT ROW(
        tp."PAofInning",
        tm."Inning",
        tb."Batter",
        tm."GameUID"
      )
    ) AS total_batters_faced
  FROM
    trackman_metadata tm,
    trackman_pitcher tp,
    trackman_batter tb,
    seasons s
  WHERE
    (
      (tm."PitchUID" = tp."PitchUID")
      AND (tm."PitchUID" = tb."PitchUID")
      AND ((s."SeasonTitle") :: text = '2024' :: text)
      AND (tm."UTCDate" >= s."StartDate")
      AND (tm."UTCDate" <= s."EndDate")
    )
  GROUP BY
    tp."Pitcher",
    tp."PitcherTeam"
)
SELECT
  "Pitcher",
  "PitcherTeam",
  total_strikeouts_pitcher,
  total_walks_pitcher,
  total_out_of_zone_pitches,
  misses_in_zone,
  swings_in_zone,
  total_num_chases,
  pitches,
  games,
  games_started,
  total_innings_pitched,
  total_batters_faced
FROM
  pitcher_stats_subquery;