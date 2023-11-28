package com.backend.Entities;

import com.backend.Entities.Structures.StarRating;
import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table
public class Review
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column
    private StarRating deliveryRating;

    @Column
    private StarRating dropOffRating;

    @Column
    private StarRating trackingRating;

    @Column
    private StarRating supportRating;

    @Column
    private String comment;

    public Review(StarRating deliveryRating, StarRating dropOffRating, StarRating trackingRating, StarRating supportRating, String comment)
    {
        this.deliveryRating = deliveryRating;
        this.dropOffRating = dropOffRating;
        this.trackingRating = trackingRating;
        this.supportRating = supportRating;
        this.comment = comment;
    }
    public Review(){};


}
