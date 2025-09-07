package com.examly.springapp.model;

import javax.persistence.*;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "contact_messages")
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String email;

    private String phoneNumber;

    private String subject;

    @Column(length = 1000)
    private String message;

    private LocalDateTime createdAt;

    // Optional - if message is from a registered user/driver
    private Integer userId;

    private String userType; // "USER", "DRIVER", "GUEST"

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
