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

    //private int currentStatus;

    private double totalDistance;

    private Date estimatedArrivalDate;

    private Date progressDate;

    //private Date lastMilestone;

    public Tracker(Shipment shipment, Date currentDate, QuotaRepository qr) {
        this.shipment = shipment;

        UUID qID = shipment.getQuota();
        Quota q = qr.findById(qID).orElse(null);

        //get start date from quota
        this.startDate = q.getDepartureDate();

        this.currentDate = currentDate;

        //this.currentStatus = 1;
        List<Location> x = shipment.getPathAsList();
        this.totalDistance = calculateTotalDistance(shipment.getPathAsList());

        //or do I get this in the repository instead??
        this.estimatedArrivalDate = FeeCalculator.estimatedArrivalDate(totalDistance);

        this.progressDate = startDate;

        //this.lastMilestone = startDate;
    }

    public double calculateTotalDistance(List<Location> locations) {
        return MathHelper.calculateDistance(locations.get(0), locations.get(1)) * 2 +
                MathHelper.calculateDistance(locations.get(1), locations.get(2)) +
                MathHelper.calculateDistance(locations.get(2), locations.get(3));
    }

//    public void calculateProgressDate() {
//        //progress = current exact date - startdate
//        long differenceInMillis = currentDate.getTime() - startDate.getTime();
//
//        progressDate = new Date(differenceInMillis);
//    }

    public double getProgressFraction() {
        long progressDifferenceInMillis = currentDate.getTime();
        long estimateArrivalDateDifferenceInMillis = estimatedArrivalDate.getTime();

        // Calculate the progress fraction
        return (double) (estimateArrivalDateDifferenceInMillis - progressDifferenceInMillis) / estimateArrivalDateDifferenceInMillis;
    }

    public int calculateProgressNumber() {
        //calculateProgressDate();

        // Categorize based on the progress fraction
        if (getProgressFraction() < MathHelper.calculateDistance(shipment.getPathAsList().get(0), shipment.getPathAsList().get(1)) / totalDistance) {
            return 1;
        } else if (getProgressFraction() < MathHelper.calculateDistance(shipment.getPathAsList().get(0), shipment.getPathAsList().get(1)) * 2 / totalDistance) {
            return 2;
        } else if (getProgressFraction() < MathHelper.calculateDistance(shipment.getPathAsList().get(1), shipment.getPathAsList().get(2)) / totalDistance) {
            return 3;
        } else if (getProgressFraction() < MathHelper.calculateDistance(shipment.getPathAsList().get(2), shipment.getPathAsList().get(3)) / totalDistance) {
            return 4;
        } else {
            return 5;
        }
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


