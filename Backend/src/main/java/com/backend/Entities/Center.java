package com.backend.Entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table
public class Center
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String city;

    @Column
    private double longitude;

    @Column
    private double latitude;


    public void setCity(String city)
    {
        this.city = city;
    }

    public double getLongitude()
    {
        return longitude;
    }

    public void setLongitude(double longitude)
    {
        this.longitude = longitude;
    }

    public double getLatitude()
    {
        return latitude;
    }

    public void setLatitude(double latitude)
    {
        this.latitude = latitude;
    }


    public Center() {
        // Default constructor
    }

    public Center(String city, double longitude, double latitude) {

        this.city = city;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    // Getters and setters

    public UUID getId() {
        return id;
    }

    public String getCity() {
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
                ", city='" + city + '\'' +
                ", latitude=" + latitude + '\'' +
                ", longitude=" + longitude + '\''+
                '}';
    }
}
