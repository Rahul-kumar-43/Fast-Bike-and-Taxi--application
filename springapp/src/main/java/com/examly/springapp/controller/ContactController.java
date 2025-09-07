package com.examly.springapp.controller;

import com.examly.springapp.model.ContactMessage;
import com.examly.springapp.service.ContactMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactMessageService contactMessageService;

    // Submit a contact message
    @PostMapping("/submit")
    public ResponseEntity<?> submitContactMessage(@RequestBody ContactMessage contactMessage) {
        try {
            ContactMessage savedMessage = contactMessageService.saveContactMessage(contactMessage);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Your message has been sent successfully!");
            response.put("data", savedMessage);

            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to send message. Please try again later.");
            response.put("error", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Admin endpoints for managing contact messages

    // Get all contact messages - admin only
    @GetMapping("/admin/messages")
    public ResponseEntity<?> getAllContactMessages() {
        try {
            List<ContactMessage> messages = contactMessageService.getAllContactMessages();
            return new ResponseEntity<>(messages, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error retrieving messages: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get contact messages by type - admin only
    @GetMapping("/admin/messages/type/{userType}")
    public ResponseEntity<?> getContactMessagesByType(@PathVariable String userType) {
        try {
            List<ContactMessage> messages = contactMessageService.getContactMessagesByUserType(userType);
            return new ResponseEntity<>(messages, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error retrieving messages: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get a specific contact message - admin only
    @GetMapping("/admin/messages/{id}")
    public ResponseEntity<?> getContactMessageById(@PathVariable int id) {
        try {
            ContactMessage message = contactMessageService.getContactMessageById(id);
            if (message != null) {
                return new ResponseEntity<>(message, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Message not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error retrieving message: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete a contact message - admin only
    @DeleteMapping("/admin/messages/{id}")
    public ResponseEntity<?> deleteContactMessage(@PathVariable int id) {
        try {
            ContactMessage message = contactMessageService.getContactMessageById(id);
            if (message != null) {
                contactMessageService.deleteContactMessage(id);
                return new ResponseEntity<>("Message deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Message not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting message: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
