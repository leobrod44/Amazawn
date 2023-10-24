package com.backend.Repositories;
import com.backend.Entities.Shipment;
import com.backend.Entities.Transport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentRepository  extends JpaRepository<Shipment, Long>
{
}
