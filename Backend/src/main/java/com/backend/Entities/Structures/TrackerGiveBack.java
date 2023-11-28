package com.backend.Entities.Structures;

import java.util.Date;
import java.util.UUID;

public class TrackerGiveBack {

    public int progress;

    public Date ETA;

    public Date lastMilestoneDate;

    public TrackerGiveBack() {}

    public TrackerGiveBack(int progress, Date ETA, Date lastMilestoneDate) {
        this.progress = progress;
        this.ETA = ETA;
        this.lastMilestoneDate = lastMilestoneDate;
    }
}
