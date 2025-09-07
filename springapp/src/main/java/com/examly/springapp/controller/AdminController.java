package com.examly.springapp.controller;

import com.examly.springapp.model.Admin;
import com.examly.springapp.model.Biketaxi;
import com.examly.springapp.security.JwtTokenProvider;
import com.examly.springapp.service.AdminService;
import com.examly.springapp.service.BiketaxiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private BiketaxiService biketaxiService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/addAdmin")
    public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
        Admin savedAdmin = adminService.addAdmin(admin);
        return new ResponseEntity<>(savedAdmin, HttpStatus.OK);
    }

    @GetMapping("/getAllAdmins")
    public ResponseEntity<?> getAllAdmins() {
        List<Admin> adminList = adminService.getAllAdmins();
        return new ResponseEntity<>(adminList, HttpStatus.OK);
    }

    @GetMapping("/getAdmin/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable int id) {
        Admin admin = adminService.getAdminById(id);
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }

    @GetMapping("/getAdminByUsername/{username}")
    public ResponseEntity<?> getAdminByUsername(@PathVariable String username) {
        Admin admin = adminService.getAdminByUsername(username);
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }

    @PostMapping("/adminLogin")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        boolean isValid = adminService.validateAdmin(username, password);

        if (isValid) {
            Admin admin = adminService.getAdminByUsername(username);

            // Generate JWT token
            String token = jwtTokenProvider.generateTokenForAdmin(admin.getId(), admin.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("authenticated", true);
            response.put("adminId", admin.getId());
            response.put("username", admin.getUsername());
            response.put("token", token);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("authenticated", false);
            response.put("message", "Invalid credentials");

            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/updateAdmin/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable int id, @RequestBody Admin admin) {
        admin.setId(id);
        Admin updatedAdmin = adminService.updateAdmin(admin);
        return new ResponseEntity<>(updatedAdmin, HttpStatus.OK);
    }

    @DeleteMapping("/deleteAdmin/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable int id) {
        adminService.deleteAdmin(id);
        return new ResponseEntity<>("Admin deleted successfully", HttpStatus.OK);
    }

    // Driver Management endpoints for Admin

    @GetMapping("/admin/getAllDrivers")
    public ResponseEntity<?> getAllDrivers() {
        List<Biketaxi> driverList = biketaxiService.getAllBiketaxi();
        return new ResponseEntity<>(driverList, HttpStatus.OK);
    }

    @GetMapping("/admin/getDriver/{id}")
    public ResponseEntity<?> getDriverById(@PathVariable int id) {
        Biketaxi driver = biketaxiService.getBiketaxiById(id);
        if (driver == null) {
            return new ResponseEntity<>("Driver not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(driver, HttpStatus.OK);
    }

    @PostMapping("/admin/addDriver")
    public ResponseEntity<?> addDriver(@RequestBody Biketaxi driver) {
        Biketaxi savedDriver = biketaxiService.addBiketaxi(driver);
        return new ResponseEntity<>(savedDriver, HttpStatus.CREATED);
    }

    @PutMapping("/admin/updateDriver/{id}")
    public ResponseEntity<?> updateDriver(@PathVariable int id, @RequestBody Biketaxi driver) {
        Biketaxi existingDriver = biketaxiService.getBiketaxiById(id);
        if (existingDriver == null) {
            return new ResponseEntity<>("Driver not found", HttpStatus.NOT_FOUND);
        }

        driver.setId(id);
        Biketaxi updatedDriver = biketaxiService.updateBiketaxi(driver);
        return new ResponseEntity<>(updatedDriver, HttpStatus.OK);
    }

    @DeleteMapping("/admin/deleteDriver/{id}")
    public ResponseEntity<?> deleteDriver(@PathVariable int id) {
        Biketaxi existingDriver = biketaxiService.getBiketaxiById(id);
        if (existingDriver == null) {
            return new ResponseEntity<>("Driver not found", HttpStatus.NOT_FOUND);
        }

        biketaxiService.deleteBiketaxi(id);
        return new ResponseEntity<>("Driver deleted successfully", HttpStatus.OK);
    }
}
