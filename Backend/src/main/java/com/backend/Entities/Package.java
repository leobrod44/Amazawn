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
}
