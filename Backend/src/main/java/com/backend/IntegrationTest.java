package com.backend;
import com.backend.Entities.Structures.QuotaInfo;
import com.backend.Entities.Structures.TrackingData;
import com.backend.Entities.User;
import com.backend.Repositories.ShipmentRepository;
import com.backend.Repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import com.backend.Entities.Shipment;

import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ShipmentRepository shipmentRepository;

    private String SENDER_EMAIL = "leobrod12@example.com";
    private String RECEIVER_EMAIL = "matthew.flaherty18@alumni.loyola.ca";

    @Test
    void testStartingNewShipment(){
        String response = testSystem();
        testAcceptQuotation(response);
    }

    @Test
    void testTracker() {
        String response = testSystem();
        testAcceptQuotation(response);
        testTrackShipment();
    }

    public String testSystem() {
        //test acceptQuotation
        String url = "http://localhost:" + port + "/logistics/requestQuotation";
        String body = "{\n" +
                "  \"SenderFirstName\": \"Leo\",\n" +
                "  \"SenderLastName\": \"Testeretta\",\n" +
                "  \"SenderEmail\": \""+SENDER_EMAIL+"\",\n" +
                "  \"ReceiverFirstName\": \"Matt\",\n" +
                "  \"ReceiverLastName\": \"Testerino\",\n" +
                "  \"ReceiverEmail\":\""+RECEIVER_EMAIL+"\",\n" +
                "  \"SenderLocation\": {\n" +
                "    \"name\": \"Sender Location\",\n" +
                "    \"latitude\": 43.642567,\n" +
                "    \"longitude\": -79.387054\n" +
                "  },\n" +
                "  \"ReceiverLocation\": {\n" +
                "    \"name\": \"Receiver Location\",\n" +
                "    \"latitude\": 45.508888,\n" +
                "    \"longitude\": -73.561668\n" +
                "  },\n" +
                "  \"requestedPackages\": [\n" +
                "    {\n" +
                "      \"Weight\": 2.5,\n" +
                "      \"Height\": 10,\n" +
                "      \"Width\": 8,\n" +
                "      \"Length\": 12\n" +
                "    },\n" +
                "    {\n" +
                "\n" +
                "      \"Weight\": 3.2,\n" +
                "      \"Height\": 15,\n" +
                "      \"Width\": 10,\n" +
                "      \"Length\": 20\n" +
                "    }\n" +
                "  ]\n" +
                "\n" +
                "}\n";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(body, headers);
        String response  = this.restTemplate.postForObject(url, request, String.class, headers);
        validateResponse(response, QuotaInfo.class);
        return response;

    }
    private void testAcceptQuotation(String r) {
        //delete test obj
        User sender = userRepository.findByEmail(SENDER_EMAIL).orElse(null);
        User receiver = userRepository.findByEmail(RECEIVER_EMAIL).orElse(null);
        if (sender != null)
            userRepository.deleteById(sender.getId());
        if (receiver != null)
            userRepository.deleteById(receiver.getId());

        //test acceptQuotation
        String url = "http://localhost:" + port + "/logistics/startShipment";
        String body = r;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(body, headers);
        String response  = this.restTemplate.postForObject(url, request, String.class, headers);
        validateResponse(response, boolean.class);
        if (response.equals("false")){
            throw new RuntimeException("Error detected in response: " + response);
        }


    }

    private void testTrackShipment() {
        List<Shipment> shipments = shipmentRepository.findAll();
        Shipment s = null;
        for (Shipment shipment : shipments) {
            if (SENDER_EMAIL.equals(shipment.getSenderMail()) && RECEIVER_EMAIL.equals(shipment.getReceiverMail())) {
                s = shipment;
                break;
            }
        }
        if (s == null) {
            throw new RuntimeException("Error detected: Shipment is null");
        }

        String url = "http://localhost:" + port + "/tracking/trackShipment";
        String body = "{\n" +
                "  \"shipmentID\": \"" + s.getId() + "\",\n" +
                "  \"currentDate\": \"2023-11-28T20:15:00.000Z\"\n" +
                "}\n";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(body, headers);
        String response  = this.restTemplate.postForObject(url, request, String.class, headers);
        validateResponse(response, TrackingData.class);
        if (response.equals("false")){
            throw new RuntimeException("Error detected in response: " + response);
        }

        shipmentRepository.deleteById(s.getId());
    }

    private static <T> void validateResponse(String response, Class<T> type) {
        // Test connection
        if (response != null && response.contains("error")) {
            throw new RuntimeException("Error detected in response: " + response);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            T deserializedObject = objectMapper.readValue(response, type);

            // Process deserializedObject as needed
            System.out.println("Deserialized object: " + deserializedObject);
        } catch (Exception e) {
            throw new RuntimeException("Error deserializing response into proper class", e);
        }
    }
}