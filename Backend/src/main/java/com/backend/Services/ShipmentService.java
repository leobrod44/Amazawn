package com.backend.Services;

import com.backend.Entities.Center;
import com.backend.Entities.Shipment;
import com.backend.Entities.Structures.Location;
import com.backend.Entities.Structures.Quota;
import com.backend.Helpers.LogisticsCalculator;
import com.backend.Processors.Orchestrator;
import com.backend.Repositories.ShipmentRepository;
import com.backend.Repositories.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Service
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ShipmentService
{
    @Autowired
    public ShipmentRepository shipmentRepository;

    @Autowired
    public TransportRepository transportRepository;

    private Orchestrator o;

    public Quota requestQuota(Shipment shipment) {

        List<Location> path = o.RequestPath(shipment);
        //calculate fees
        LogisticsCalculator.generateQuota(shipment);
        return null;
    }

}
