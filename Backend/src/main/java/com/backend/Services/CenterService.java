package com.backend.Services;

import com.backend.Entities.Center;
import com.backend.Entities.Structures.Location;
import com.backend.Processors.Orchestrator;
import com.backend.Repositories.CenterRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.List;
import java.util.UUID;


@Service
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CenterService
{
    @Autowired
    public CenterRepository centerRepository;

    @Autowired
    public CenterService(CenterRepository centerRepository) {
        this.centerRepository = centerRepository;
    }

    public List<Center> getAllCenters() {
        return centerRepository.findAll();
    }

    public Center getCenterById(UUID id) {
        return centerRepository.findById(id).orElse(null);
    }

    public Center createCenter(Center center) {
        return centerRepository.save(center);
    }
    public Center updateCenter(UUID id, Center updatedCenter) {
        if (centerRepository.existsById(id)) {
            return centerRepository.save(updatedCenter);
        }
        return null;
    }
    public CenterRepository getCenterRepository() {
        return centerRepository;
    }
    public void deleteCenter(UUID id) {
        centerRepository.deleteById(id);
    }
}
