delete from teams t2 where t2."TeamName" in (select t."TeamName" from teams t where t."Conference" = 'NotSet');