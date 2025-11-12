package com.example.backend.cotrollers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.db.dao.ImageRepo;
import com.example.backend.db.dao.ImageRepoInterface;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/images")
@CrossOrigin(origins = "http://localhost:4200")
public class ImageController {
    
    @Autowired
    private ImageRepoInterface imageRepo;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam("username") String username) {
        try {
            
            String path = imageRepo.getImagePath(file, username);
            
            return ResponseEntity.ok(path.replace("\\", "/")); 
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error uploading image");
        }
    }

    @GetMapping("/gallery/{id}")
    public List<String> getCottageGallery(@PathVariable int id) {
        return imageRepo.getCottageGallery(id);
    }

    @PostMapping("/uploadCottageImages/{idC}")
    public ResponseEntity<String> uploadCottageImages(
            @PathVariable int idC,
            @RequestParam("files") MultipartFile[] files) {
        try {
            imageRepo.saveCottageImages(files, idC);
            return ResponseEntity.ok("Images uploaded successfully for cottage ID: " + idC);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error uploading images: " + e.getMessage());
        }
    }

     @DeleteMapping("/deleteCottageImage")
    public ResponseEntity<String> deleteCottageImage(@RequestParam String filename) {
        boolean deleted = imageRepo.deleteCottageImage(filename);
        if (deleted) {
            return ResponseEntity.ok("Deleted " + filename + " successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Image not found or could not be deleted: " + filename);
        }
    }


}
