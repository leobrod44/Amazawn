package com.backend.Entities;

import com.backend.Entities.Structures.Location;
import jakarta.persistence.*;
import com.backend.Helpers.ListHelper;

import java.util.ArrayList;
import java.util.UUID;
import java.util.List;

@Entity
@Table
public class Shipment
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column
    private UUID sender;
    @Column
    private UUID receiver;
    @Column
    private UUID transport;
    @Column
    private UUID packageObj;
    @Column
    private double originLatitude;
    @Column
    private double originLongitude;
    @Column
    private double destinationLatitude;
    @Column
    private double destinationLongitude;

    @Column(columnDefinition = "jsonb")
    @ElementCollection
    private List<String> path;

    public Shipment()
    {
    }
    public Shipment(UUID sender, UUID receiver, UUID packageObj, double originLatitude, double originLongitude, double destinationLatitude, double destinationLongitude)
    {
        this.sender = sender;
        this.receiver = receiver;
        this.packageObj = packageObj;
        this.originLatitude = originLatitude;
        this.originLongitude = originLongitude;
        this.destinationLatitude = destinationLatitude;
        this.destinationLongitude = destinationLongitude;
        //transport and path are set after calulations
    }

    public double getOriginLatitude()
    {
        return originLatitude;
    }

    public void setOriginLatitude(double originLatitude)
    {
        this.originLatitude = originLatitude;
    }

    public double getOriginLongitude()
    {
        return originLongitude;
    }

    public void setOriginLongitude(double originLongitude)
    {
        this.originLongitude = originLongitude;
    }

    public double getDestinationLatitude()
    {
        return destinationLatitude;
    }

    public void setDestinationLatitude(double destinationLatitude)
    {
        this.destinationLatitude = destinationLatitude;
    }

    public double getDestinationLongitude()
    {
        return destinationLongitude;
    }

    public void setDestinationLongitude(double destinationLongitude)
    {
        this.destinationLongitude = destinationLongitude;
    }

    public UUID getSender()
    {
        return sender;
    }

    public void setSender(UUID sender)
    {
        this.sender = sender;
    }

    public UUID getReceiver()
    {
        return receiver;
    }

    public void setReceiver(UUID receiver)
    {
        this.receiver = receiver;
    }

    public UUID getTransport()
    {
        return transport;
    }

    public void setTransport(UUID transport)
    {
        this.transport = transport;
    }

    public UUID getPackageObj()
    {
        return packageObj;
    }

    public void setPackageObj(UUID packageObj)
    {
        this.packageObj = packageObj;
    }

    public List<Location> getPath()
    {
        return ListHelper.stringsToLocations(path);
    }

    public void setPath(List<Location> path)
    {
        path = path;
    }
}
