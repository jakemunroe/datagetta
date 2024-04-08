SELECT
  "Pitcher",
  "PitcherTeam",
  "PitcherThrows",
  CASE
    WHEN (
      (("TaggedPitchType") :: text = 'Fastball' :: text)
      AND (("AutoPitchType") :: text <> 'Four-Seam' :: text)
    ) THEN 'Sinker' :: character varying
    WHEN (("AutoPitchType") :: text = 'Four-Seam' :: text) THEN 'Fastball' :: character varying
    ELSE "AutoPitchType"
  END AS "PitchType",
  avg("RelSpeed") FILTER (
    WHERE
      ("RelSpeed" <> 'NaN' :: numeric)
  ) AS avg_rel_speed,
  avg("InducedVert") FILTER (
    WHERE
      ("InducedVert" <> 'NaN' :: numeric)
  ) AS avg_induced_vert,
  avg("HorzBreak") FILTER (
    WHERE
      ("HorzBreak" <> 'NaN' :: numeric)
  ) AS avg_horz_break,
  avg("RelHeight") FILTER (
    WHERE
      ("RelHeight" <> 'NaN' :: numeric)
  ) AS avg_rel_height,
  avg("RelSide") FILTER (
    WHERE
      ("RelSide" <> 'NaN' :: numeric)
  ) AS avg_rel_side,
  avg("Extension") FILTER (
    WHERE
      ("Extension" <> 'NaN' :: numeric)
  ) AS avg_extension,
  avg("SpinRate") FILTER (
    WHERE
      ("SpinRate" <> 'NaN' :: numeric)
  ) AS avg_spin_rate,
  avg("SpinAxis") FILTER (
    WHERE
      ("SpinAxis" <> 'NaN' :: numeric)
  ) AS avg_spin_axis,
  avg("VertApprAngle") FILTER (
    WHERE
      ("VertApprAngle" <> 'NaN' :: numeric)
  ) AS avg_vert_appr_angle,
  avg("HorzApprAngle") FILTER (
    WHERE
      ("HorzApprAngle" <> 'NaN' :: numeric)
  ) AS avg_horz_appr_angle
FROM
  trackman_pitcher
WHERE
  (("AutoPitchType") :: text <> '' :: text)
GROUP BY
  "Pitcher",
  "PitcherTeam",
  "PitcherThrows",
  CASE
    WHEN (
      (("TaggedPitchType") :: text = 'Fastball' :: text)
      AND (("AutoPitchType") :: text <> 'Four-Seam' :: text)
    ) THEN 'Sinker' :: character varying
    WHEN (("AutoPitchType") :: text = 'Four-Seam' :: text) THEN 'Fastball' :: character varying
    ELSE "AutoPitchType"
  END;