package com.example.backend.db.dao;

import java.util.List;

import com.example.backend.models.Cottage;
import com.example.backend.models.Prices;
import com.example.backend.models.Review;
import com.example.backend.models.Services;

public interface CottageRepoInterface {

    public List<Cottage> getAllCottages();

    public List<Services> getAllServices(int cottage);

    public List<Review> getAllReviews(int cottage);

    public List<Prices> getAllPrices(int cottage);

    public List<Cottage> getMyCottages(String owner);

    public int deleteCottage(Cottage c);

    public int updateCottage(Cottage c);

    public int deleteServices(int idS);

    public int insertServices(int idC, String name);

    public int updatePrices(int idP, int price);

    public int addCottage(Cottage c);

    public int addPrices(Prices p);

    public boolean getBanedReviews(Cottage c);

    public int banCottage(Cottage c);
    
    
}
