package com.backend.Controllers;

import com.backend.Entities.Center;
import com.backend.Entities.Shipment;
import com.backend.Entities.Structures.Quota;
import com.backend.Processors.Orchestrator;
import com.backend.Repositories.CenterRepository;
import com.backend.Services.CenterService;
import com.backend.Services.ShipmentService;
import com.backend.Services.TransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/logistics")
public class LogisticsController
{
    @Autowired
    private CenterService centerService;
    @Autowired
    private ShipmentService shipmentService;

    @PostMapping("/addCenter")
    public Center addCenter(@RequestBody Center center) {
        return centerService.createCenter(center);
    }


    @GetMapping("/getAllCenters")
    public List<Center> getAllCenters() {
        return centerService.getAllCenters();
    }

    @GetMapping("/requestQuota")
    public Quota requestQuota(@RequestBody Shipment shipment){
        return shipmentService.requestQuota(shipment);
    }

}
