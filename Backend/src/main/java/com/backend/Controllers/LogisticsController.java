package com.backend.Controllers;

import com.backend.Entities.*;
import com.backend.Entities.Package;
import com.backend.Entities.Structures.Location;
import com.backend.Entities.Structures.QuotaInfo;
import com.backend.Entities.Structures.ShipmentRequest;
import com.backend.Helpers.ListHelper;
import com.backend.Processors.Orchestrator;
import com.backend.Repositories.CenterRepository;
import com.backend.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/logistics")
public class LogisticsController
{
    @Autowired
    private CenterService centerService;

    @Autowired
    private LogisticsService logisticsService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;


    @PostMapping("/addCenter")
    public boolean addCenter(@RequestBody Center center)
    {
        try
        {
            centerService.createCenter(center);
        } catch (Exception e)
        {
            return false;
        }
        return true;
    }
    @PostMapping("/addCenters")
    public boolean addCenters(@RequestBody List<Center> centers) {
        try {
            for (Center center : centers) {
                centerService.createCenter(center);
            }
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @GetMapping("/getAllCenters")
    public List<Center> getAllCenters() {
        return centerService.getAllCenters();
    }

    @PostMapping("/requestQuotation")
    public QuotaInfo requestQuotation(@RequestBody ShipmentRequest shipment){

        QuotaInfo qi = logisticsService.getQuota(shipment);
        return qi;
    }
    @PostMapping("/startShipment")
    public boolean acceptQuotation(@RequestBody QuotaInfo qi){
        try{
            //create quota
            Quota quota=logisticsService.createQuota(qi);

            //create shipment
            Shipment shipment = new Shipment(
                    quota.getId(),
                    ListHelper.convertLocationListToJson(qi.path)
            );

            //create packages
            qi.requestedPackages.forEach(pkg->{
                logisticsService.createPackage(pkg,quota.getId(), shipment.getId());
            });

            //save shipment
            logisticsService.createShipment(shipment, qi.sender, qi.receiver);
            System.out.println(logisticsService.shipmentRepository.findById(shipment.getId()).get().getId());
            //create users
            User sender = userService.addShipmentToUser(qi.sender, shipment.getId());
            User receiver = userService.addShipmentToUser(qi.receiver, shipment.getId());

            // Send email notification
            emailService.sendShipmentStartedEmail(shipment.getReceiverMail(), shipment.getId());
            emailService.sendShipmentStartedEmail(shipment.getSenderMail(), shipment.getId());
        }catch (Exception e){
            return false;
        }
        return true;
    }
    @PostMapping("/arrived/{uuid}")
    public void makeShipmentArrive(@PathVariable("uuid") UUID uuid) {
        Shipment s = logisticsService.shipmentRepository.findById(uuid).get();
        String sender = s.getSenderMail();
        String receiver = s.getReceiverMail();
        emailService.sendShipmentArrivedEmail(sender, uuid);
        emailService.sendShipmentArrivedEmail(receiver, uuid);
    }
}
