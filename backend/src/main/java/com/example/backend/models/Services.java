package com.example.backend.models;

public class Services {
    private int idS;
    private int cottage;
    private String name;
    
    public Services(int idS, int cottage, String name) {
        this.idS = idS;
        this.cottage = cottage;
        this.name = name;
    }

    public int getIdS() {
        return idS;
    }

    public void setIdS(int idS) {
        this.idS = idS;
    }

    public int getCottage() {
        return cottage;
    }

    public void setCottage(int cottage) {
        this.cottage = cottage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    
}
