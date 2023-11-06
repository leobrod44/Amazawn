package com.backend.Helpers;

import com.backend.Entities.Structures.Location;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ListHelper
{
    public static List<Location> stringToLocations(List<String> l){
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
    public static List<UUID> stringToUUIDList(String s){
        List<UUID> result = new ArrayList<UUID>();
        String[] uuids = s.split(",");
        for (String uuid : uuids) {
            result.add(UUID.fromString(uuid));
        }
        return result;
    }
    public static String uuidListToString(List<UUID> l){
        String result = "";
        for (UUID uuid : l) {
            result += uuid.toString() + ",";
        }
        return result.substring(0,result.length()-1);
    }
    public static String convertLocationListToJson(List<Location> list) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(list);
        } catch (JsonProcessingException e) {
            // Handle exception or log it
            e.printStackTrace();
            return null;
        }
    }
    public static List<Location> convertLocationJsonToList(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(json, new TypeReference<List<Location>>() {});
        } catch (IOException e) {
            // Handle exception or log it
            e.printStackTrace();
            return null;
        }
    }


}
