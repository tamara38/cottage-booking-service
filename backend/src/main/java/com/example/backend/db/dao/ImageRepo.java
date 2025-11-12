package com.example.backend.db.dao;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
@Repository
public class ImageRepo implements ImageRepoInterface{

    private final String uploadDir = "backend\\uploads\\profile";
    private final String cottagesDir = "backend\\uploads\\cottages";
    private final String forDelete = "backend\\";

    public ImageRepo() {
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        File dir2 = new File(cottagesDir);
        if (!dir2.exists()) dir2.mkdirs();
    }

    @Override
    public String getImagePath(MultipartFile file, String username) {
        String fileName = username + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);

        try {
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        
        return "uploads/profile/" + fileName;
        
        
    }

    @Override
    public List<String> getCottageGallery(int cottage) {
        List<String> images = new ArrayList<>();
        Path folderPath = Paths.get(cottagesDir, String.valueOf(cottage));

        File folder = folderPath.toFile();
        if (!folder.exists() || !folder.isDirectory()) {
            return images; 
        }

        File[] files = folder.listFiles((dir, name) -> 
            name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png")
        );

        if (files != null) {
            for (File file : files) {
                images.add("uploads/cottages/" + cottage + "/" + file.getName());
            }
        }

        return images;
    }

    @Override
    public void saveCottageImages(MultipartFile[] files, int cottageId) {
        Path folderPath = Paths.get(cottagesDir, String.valueOf(cottageId));

    try {
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }

        for (MultipartFile file : files) {
            Path filePath = folderPath.resolve(file.getOriginalFilename());
            Files.write(filePath, file.getBytes());
            System.out.println(filePath);
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
    }

    @Override
    public boolean deleteCottageImage(String filename) {
        /*File folder = new File(cottagesDir + cottageId);
        if (!folder.exists() || !folder.isDirectory()) {
            return false; // folder ne postoji
        }*/

        Path filePath = Paths.get(forDelete + filename);
        System.out.println(filePath);
        File file = filePath.toFile();
        if (file.exists() && file.isFile()) {
            return file.delete();
        }
        return false; // fajl ne postoji
    }

    
    
}
