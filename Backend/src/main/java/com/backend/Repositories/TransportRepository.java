package com.backend.Repositories;
import com.backend.Entities.Center;
import com.backend.Entities.Transport;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.List;
import java.util.UUID;


@Repository
public interface TransportRepository extends JpaRepository<Transport, UUID>
{
    @Query("select max(t.currentLoad) from Transport t where (t.departureTime>:time) and (t.currentLoad<t.totalCapacity)")
    Transport findAvailableTransport(@Param("timeToPickup") Time time);

    @Query("select min(t.arrivalTime) from Transport t")
    Transport getNextAvailableTransport();
}
