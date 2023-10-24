package com.backend.Entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table
public class Shipment
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private UUID sender;

    @Column
    private UUID receiver;


}
