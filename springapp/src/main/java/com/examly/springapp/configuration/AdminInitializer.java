package com.examly.springapp.configuration;

import com.examly.springapp.model.Admin;
import com.examly.springapp.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminInitializer implements CommandLineRunner {
    @Autowired
    private AdminRepo adminRepo;

    @Override
    public void run(String... args) throws Exception {
        String username = "Romey@123";
        String password = "Romey@123"; // Plain text for now
        if (adminRepo.findByUsername(username) == null) {
            Admin admin = new Admin();
            admin.setUsername(username);
            admin.setPassword(password);
            admin.setEmail("admin@fastbike.com");
            admin.setRole("ADMIN");
            admin.setPhoneNumber("9999999999");
            adminRepo.save(admin);
        }
    }
}
