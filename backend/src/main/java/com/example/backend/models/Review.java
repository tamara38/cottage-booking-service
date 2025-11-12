package com.example.backend.models;

public class Review{
    private int idR;
    private int idC;
    private String comment;
    private float rating;
    private String user;

    public Review(int idR, int idC, String comment, float rating, String user) {
        this.idR = idR;
        this.idC = idC;
        this.comment = comment;
        this.rating = rating;
        this.user = user;
        
    }

    public int getIdR() {
        return idR;
    }

    public void setIdR(int idR) {
        this.idR = idR;
    }

    public int getIdC() {
        return idC;
    }

    public void setIdC(int idC) {
        this.idC = idC;
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

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
    
}
