package com.backend.Services;

import com.backend.Entities.Review;
import com.backend.Repositories.ReviewRepository;
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

    public void saveReview(Review review){
        reviewRepository.save(review);
    }
}
