package com.backend.Processors;

import com.backend.Entities.Center;
import com.backend.Entities.Shipment;
import com.backend.Entities.Structures.Location;
import com.backend.Entities.Structures.PackageInfo;
import com.backend.Entities.Structures.QuotaInfo;
import com.backend.Entities.Structures.ShipmentRequest;
import com.backend.Entities.User;
import com.backend.Helpers.MathHelper;
import com.backend.Repositories.CenterRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Orchestrator
{
    private CenterRepository centerRepository;
    public Orchestrator(CenterRepository centerRepository)
    {
        this.centerRepository=centerRepository;
    }
    public List<Location> RequestPath(ShipmentRequest shipment)
    {
        Center originCenter = this.centerRepository.findNearestCenter(shipment.SenderLocation.getLongitude(),shipment.SenderLocation.getLatitude());
        Center destinationCenter = this.centerRepository.findNearestCenter(shipment.ReceiverLocation.getLongitude(),shipment.ReceiverLocation.getLatitude());

        // Set path
        Location origin = new Location("origin", shipment.SenderLocation.getLongitude(),shipment.SenderLocation.getLatitude());
        Location center1Loc = new Location(originCenter.getId().toString(), originCenter.getLongitude(),originCenter.getLatitude());
        Location center2Loc = new Location(destinationCenter.getId().toString(), destinationCenter.getLongitude(),destinationCenter.getLatitude());
        Location destination = new Location("destination", shipment.ReceiverLocation.getLongitude(),shipment.ReceiverLocation.getLatitude());
        ArrayList<Location> path = new ArrayList<>(){{
            add(origin);
            add(center1Loc);
            add(center2Loc);
            add(destination);
        }};
        shipment.path = path;
        return path;
    }
    public QuotaInfo getQuota(ShipmentRequest request){
        List<Location> path = RequestPath(request);
        double totalDistance = FeeCalculator.totalDistance(path);

        User sender = new User(request.SenderFirstName, request.SenderLastName, request.SenderEmail);
        User receiver = new User(request.ReceiverFirstName, request.ReceiverLastName, request.ReceiverEmail);
        Date invoiceDate = FeeCalculator.currentDate();
        Date departureDate = FeeCalculator.departureDate();
        Date estimatedArrivalDate = FeeCalculator.estimatedArrivalDate(totalDistance);
        String shipmentMethod = "Truck";
        double distancePricing = FeeCalculator.distancePricing(totalDistance);
        double volumePricing = FeeCalculator.volumePricing(request.requestedPackages);
        double flatRate = FeeCalculator.FLAT_RATE;
        double taxes = FeeCalculator.taxesPricing(FeeCalculator.subTotal(distancePricing, volumePricing));
        double total = distancePricing+ volumePricing + flatRate + taxes;
        QuotaInfo quotaInfo = new QuotaInfo(
                sender,
                receiver,
                invoiceDate,
                departureDate,
                estimatedArrivalDate,
                shipmentMethod,
                request.requestedPackages,
                totalDistance,
                distancePricing,
                volumePricing,
                flatRate,
                taxes,
                total,
                path
        );
        return quotaInfo;

    }


}

