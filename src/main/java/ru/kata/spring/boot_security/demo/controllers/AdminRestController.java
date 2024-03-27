package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/users")
public class AdminRestController {

    private final UserService userService;
    private final RoleService roleService;


    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }


    @GetMapping()
    public ResponseEntity<List<User>> showUsers() {
        List<User> allUsers = userService.getUserTable();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findUser(@PathVariable("id") Long id){
        User user = userService.findUser(id);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<HttpStatus> saveUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody User user,
                                                 @PathVariable("id") Long id) {
        userService.updateUser(user, id);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id) {
        User user = userService.findUser(id);
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles(){
        List <Role> roleList = roleService.getAllRoles();
        return new ResponseEntity<>(roleList,HttpStatus.OK);
    }
    @GetMapping("/roles/{id}")
    public ResponseEntity<Set<Role>> getRole(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.findUser(id).getRole(), HttpStatus.OK);
    }
}
