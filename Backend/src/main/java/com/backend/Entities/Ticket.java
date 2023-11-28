package com.backend.Entities;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table
public class Ticket
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String message;

    public Ticket() { /*Default constructor*/ }

    public Ticket(String name, String email, String latitude) {

        this.name = name;
        this.email = email;
        this.message = latitude;
    }

    // Getters
    public UUID getId() { return id; }

    public String getName() { return name; }

    public String getEmail() { return email; }

    public String getMessage() { return message; }

}
