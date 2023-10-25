package com.backend.Entities;

import jakarta.persistence.*;

import java.sql.Time;
import java.util.List;
import java.util.UUID;

@Entity
@Table
public class Transport
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column
    private UUID center;

    @Column
    @ElementCollection
    private List<UUID> shipment;

    @Column
    private int totalCapacity;

    @Column
    private int currentLoad;

    @Column
    private Time departureTime;

    @Column
    private Time arrivalTime;

    public UUID getId()
    {
        return id;
    }
}
