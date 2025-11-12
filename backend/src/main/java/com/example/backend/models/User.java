package com.example.backend.models;

public class User {
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private char gender;
    private String address;
    private String phone;
    private String email;
    private String type;
    private String prof_img;
    private String card;
    private String status;
    private String oldUsername;

    public User(String username, String password, String firstname, String lastname, char gender, String address,
            String phone, String email, String prof_img, String type, String card, String status, String oldUsername) {
        
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.prof_img = prof_img;
        this.type = type;
        this.card = card;
        this.status = status;
        this.oldUsername = oldUsername;

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    

    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card;
    }

    public String getProf_img() {
        return prof_img;
    }

    public void setProf_img(String prof_img) {
        this.prof_img = prof_img;
    }

    public String getOldUsername() {
        return oldUsername;
    }

    public void setOldUsername(String oldUsername) {
        this.oldUsername = oldUsername;
    }
    
    
}
