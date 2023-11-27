package com.backend.Services;


import com.backend.Entities.Package;
import com.backend.Entities.Structures.*;
import com.backend.Entities.*;
import com.backend.Processors.Orchestrator;
import com.backend.Processors.Tracker;
import com.backend.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class LogisticsService
{
    @Autowired
    public ShipmentRepository shipmentRepository;

    @Autowired
    public QuotaRepository quotaRepository;

    @Autowired
    public PackageRepository packageRepository;

    @Autowired
    public CenterRepository centerRepository;

    public Package createPackage(PackageInfo packageInfo, UUID quotaId, UUID shipmentId)
    {
        Package pkg = new Package(packageInfo.Weight, packageInfo.Length,packageInfo.Width, packageInfo.Height, packageInfo.Description,quotaId,shipmentId);
        packageRepository.save(pkg);
        return pkg;
    }
    public Quota createQuota(QuotaInfo qi)
    {
        Quota quota = new Quota(qi.invoiceDate,qi.departureDate,qi.estimatedArrivalDate,qi.shipmentMethod);
        quotaRepository.save(quota);
        return quota;
    }

    public void createShipment(Shipment shipment, User sender, User receiver)
    {
        shipment.setSenderMail(sender.getEmail());
        shipment.setReceiverMail(receiver.getEmail());
        shipmentRepository.save(shipment);
    }

    public QuotaInfo getQuota(ShipmentRequest shipmentRequest){
        QuotaInfo qi = Orchestrator.getQuota(shipmentRequest, centerRepository);
        return qi;
    }

    public UUID getShipment() {
        List<Shipment> s = shipmentRepository.findAll();
        return s.get(6).getId();
        //currently set on index 6, that was the latest created shipment (used for testing)
    }

    public TrackerGiveBack startTracker (TrackingInfo t) {
        Shipment s = shipmentRepository.findById(t.shipmentID).orElse(null);

        Tracker tracker = new Tracker(s, t.currentDate, quotaRepository);

        TrackerGiveBack ttt = new TrackerGiveBack(tracker.calculateProgressNumber(), tracker.getEstimatedArrivalDate(), tracker.lastMilestone());

        return ttt;
    }

}
