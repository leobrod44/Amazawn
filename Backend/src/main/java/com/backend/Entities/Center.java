package com.backend.Entities;

import jakarta.persistence.*;

@Entity
@Table
public class Center
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    public Center() {
        // Default constructor
    }

    public Center(String name, double latitude, double longitude) {
        this.city = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return city;
    }

    public void setCoordinates(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    @Override
    public String toString() {
        return "Center{" +
                "id=" + id +
                ", name='" + city + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}
