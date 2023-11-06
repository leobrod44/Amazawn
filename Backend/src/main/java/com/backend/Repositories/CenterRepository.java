package com.backend.Repositories;

import com.backend.Entities.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CenterRepository extends JpaRepository<Center, UUID>
{
    @Query("SELECT c FROM Center c ORDER BY SQRT(POWER((c.latitude - :latitude), 2) + POWER((c.longitude - :longitude), 2)) asc Limit 1")
    Center findNearestCenter(@Param("longitude") double longitude,@Param("latitude") double latitude);

}
