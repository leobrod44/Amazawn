package com.backend.Entities;

import com.backend.Entities.Structures.PackageInfo;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table
public class Quota
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column
    private Date invoiceDate;
    @Column
    private Date departureDate;

    @Column
    private Date estimatedArrivalDate;

    @Column
    private String shipmentMethod;

    public Quota(Date invoiceDate, Date departureDate, Date estimatedArrivalDate, String shipmentMethod)
    {
        this.invoiceDate = invoiceDate;
        this.departureDate = departureDate;
        this.estimatedArrivalDate = estimatedArrivalDate;
        this.shipmentMethod = shipmentMethod;
    }
    public Quota(){};

    public UUID getId()
    {
        return id;
    }

    public Date getDepartureDate() {
        return departureDate;
    }
}
