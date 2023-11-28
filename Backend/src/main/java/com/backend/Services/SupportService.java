package com.backend.Services;

import com.backend.Entities.Review;
import com.backend.Entities.Ticket;
import com.backend.Repositories.ReviewRepository;
import com.backend.Repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@Service
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class SupportService
{
    @Autowired
    public ReviewRepository reviewRepository;

    @Autowired
    public TicketRepository ticketRepository;

    public void saveReview(Review review){
        reviewRepository.save(review);
    }

    public void saveTicket(Ticket ticket) { ticketRepository.save(ticket); }
}
