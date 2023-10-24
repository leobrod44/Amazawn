package com.backend.Processors;

import com.backend.Entities.Center;
import com.backend.Entities.Shipment;
import com.backend.Entities.Structures.Location;
import com.backend.Helpers.MathHelper;
import com.backend.Repositories.CenterRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Orchestrator
{
    private ExecutorService executorService;
    private CenterRepository repository;
    public Orchestrator(List<JpaRepository> repository)
    {
        //Start thread pool
        this.repository= (CenterRepository) repository;
        executorService = Executors.newFixedThreadPool(4);
    }

    public void RequestPath(Shipment shipment)
    {
        executorService.submit(new Request(shipment, repository));
    }

    public void Kill()
    {
        //Release threads
        executorService.shutdown();
    }
    class Request implements Runnable
    {
        private CenterRepository centerRepository;
        private Shipment shipment;
        public Request(Shipment shipment, CenterRepository repository)
        {
            this.centerRepository=repository;
            this.shipment=shipment;
        }
        @Override
        public void run()
        {
            // Get nearest centers
            Center originCenter = centerRepository.findNearestCenter(shipment.getOriginLongitude(),shipment.getOriginLatitude());
            Center destinationCenter = centerRepository.findNearestCenter(shipment.getDestinationLongitude(),shipment.getDestinationLatitude());

            // Set path
            Location origin = new Location("origin", shipment.getOriginLongitude(),shipment.getOriginLatitude());
            Location center1Loc = new Location("center:origin", originCenter.getLongitude(),originCenter.getLatitude());
            Location center2Loc = new Location("center:origin", destinationCenter.getLongitude(),destinationCenter.getLatitude());
            Location destination = new Location("destination", shipment.getDestinationLongitude(),shipment.getDestinationLatitude());
            shipment.setPath(new ArrayList<>(){{
                add(origin);
                add(center1Loc);
                add(center2Loc);
                add(destination);
            }});
            double d1 = MathHelper.calculateDistance(origin,center1Loc);
            double d2 = MathHelper.calculateDistance(center1Loc,center2Loc);
            double d3 = MathHelper.calculateDistance(center2Loc,destination);

            //Assign transport


        }

    }

}

