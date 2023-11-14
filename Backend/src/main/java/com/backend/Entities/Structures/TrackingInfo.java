package com.backend.Entities.Structures;

import java.util.Date;
import java.util.UUID;

public class TrackingInfo {

    public UUID shipmentID;

    public Date currentDate;

    public TrackingInfo() {}

    public TrackingInfo(UUID shipmentID, Date currentDate) {
        this.shipmentID = shipmentID;
        this.currentDate = currentDate;
    }
}
