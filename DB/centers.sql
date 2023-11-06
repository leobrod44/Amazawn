
-- 40.7128 -74.006
SELECT c.* FROM Center c ORDER BY SQRT(POWER((c.latitude - 40.7128), 2) + POWER((c.longitude - -74.006), 2)) asc Limit 1


SELECT * from center c where c.id="f817d8d7-38cf-458b-8368-d22d1af19616"