package com.example.backend.models;

import java.time.LocalDateTime;

public class Cottage {
    private int idC;
    private String name;
    private String location;
    private String owner;
    private float rating;
    private String phone;
    private float x;
    private float y;
    private LocalDateTime baned;

    public Cottage(int idC, String name, String location, String owner, float rating, String phone, float x, float y, LocalDateTime baned) {
        this.idC = idC;
        this.name = name;
        this.location = location;
        this.owner = owner;
        this.rating = rating;
        this.phone = phone;
        this.x = x;
        this.y = y;
        this.baned = baned;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public int getIdC() {
        return idC;
    }

    public void setIdC(int idC) {
        this.idC = idC;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDateTime getBaned() {
        return baned;
    }

    public void setBaned(LocalDateTime baned) {
        this.baned = baned;
    }
    
}
