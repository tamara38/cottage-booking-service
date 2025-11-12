package com.example.backend.cotrollers;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.BookingRepo;
import com.example.backend.db.dao.CottageRepo;
import com.example.backend.models.Booking;
import com.example.backend.models.Cottage;
import com.example.backend.models.Reservation;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {
    
    @GetMapping("/getAllBookings")
    public List<Booking> getAllBookings(@RequestParam ("cottage") int cottage) {
        return new BookingRepo().getAllBookings(cottage);
    }
    
    @GetMapping("/getAll")
    public List<Booking> getAllBookings() {
        return new BookingRepo().getAllBookings();
    } 

    @PostMapping("/addBooking")
    public int addBooking(@RequestBody Booking b) {
        
        return new BookingRepo().addBooking(b);
    } 

    @GetMapping("/getUserBookings")
    public List<Reservation> getUserBookings(@RequestParam ("user") String user) {
        return new BookingRepo().getUserBookings(user);
    }

    @PostMapping("/deleteReservation")
    public int deleteReservation(@RequestBody Reservation r) {
        return new BookingRepo().deleteReservation(r);
    } 

    @PostMapping("/updateReview")
    public int updateReview(@RequestBody Reservation r) {
        return new BookingRepo().updateReview(r);
    } 

    @GetMapping("/getOwnerBookings")
    public List<Booking> getOwnerBookings(@RequestParam ("owner") String owner) {
        return new BookingRepo().getOwnerBookings(owner);
    }

    @PostMapping("/updateStatus")
    public int updateStatus(@RequestBody Booking b) {
        return new BookingRepo().updateStatus(b);
    } 

    @PostMapping("/getBookings1")
    public int getBookings1() {
        return new BookingRepo().getBookings1();
    } 

    @PostMapping("/getBookings7")
    public int getBookings7() {
        return new BookingRepo().getBookings7();
    } 

    @PostMapping("/getBookings30")
    public int getBookings30() {
        return new BookingRepo().getBookings30();
    } 
}
