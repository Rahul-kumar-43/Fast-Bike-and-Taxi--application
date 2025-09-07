package com.examly.springapp.repository;

import com.examly.springapp.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer> {

    Admin findByUsername(String username);

    Admin findByEmail(String email);

}
