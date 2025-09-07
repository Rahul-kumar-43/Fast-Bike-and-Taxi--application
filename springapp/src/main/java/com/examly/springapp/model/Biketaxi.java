package com.examly.springapp.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "biketaxi")
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Biketaxi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String bikeNumber;
    private int age;
    private String phoneNumber;
    private String email;
    private String password;

}
