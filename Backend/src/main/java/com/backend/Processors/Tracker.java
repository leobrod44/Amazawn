package com.backend.Processors;

import com.backend.Entities.Shipment;
import com.backend.Entities.Structures.Location;

import java.util.List;
import java.util.UUID;

public class Tracker {
    private int currentStatus;
    private UUID shipmentID;
    private double totalDistance;

    public Tracker(UUID id, List<Location> location) {
        this.shipmentID = id;
        this.currentStatus = 1;
        this.totalDistance = calculateTotalDistance(location);
    }

    public double calculateTotalDistance(List<Location> location) {
        //using locations get total
        return 0;
    }

    //CREATE A RANDOM NUMBER BETWEEN LONGITUDE AND LATITUDe for the shipments current location

    //use that number to divide by total location
}
