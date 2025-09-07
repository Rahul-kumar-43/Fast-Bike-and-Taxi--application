package com.examly.springapp.service;

import com.examly.springapp.model.ContactMessage;
import com.examly.springapp.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    // Save a new contact message
    public ContactMessage saveContactMessage(ContactMessage contactMessage) {
        return contactMessageRepository.save(contactMessage);
    }

    // Get all contact messages
    public List<ContactMessage> getAllContactMessages() {
        return contactMessageRepository.findAll();
    }

    // Get a contact message by id
    public ContactMessage getContactMessageById(int id) {
        Optional<ContactMessage> contactMessage = contactMessageRepository.findById(id);
        return contactMessage.orElse(null);
    }

    // Get contact messages by user type (DRIVER, USER, GUEST)
    public List<ContactMessage> getContactMessagesByUserType(String userType) {
        return contactMessageRepository.findByUserType(userType);
    }

    // Get contact messages by user id
    public List<ContactMessage> getContactMessagesByUserId(Integer userId) {
        return contactMessageRepository.findByUserId(userId);
    }

    // Delete a contact message
    public void deleteContactMessage(int id) {
        contactMessageRepository.deleteById(id);
    }
}
