package com.example.backend.db.dao;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ImageRepoInterface {
    
    public String getImagePath(MultipartFile file, String username);

    public List<String> getCottageGallery(int cottage);

    void saveCottageImages(MultipartFile[] files, int cottageId);

    public boolean deleteCottageImage(String filename);

   
}
