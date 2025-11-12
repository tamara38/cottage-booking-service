package com.example.backend.models;

import java.sql.Date;
import java.time.LocalDateTime;

public class Booking {
    private int idRes;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int cottage;
    private String user;
    private String request;
    private String status;
    private String comment;
    private String cottage_name;
    private LocalDateTime created;
    
    public Booking(int idRes, LocalDateTime startDate, LocalDateTime endDate, int cottage, String user, String request, String status, String comment, String cottage_name, LocalDateTime created) {
        this.idRes = idRes;
        this.startDate = startDate;
        this.endDate = endDate;
        this.cottage = cottage;
        this.user = user;
        this.request = request;
        this.status = status;
        this.comment = comment;
        this.cottage_name = cottage_name;
        this.created = created;
    }
    
    public int getIdRes() {
        return idRes;
    }
    public void setIdRes(int idRes) {
        this.idRes = idRes;
    }
    public LocalDateTime getStartDate() {
        return startDate;
    }
    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }
    public LocalDateTime getEndDate() {
        return endDate;
    }
    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }
    public int getCottage() {
        return cottage;
    }
    public void setCottage(int cottage) {
        this.cottage = cottage;
    }
    public String getUser() {
        return user;
    }
    public void setUser(String user) {
        this.user = user;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCottage_name() {
        return cottage_name;
    }

    public void setCottage_name(String cottage_name) {
        this.cottage_name = cottage_name;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }
    
}
