package com.backend.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendShipmentStartedEmail(String to, UUID shipmentId) {

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Shipment Started");
            message.setText("Dear customer,\n\nWe are picking up your package from the senders location with the ID:\n "
                    + shipmentId + ". \n\nIf you have any questions about your order feel free to reply to this email.\n\n" +
                    "Sincerely, \n Amazawn");

            javaMailSender.send(message);
        } catch (Exception e) {
            // Log the exception or print it to the console
            e.printStackTrace();
        }

    }

    public void sendShipmentArrivedEmail(String to, UUID shipmentId) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Package Arrived");
            message.setText("Dear customer,\n\nYour package with the ID " + shipmentId
                    + " has arrived! \n\nPlease leave a review of the service: LINK " +
                    "\n\nIf you have any questions about your order feel free to reply to this email.\n\n" +
                            "Sincerely, \nAmazawn");

            javaMailSender.send(message);
        } catch (Exception e) {
            // Log the exception or print it to the console
            e.printStackTrace();
        }
    }

}
