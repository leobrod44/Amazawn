package com.backend.Processors;

import com.backend.Entities.Structures.Location;
import com.backend.Entities.Structures.PackageInfo;
import com.backend.Helpers.MathHelper;
import java.util.Calendar;

import java.util.Date;
import java.util.List;

public class FeeCalculator
{
    public static final double DISTANCE_FACTOR = 1 ;// cad/km
    public static double VOLUME_FACTOR; // cad/cm^3

    public static double FLAT_RATE; //cad
    public static double totalDistance(List<Location> path)
    {
        double distance = 0;
        for (int i = 0; i < path.size() - 1; i++)
        {
            distance += MathHelper.calculateDistance(path.get(i), path.get(i + 1));
        }
        return distance;
    }
    public static double distancePricing(double distance)
    {
        return distance * DISTANCE_FACTOR;
    }
    public static double volumePricing( List<PackageInfo> requestedPackages)
    {
        double volume = 0;
        for (PackageInfo p : requestedPackages)
        {
            volume += p.Height * p.Width * p.Length;
        }
        return volume * VOLUME_FACTOR;
    }
    public static double subTotal(double distancePrice, double volumePrice)
    {
        return distancePrice + volumePrice + FLAT_RATE;
    }
    public static double taxesPricing(double total)
    {
        return total * 0.15;
    }
    public static Date estimatedArrivalDate(double distance)
    {
        Calendar calendar = Calendar.getInstance();

        // Add one day to the current date
        calendar.add(Calendar.DAY_OF_YEAR, 1+ (int)(distance/500));

        // Get the Date object representing tomorrow's date
        return calendar.getTime();
    }
    public static Date departureDate(){
        Calendar calendar = Calendar.getInstance();

        // Add one day to the current date
        calendar.add(Calendar.DAY_OF_YEAR, 1);

        // Get the Date object representing tomorrow's date
        return calendar.getTime();
    }
    public static Date currentDate(){
        Calendar calendar = Calendar.getInstance();

        // Add one day to the current date
        calendar.add(Calendar.DAY_OF_YEAR,0);

        // Get the Date object representing tomorrow's date
        return calendar.getTime();
    }
}
