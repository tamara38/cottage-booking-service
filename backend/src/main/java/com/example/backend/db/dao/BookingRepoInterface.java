package com.example.backend.db.dao;

import java.util.List;

import com.example.backend.models.Booking;
import com.example.backend.models.Reservation;


public interface BookingRepoInterface {

    public List<Booking> getAllBookings(int cottage);

    public List<Booking> getAllBookings();

    public int addBooking(Booking b);

    public List<Reservation> getUserBookings(String user);
    
    public int deleteReservation(Reservation r);

    public int updateReview(Reservation r);

    public List<Booking> getOwnerBookings(String owner);

    public int updateStatus(Booking b);

    public int getBookings1();

    public int getBookings7();

    public int getBookings30();
}
