package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/admin")
    public String currentAdmin() {
        return "adminpage";
    }

    @GetMapping("/user")
    public String currentUser() {
        return "userpage";
    }

}
