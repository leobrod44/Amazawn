package com.backend.Helpers;

import com.backend.Entities.Structures.Location;

public class MathHelper
{
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
}
