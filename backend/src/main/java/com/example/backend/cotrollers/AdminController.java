package com.example.backend.cotrollers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.UserRepo;
import com.example.backend.models.User;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
    
    @PostMapping("/login")
    public User login(@RequestBody User u) {
        return new UserRepo().login(u);
    }

    @GetMapping("/getAll")
    public List<User> getAllPending() {
        return new UserRepo().getAll();
    }   
    
    @GetMapping("/getAllTourists")
    public List<User> getAllTourists() {
        return new UserRepo().getAllTourists();
    }   

    @GetMapping("/getAllOwners")
    public List<User> getAllOwners() {
        return new UserRepo().getAllOwners();
    }   

    @PostMapping("/adminLogin")
    public User adminLogin(@RequestBody User u) {
        return new UserRepo().adminLogin(u);
    }

    @PostMapping("/updateStatus")
    public int updateStatus(@RequestBody User u) {
        return new UserRepo().updateStatus(u);
    }

    @PostMapping("/updateUser")
    public int updateUser(@RequestBody User u) {
        return new UserRepo().updateUser(u);
    }
}
