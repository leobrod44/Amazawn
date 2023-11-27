package com.backend;
import com.backend.Entities.Structures.QuotaInfo;
import com.backend.Entities.User;
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

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TestRestTemplate restTemplate;

    private String SENDER_EMAIL = "john.doe@gmail.com";
    private String RECEIVER_EMAIL = "jane.doe@gmail.com";



    @Test
    void testStartingNewShipment(){
        String response = testRequestQuotation();
        testAcceptQuotation(response);
    }
    public String testRequestQuotation() {
        //test acceptQuotation
        String url = "http://localhost:" + port + "/logistics/requestQuotation";
        String body = "{\n" +
                "  \"SenderFirstName\": \"test\",\n" +
                "  \"SenderLastName\": \"tester\",\n" +
                "  \"SenderEmail\": \""+SENDER_EMAIL+"\",\n" +
                "  \"ReceiverFirstName\": \"test\",\n" +
                "  \"ReceiverLastName\": \"testReceiverette\",\n" +
                "  \"ReceiverEmail\":\""+RECEIVER_EMAIL+"\",\n" +
                "  \"SenderLocation\": {\n" +
                "    \"name\": \"Sender Location\",\n" +
                "    \"latitude\": 40.7128,\n" +
                "    \"longitude\": -74.0060\n" +
                "  },\n" +
                "  \"ReceiverLocation\": {\n" +
                "    \"name\": \"Receiver Location\",\n" +
                "    \"latitude\": 34.0522,\n" +
                "    \"longitude\": -118.2437\n" +
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
        User sender = userRepository.findByEmail(SENDER_EMAIL);
        User receiver = userRepository.findByEmail(RECEIVER_EMAIL);
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