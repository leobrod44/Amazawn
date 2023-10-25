package com.backend.Helpers;

import com.backend.Entities.Shipment;
import com.backend.Entities.Structures.Location;
import com.backend.Entities.Structures.Quota;

import java.sql.Time;
import java.time.LocalTime;

public class LogisticsCalculator
{
    private static final double WEIGHT_FACTOR = 1;
    private static final double VOLUME_FACTOR = 1;

    private static final double GROUND_TRAVEL_SPEED = 60; // (km/h)
    public static double calculateDistance(Location l1, Location l2) {
        double R = 6371;  // Earth's radius in kilometers

        // Convert latitude and longitude from degrees to radians
        double lat1Rad = Math.toRadians(l1.getLatitude());
        double lon1Rad = Math.toRadians(l1.getLongitude());
        double lat2Rad = Math.toRadians(l2.getLatitude());
        double lon2Rad = Math.toRadians(l2.getLongitude());

        // Haversine formula
        double dLat = lat2Rad - lat1Rad;
        double dLon = lon2Rad - lon1Rad;

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    public static double calculateFee(double distance, double weight, double volume) {
        return distance * (weight * WEIGHT_FACTOR + volume * VOLUME_FACTOR);
    }

    public static double groundDistanceToTime(double distance){
        return (distance / GROUND_TRAVEL_SPEED * 3600);

    }

    public static Quota generateQuota(Shipment shipment){
        return null;
    }

}
