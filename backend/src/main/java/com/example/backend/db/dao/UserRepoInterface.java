package com.example.backend.db.dao;

import java.util.List;

import com.example.backend.models.User;

public interface UserRepoInterface {
    public User login(User u);

    public int register(User u);

    public int changePassword(String username, String oldPassword, String newPassword);

    public int updateFirstname(User u);

    public int updateLastname(User u);

    public int updateAddress(User u);

    public int updateEmail(User u);

    public int updatePhone(User u);

    public int updateCard(User u);

    public int updateProfPic(User u);

    public List<User> getAll();

    public List<User> getAllTourists();

    public List<User> getAllOwners();

    public int deleteUser(User u);

    public int updateStatus(User u);

    public User adminLogin(User u);

    public int updateUser(User u);
}
