package com.backend.Helpers;

import com.backend.Entities.Structures.Location;

import java.util.ArrayList;
import java.util.List;

public class ListHelper
{
    public static List<Location> stringsToLocations(List<String> l){
        List<Location> result = new ArrayList<Location>();
        for (String s : l) {
            String[] latlong = s.split(",");
            double latitude = Double.parseDouble(latlong[1]);
            double longitude = Double.parseDouble(latlong[2]);
            result.add(new Location(latlong[0],latitude, longitude));
        }
        return result;
    }
    public static List<String> locationsToStrings(List<Location> l){
        List<String> result = new ArrayList<String>();
        for (Location loc : l) {
            result.add(loc.getLatitude() + "," + loc.getLongitude());
        }
        return result;
    }

}
