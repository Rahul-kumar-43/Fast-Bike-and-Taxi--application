package com.examly.springapp.service;

import com.examly.springapp.model.Admin;
import com.examly.springapp.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    public Admin addAdmin(Admin admin) {
        return adminRepo.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }

    public Admin getAdminById(int id) {
        return adminRepo.findById(id).orElse(null);
    }

    public Admin getAdminByUsername(String username) {
        return adminRepo.findByUsername(username);
    }

    public Admin getAdminByEmail(String email) {
        return adminRepo.findByEmail(email);
    }

    public Admin updateAdmin(Admin admin) {
        return adminRepo.save(admin);
    }

    public void deleteAdmin(int id) {
        adminRepo.deleteById(id);
    }

    public boolean validateAdmin(String username, String password) {
        Admin admin = adminRepo.findByUsername(username);
        return admin != null && admin.getPassword().equals(password);
    }
}
