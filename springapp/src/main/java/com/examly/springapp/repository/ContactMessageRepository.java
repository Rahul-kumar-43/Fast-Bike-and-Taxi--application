package com.examly.springapp.repository;

import com.examly.springapp.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Integer> {
    List<ContactMessage> findByUserType(String userType);

    List<ContactMessage> findByUserId(Integer userId);
}
