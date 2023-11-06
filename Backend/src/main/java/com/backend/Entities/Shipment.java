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
    private UUID quota;
    @Column(columnDefinition = "jsonb")
    @ElementCollection
    private List<String> path = new ArrayList<String>();

    public Shipment()
    {
    }

    public Shipment(UUID quota, List<String> path)
    {
        this.quota = quota;
        this.path = path;
    }

    public List<Location> getPath()
    {
        return ListHelper.stringsToLocations(path);
    }

    public Location getOrigin()
    {
        return ListHelper.stringsToLocations(path).get(0);
    }
    public Location getDestination(){
        return ListHelper.stringsToLocations(path).get(3);
    }

    public UUID getId()
    {
        return id;
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

    public UUID getOriginCenter()
    {
        return UUID.fromString(ListHelper.stringsToLocations(path).get(1).getName());

    }

    public UUID getDestinationCenter()
    {
        return UUID.fromString(ListHelper.stringsToLocations(path).get(2).getName());
    }

    public UUID getQuota()
    {
        return quota;
    }

    public void setQuota(UUID quota)
    {
        this.quota = quota;
    }

    public void setPath(List<String> path)
    {
        this.path = path;
    }
}
