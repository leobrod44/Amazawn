package com.backend.Services;

import com.backend.Entities.Center;
import com.backend.Entities.Structures.Location;
import com.backend.Repositories.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@Service
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ShipmentService
{
    @Autowired
    public ShipmentRepository shipmentRepository;


//    public Center calculatePath(Location location) {
//        return orchestrator.RequestPath(location);
//    }

}
