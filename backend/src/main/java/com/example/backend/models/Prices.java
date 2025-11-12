package com.example.backend.models;

public class Prices {
    private int idP;
    private int idC;
    private String period;
    private int price;
    
    public Prices(int idP, int idC, String period, int price) {
        this.idP = idP;
        this.idC = idC;
        this.period = period;
        this.price = price;
    }

    public int getIdP() {
        return idP;
    }

    public void setIdP(int idP) {
        this.idP = idP;
    }

    public int getIdC() {
        return idC;
    }

    public void setIdC(int idC) {
        this.idC = idC;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
    
}
