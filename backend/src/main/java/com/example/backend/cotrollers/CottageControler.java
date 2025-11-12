package com.example.backend.cotrollers;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.db.dao.CottageRepo;
import com.example.backend.db.dao.UserRepo;
import com.example.backend.models.Cottage;
import com.example.backend.models.Prices;
import com.example.backend.models.Review;
import com.example.backend.models.Services;
import com.example.backend.models.User;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/cottages")
@CrossOrigin(origins = "http://localhost:4200")
public class CottageControler {
    
    @GetMapping("/getAllCottages")
    public List<Cottage> getAllCottages() {
        return new CottageRepo().getAllCottages();
    } 

    @GetMapping("/getAllServices")
    public List<Services> getAllServices(@RequestParam ("cottage") int cottage) {
        return new CottageRepo().getAllServices(cottage);
    } 

    @GetMapping("/getAllReviews")
    public List<Review> getAllReviews(@RequestParam ("cottage") int cottage) {
        return new CottageRepo().getAllReviews(cottage);
    } 

    @GetMapping("/getAllPrices")
    public List<Prices> getAllPrices(@RequestParam ("cottage") int cottage) {
        return new CottageRepo().getAllPrices(cottage);
    } 

    @GetMapping("/getMyCottages")
    public List<Cottage> getMyCottages(@RequestParam ("owner") String owner) {
        return new CottageRepo().getMyCottages(owner);
    } 

    @PostMapping("/deleteCottage")
    public int deleteCottage(@RequestBody Cottage c) {
        return new CottageRepo().deleteCottage(c);
    } 

    @PostMapping("/updateCottage")
    public int updateCottage(@RequestBody Cottage c) {
        return new CottageRepo().updateCottage(c);
    } 

    @PostMapping("/deleteServices")
    public int deleteServices(@RequestParam ("idS") int idS) {
        return new CottageRepo().deleteServices(idS);
    } 

    @PostMapping("/insertServices")
    public int insertServices(@RequestParam ("idC") int idC, @RequestParam ("name") String name) {
        return new CottageRepo().insertServices(idC,name);
    } 


    @PostMapping("/updatePrices")
    public int updatePrices(@RequestParam ("idP") int idP, @RequestParam ("price") int price) {
        return new CottageRepo().updatePrices(idP,price);
    } 

    @PostMapping("/addCottage")
    public int addCottage(@RequestBody Cottage c) {
        return new CottageRepo().addCottage(c);
    } 

    @PostMapping("/addPrices")
    public int addPrices(@RequestBody Prices p) {
        return new CottageRepo().addPrices(p);
    } 

    @PostMapping("/uploadJson")
    public String uploadCottageJson(@RequestParam("file") MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Cottage cottage = objectMapper.readValue(file.getInputStream(), Cottage.class);

        
            new CottageRepo().addCottage(cottage);

            return "Cottage added successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error";
    }   

    
    }

    @PostMapping("/getBanedReviews")
    public boolean getBanedReviews(@RequestBody Cottage c) {
        return new CottageRepo().getBanedReviews(c);
    } 

    @PostMapping("/banCottage")
    public int banCottage(@RequestBody Cottage c) {
        return new CottageRepo().banCottage(c);
    } 
}
