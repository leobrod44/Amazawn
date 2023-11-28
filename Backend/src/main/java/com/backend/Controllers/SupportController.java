package com.backend.Controllers;

import com.backend.Entities.Ticket;
import com.backend.Entities.Review;
import com.backend.Services.SupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/support")
public class SupportController
{
    @Autowired
    private SupportService supportService;

    @PostMapping("/addReview")
    public boolean addReview(@RequestBody Review review)
    {
        try
        {
            supportService.saveReview(review);
        } catch (Exception e)
        {
            return false;
        }
        return true;
    }

    @PostMapping("/customersupport")
    public boolean customerSupport(@RequestBody Ticket ticket)
    {
        try
        {
            supportService.saveTicket(ticket);
        } catch (Exception e)
        {
            return false;
        }
        return true;
    }
}
