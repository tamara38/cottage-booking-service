package com.example.backend.models;

import java.time.LocalDateTime;

public class Reservation {
    private int idRes;
    private int idC;
    private String cottage;
    private String location;
    private String user;
    private String comment;
    private float rating;
    private LocalDateTime start;
    private LocalDateTime end;
    public Reservation(int idRes, int idC, String cottage, String location, String user, String comment, float rating, LocalDateTime start,
            LocalDateTime end) {
        this.idRes = idRes;
        this.idC = idC;
        this.cottage = cottage;
        this.location = location;
        this.user = user;
        this.comment = comment;
        this.rating = rating;
        this.start = start;
        this.end = end;
    }
    
    public String getCottage() {
        return cottage;
    }
    public void setCottage(String cottage) {
        this.cottage = cottage;
    }
    public String getUser() {
        return user;
    }
    public void setUser(String user) {
        this.user = user;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
    public float getRating() {
        return rating;
    }
    public void setRating(float rating) {
        this.rating = rating;
    }
    public LocalDateTime getStart() {
        return start;
    }
    public void setStart(LocalDateTime start) {
        this.start = start;
    }
    public LocalDateTime getEnd() {
        return end;
    }
    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    public int getIdRes() {
        return idRes;
    }

    public void setIdRes(int idRes) {
        this.idRes = idRes;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getIdC() {
        return idC;
    }

    public void setIdC(int idC) {
        this.idC = idC;
    }
    
}
