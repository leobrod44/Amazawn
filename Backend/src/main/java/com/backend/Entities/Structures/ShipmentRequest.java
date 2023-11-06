package com.backend.Entities.Structures;

import jakarta.persistence.Column;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ShipmentRequest
{
    public String SenderFirstName;
    public String SenderLastName;
    public String SenderEmail;

    public String ReceiverFirstName;
    public String ReceiverLastName;
    public String ReceiverEmail;

    public Location SenderLocation;
    public Location ReceiverLocation;

    public List<PackageInfo> requestedPackages;

    public List<Location> path = new ArrayList<Location>();



}
