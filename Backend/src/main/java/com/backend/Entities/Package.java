package com.backend.Entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table
public class Package
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column
    private double weight;
    @Column
    private double length;
    @Column
    private double width;
    @Column
    private double height;

    @Column
    private String description;
    @Column
    private UUID quota;

    @Column
    private UUID shipment;

    public Package()
    {
    }

    public Package(double weight, double length, double width, double height, String description, UUID quota, UUID shipment)
    {
        this.weight = weight;
        this.length = length;
        this.width = width;
        this.height = height;
        this.quota = quota;
        this.shipment= shipment;
        this.description = description;
    }

    public UUID getId()
    {
        return id;
    }
}
