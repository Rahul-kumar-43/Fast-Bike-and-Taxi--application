package com.examly.springapp.controller;

import com.examly.springapp.model.Biketaxi;
import com.examly.springapp.security.JwtTokenProvider;
import com.examly.springapp.service.BiketaxiService;
import com.examly.springapp.util.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ApiController {

    @Autowired
    private BiketaxiService biketaxiService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/addBiketaxi")
    public ResponseEntity<?> addBiketaxi(@RequestBody Biketaxi biketaxi) {
        try {
            // Validate password strength
            String password = biketaxi.getPassword();
            String passwordError = PasswordValidator.validatePassword(password);

            if (passwordError != null) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Password validation failed");
                response.put("message", passwordError);
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            Biketaxi savedBiketaxi = biketaxiService.addBiketaxi(biketaxi);
            return new ResponseEntity<>(savedBiketaxi, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllBiketaxi")
    public ResponseEntity<?> getAllBiketaxi() {
        try {
            List<Biketaxi> biketaxiList = biketaxiService.getAllBiketaxi();
            return new ResponseEntity<>(biketaxiList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getBiketaxi/{id}")
    public ResponseEntity<?> getBiketaxiById(@PathVariable int id) {
        try {
            Biketaxi biketaxi = biketaxiService.getBiketaxiById(id);
            if (biketaxi != null) {
                return new ResponseEntity<>(biketaxi, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Biketaxi not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/biketaxi/login")
    public ResponseEntity<?> loginBiketaxi(@RequestBody Map<String, String> credentials) {
        try {
            String phoneNumber = credentials.get("phoneNumber");
            String email = credentials.get("email");
            String password = credentials.get("password");

            // Validate that either phone number or email is provided
            if ((phoneNumber == null && email == null) || password == null) {
                return new ResponseEntity<>("Either phone number or email, and password are required",
                        HttpStatus.BAD_REQUEST);
            }

            boolean isAuthenticated = false;
            Biketaxi biketaxi = null;

            // Check if login is using phone number
            if (phoneNumber != null && !phoneNumber.isEmpty()) {
                isAuthenticated = biketaxiService.authenticateBiketaxi(phoneNumber, password);
                if (isAuthenticated) {
                    biketaxi = biketaxiService.findByPhoneNumber(phoneNumber);
                }
            }
            // Check if login is using email
            else if (email != null && !email.isEmpty()) {
                isAuthenticated = biketaxiService.authenticateBiketaxiByEmail(email, password);
                if (isAuthenticated) {
                    biketaxi = biketaxiService.findByEmail(email);
                }
            }

            if (isAuthenticated && biketaxi != null) {
                // Generate JWT token
                String token = jwtTokenProvider.generateTokenForDriver(
                        biketaxi.getId(),
                        biketaxi.getPhoneNumber(),
                        biketaxi.getName());

                Map<String, Object> response = new HashMap<>();
                response.put("authenticated", true);
                response.put("userId", biketaxi.getId());
                response.put("name", biketaxi.getName());
                response.put("token", token);

                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("authenticated", false);
                response.put("message", "Invalid credentials");

                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
