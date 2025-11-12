package com.example.backend.cotrollers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.UserRepo;
import com.example.backend.models.User;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    
    @PostMapping("/login")
    public User login(@RequestBody User u) {
        return new UserRepo().login(u);
    }

    @PostMapping("/register")
    public int register(@RequestBody User u) {
        System.out.println("uslo");
        return new UserRepo().register(u);
    }

    @PostMapping("/changePassword")
    public int changePassword(@RequestParam("username") String username, @RequestParam("oldPassword") String oldPassword, @RequestParam("newPassword") String newPassword) {
        return new UserRepo().changePassword(username,oldPassword,newPassword);
    }

    @PostMapping("/updateFirstname")
    public int updateFirstname(@RequestBody User u) {
        return new UserRepo().updateFirstname(u);
    }

    @PostMapping("/updateLastname")
    public int updateLastname(@RequestBody User u) {
        return new UserRepo().updateLastname(u);
    }

    @PostMapping("/updateAddress")
    public int updateAddress(@RequestBody User u) {
        return new UserRepo().updateAddress(u);
    }

    @PostMapping("/updateEmail")
    public int updateEmail(@RequestBody User u) {
        return new UserRepo().updateEmail(u);
    }

    @PostMapping("/updatePhone")
    public int updatePhone(@RequestBody User u) {
        return new UserRepo().updatePhone(u);
    }

    @PostMapping("/updateCard")
    public int updateCard(@RequestBody User u) {
        return new UserRepo().updateCard(u);
    }

    @PostMapping("/updateProfPic")
    public int updateProfPic(@RequestBody User u) {
        return new UserRepo().updateProfPic(u);
    }

    @PostMapping("/deleteUser")
    public int deleteUser(@RequestBody User u) {
        return new UserRepo().deleteUser(u);
    }

    @PostMapping("/updateStatus")
    public int updateStatus(@RequestBody User u) {
        return new UserRepo().updateStatus(u);
    }
    
}
