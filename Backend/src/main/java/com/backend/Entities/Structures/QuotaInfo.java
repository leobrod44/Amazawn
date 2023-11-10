package com.backend.Entities.Structures;

import com.backend.Entities.User;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class QuotaInfo
{

    public User sender;

    public User receiver;

    public Date invoiceDate;

    public Date departureDate;

    public Date estimatedArrivalDate;

    public String shipmentMethod;

    public List<PackageInfo> requestedPackages;

    public double totalDistance;

    public double distancePricing;

    public double volumePricing;

    public double weightPricing;
    public double flatRate;

    public double taxes;

    public double total;

    public List<Location> path = new ArrayList<Location>();


    public QuotaInfo(){};

    public QuotaInfo(User sender, User receiver, Date invoiceDate, Date departureDate, Date estimatedArrivalDate, String shipmentMethod, List<PackageInfo> requestedPackages, double totalDistance, double distancePricing, double volumePricing, double weightPricing, double flatRate, double taxes, double total, List<Location> path)
    {
        this.sender = sender;
        this.receiver = receiver;
        this.invoiceDate = invoiceDate;
        this.departureDate = departureDate;
        this.estimatedArrivalDate = estimatedArrivalDate;
        this.shipmentMethod = shipmentMethod;
        this.requestedPackages = requestedPackages;
        this.totalDistance = totalDistance;
        this.distancePricing = distancePricing;
        this.weightPricing = weightPricing;
        this.volumePricing = volumePricing;
        this.flatRate = flatRate;
        this.taxes = taxes;
        this.total = total;
        this.path = path;
    }
}

