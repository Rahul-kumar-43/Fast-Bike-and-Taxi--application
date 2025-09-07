package com.examly.springapp.repository;

import com.examly.springapp.model.Biketaxi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BiketaxiRepo extends JpaRepository<Biketaxi, Integer> {
    Biketaxi findByPhoneNumber(String phoneNumber);

    Biketaxi findByEmail(String email);
}
