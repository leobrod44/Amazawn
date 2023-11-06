package com.backend.Entities;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    protected UUID id;
    @Column
    protected String first_name;

    @Column
    protected String last_name;
    @Column(unique=true)

    protected String email;
    @Column
    @ElementCollection
    private List<UUID> shipments;

    public UUID getId()
    {
        return id;
    }

    public String getFirst_name()
    {
        return first_name;
    }

    public void setFirst_name(String first_name)
    {
        this.first_name = first_name;
    }

    public String getLast_name()
    {
        return last_name;
    }

    public void setLast_name(String last_name)
    {
        this.last_name = last_name;
    }

    public List<UUID> getShipments()
    {
        return shipments;
    }

    public void setShipments(List<UUID> shipments)
    {
        this.shipments = shipments;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public User(){

    }

    public User(String fname, String lname, String email)
    {
        this.first_name = fname;
        this.last_name = lname;
        this.email = email;
        this.shipments = new ArrayList<>();
    }
    public void addShipment(UUID shipment)
    {
        this.shipments.add(shipment);
    }
}
