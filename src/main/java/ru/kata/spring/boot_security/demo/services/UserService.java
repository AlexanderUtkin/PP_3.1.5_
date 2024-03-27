package ru.kata.spring.boot_security.demo.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;

public interface UserService extends UserDetailsService {

    void addUser(User user);
    void deleteUser(Long id);
    void updateUser(User user, Long id);
    List<User> getUserTable();
    User findUser(Long id);
    UserDetails loadUserByUsername(String username);
}
