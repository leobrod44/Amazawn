package com.backend.Entities;

import com.backend.Processors.Tracker;
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
    private String senderMail;
    @Column
    private String receiverMail;
    @Column
    private UUID quota;
    @Lob
    @Column(columnDefinition = "json")
    private String pathJson;

    public Shipment()
    {
    }

    public Shipment(UUID quota, String pathJson)
    {
        this.quota = quota;
        this.pathJson = pathJson;
        Tracker tracker = new Tracker(getId(), getPathAsList());
    }

    public List<Location> getPathAsList(){
        return ListHelper.convertLocationJsonToList(pathJson);
    }

    public UUID getId()
    {
        return id;
    }

    public String getSenderMail()
    {
        return senderMail;
    }

    public void setSenderMail(String senderMail)
    {
        this.senderMail = senderMail;
    }

    public String getReceiverMail()
    {
        return receiverMail;
    }

    public void setReceiverMail(String receiverMail)
    {
        this.receiverMail = receiverMail;
    }

    public UUID getQuota()
    {
        return quota;
    }

    public void setQuota(UUID quota)
    {
        this.quota = quota;
    }



}
