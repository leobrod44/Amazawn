package com.backend.Processors;

import com.backend.Entities.Center;
import com.backend.Entities.Shipment;
import com.backend.Entities.Structures.Location;
import com.backend.Entities.Transport;
import com.backend.Helpers.LogisticsCalculator;
import com.backend.Repositories.CenterRepository;
import com.backend.Repositories.TransportRepository;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

public class Orchestrator
{
    private ExecutorService executorService;
    private TransportRepository transportRepository;
    private CenterRepository centerRepository;
    public Orchestrator(CenterRepository centerRepository, TransportRepository transportRepository)
    {

        this.centerRepository = centerRepository;
        this .transportRepository = transportRepository;
        executorService = Executors.newFixedThreadPool(4);
    }

    public List<Location> RequestPath(Shipment shipment)
    {
        try{
            Future<List<Location>> path = executorService.submit(new Request(shipment, centerRepository, transportRepository));
            return path.get();

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace(); // You might want to log the exception or handle it appropriately.
            return new ArrayList<>();
        }

    }

    public void Kill()
    {
        //Release threads
        executorService.shutdown();
    }
    class Request implements Callable<List<Location>>
    {
        private CenterRepository centerRepository;
        private TransportRepository transportRepository;
        private Shipment shipment;
        public Request(Shipment shipment, CenterRepository repository, TransportRepository transportRepository)
        {
            this.centerRepository=repository;
            this.shipment=shipment;
            this.transportRepository = transportRepository;
        }
        @Override
        public List<Location> call() throws Exception
        {
            // Get nearest centers
            Center originCenter = centerRepository.findNearestCenter(shipment.getOriginLongitude(),shipment.getOriginLatitude());
            Center destinationCenter = centerRepository.findNearestCenter(shipment.getDestinationLongitude(),shipment.getDestinationLatitude());

            // Set path
            Location origin = new Location("origin", shipment.getOriginLongitude(),shipment.getOriginLatitude());
            Location center1Loc = new Location("center:origin", originCenter.getLongitude(),originCenter.getLatitude());
            Location center2Loc = new Location("center:origin", destinationCenter.getLongitude(),destinationCenter.getLatitude());
            Location destination = new Location("destination", shipment.getDestinationLongitude(),shipment.getDestinationLatitude());
            List<Location> path = new ArrayList<>(){{
                add(origin);
                add(center1Loc);
                add(center2Loc);
                add(destination);
            }};
            shipment.setPath(path);
            double d1 = LogisticsCalculator.calculateDistance(origin,center1Loc);

            //Assign transport
            LocalTime currentTime = LocalTime.now();
            int secondsToAdd = (int) LogisticsCalculator.groundDistanceToTime(d1);
            LocalTime newTime = currentTime.plusSeconds(secondsToAdd);
            Time time = Time.valueOf(newTime);
            Transport t = transportRepository.findAvailableTransport(time);
            if (t==null)
            {
                t = transportRepository.getNextAvailableTransport();
            }
            shipment.setTransport(t.getId());
            return path;
        }

    }

}

