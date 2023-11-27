package com.backend.Processors;

import com.backend.Entities.Quota;
import com.backend.Entities.Shipment;
import com.backend.Entities.Structures.Location;
import com.backend.Helpers.MathHelper;
import com.backend.Repositories.QuotaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.util.UUID;

public class Tracker {

    private Shipment shipment;

    private Date startDate;

    private Date currentDate;

    private double totalDistance;

    private Date estimatedArrivalDate;

    private Date progressDate;

    public Tracker(Shipment shipment, Date currentDate, QuotaRepository qr) {
        this.shipment = shipment;

        UUID qID = shipment.getQuota();
        Quota q = qr.findById(qID).orElse(null);

        this.startDate = q.getDepartureDate();

        this.currentDate = currentDate;

        List<Location> x = shipment.getPathAsList();
        this.totalDistance = calculateTotalDistance(shipment.getPathAsList());

        this.estimatedArrivalDate = FeeCalculator.estimatedArrivalDate(totalDistance);

        this.progressDate = startDate;

    }

    public double calculateTotalDistance(List<Location> locations) {
        return MathHelper.calculateDistance(locations.get(0), locations.get(1)) * 2 +
                MathHelper.calculateDistance(locations.get(1), locations.get(2)) +
                MathHelper.calculateDistance(locations.get(2), locations.get(3));
    }

    public double getProgressFraction() {
        long totalDuration = estimatedArrivalDate.getTime() - startDate.getTime();
        long elapsedDuration = currentDate.getTime() - startDate.getTime();

        return (double) elapsedDuration / totalDuration;
    }

    public int calculateProgressNumber() {
        if (getProgressFraction() < (MathHelper.calculateDistance(shipment.getPathAsList().get(0), shipment.getPathAsList().get(1)) / totalDistance)) {
            return 1; //on the way to pick up package
        } else if (getProgressFraction() < ((MathHelper.calculateDistance(shipment.getPathAsList().get(0), shipment.getPathAsList().get(1)) * 2) / totalDistance)) {
            return 2; //on the way to center1
        } else if (getProgressFraction() < ((MathHelper.calculateDistance(shipment.getPathAsList().get(1), shipment.getPathAsList().get(2))
                + MathHelper.calculateDistance(shipment.getPathAsList().get(0), shipment.getPathAsList().get(1)) * 2)
                / totalDistance)) {
            return 3; //on the way to center2
        } else if (getProgressFraction() < ((MathHelper.calculateDistance(shipment.getPathAsList().get(2), shipment.getPathAsList().get(3))
                + MathHelper.calculateDistance(shipment.getPathAsList().get(1), shipment.getPathAsList().get(2))
                + MathHelper.calculateDistance(shipment.getPathAsList().get(0), shipment.getPathAsList().get(1)) * 2) / totalDistance)) {
            return 4; //on the way to destination
        } else {return 5;} //arrived
    }

    public Date lastMilestone() {
        Date estimatedPickupTime = FeeCalculator.estimatedArrivalDate(MathHelper.calculateDistance(shipment.getPathAsList().get(0), shipment.getPathAsList().get(1)));
        Date estimatedCenter1Time = FeeCalculator.estimatedArrivalDate(MathHelper.calculateDistance(shipment.getPathAsList().get(0), shipment.getPathAsList().get(1)) * 2);
        Date estimatedCenter2Time = FeeCalculator.estimatedArrivalDate(MathHelper.calculateDistance(shipment.getPathAsList().get(0), shipment.getPathAsList().get(1)) * 2 +
                MathHelper.calculateDistance(shipment.getPathAsList().get(1), shipment.getPathAsList().get(2)));

        if (progressDate.getTime() > estimatedCenter2Time.getTime())
            return new Date(progressDate.getTime() - estimatedCenter2Time.getTime());
        else if (progressDate.getTime() > estimatedCenter1Time.getTime())
            new Date(progressDate.getTime() - estimatedCenter1Time.getTime());
        else if (progressDate.getTime() > estimatedPickupTime.getTime())
            return new Date(progressDate.getTime() - estimatedPickupTime.getTime());
        else
            return startDate;

        return estimatedPickupTime;
    }

    public Date getEstimatedArrivalDate() {
        return estimatedArrivalDate;
    }
}


