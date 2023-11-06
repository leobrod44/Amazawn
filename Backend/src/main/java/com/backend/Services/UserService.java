package com.backend.Services;



import com.backend.Entities.Structures.ShipmentRequest;
import com.backend.Entities.User;
import com.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@Service
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserService {
    @Autowired
    public UserRepository userRepository;

    public User addShipmentToUser(User user, UUID shipment)
    {
        User u = userRepository.findByEmail(user.getEmail());
        if(u== null){
            u = new User(user.getFirst_name(), user.getLast_name(),user.getEmail(),shipment);
            userRepository.save(u);
        }
        u.addShipment(shipment);
        userRepository.save(u);
        return u;
    }


}
