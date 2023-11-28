package com.backend.Entities.Structures;

import java.util.Date;

public class TrackingData
{

    public int progress;

    public Date ETA;

    public Date lastMilestoneDate;

    public TrackingData() {}

    public TrackingData(int progress, Date ETA, Date lastMilestoneDate) {
        this.progress = progress;
        this.ETA = ETA;
        this.lastMilestoneDate = lastMilestoneDate;
    }
}
