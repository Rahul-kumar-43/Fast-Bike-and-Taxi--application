package com.examly.springapp.service;

import com.examly.springapp.model.Biketaxi;
import com.examly.springapp.repository.BiketaxiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BiketaxiService {

    @Autowired
    private BiketaxiRepo biketaxiRepo;

    public Biketaxi addBiketaxi(Biketaxi biketaxi) {
        return biketaxiRepo.save(biketaxi);
    }

    public List<Biketaxi> getAllBiketaxi() {
        return biketaxiRepo.findAll();
    }

    public Biketaxi getBiketaxiById(int id) {
        return biketaxiRepo.findById(id).orElse(null);
    }

    public Biketaxi updateBiketaxi(Biketaxi biketaxi) {
        return biketaxiRepo.save(biketaxi);
    }

    public void deleteBiketaxi(int id) {
        biketaxiRepo.deleteById(id);
    }

    public Biketaxi findByPhoneNumber(String phoneNumber) {
        return biketaxiRepo.findByPhoneNumber(phoneNumber);
    }

    public Biketaxi findByEmail(String email) {
        return biketaxiRepo.findByEmail(email);
    }

    public boolean authenticateBiketaxi(String phoneNumber, String password) {
        Biketaxi biketaxi = biketaxiRepo.findByPhoneNumber(phoneNumber);
        if (biketaxi != null && biketaxi.getPassword() != null && biketaxi.getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    public boolean authenticateBiketaxiByEmail(String email, String password) {
        Biketaxi biketaxi = biketaxiRepo.findByEmail(email);
        if (biketaxi != null && biketaxi.getPassword() != null && biketaxi.getPassword().equals(password)) {
            return true;
        }
        return false;
    }
}
