package com.example.backend.db.dao;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.backend.db.DB;
import com.example.backend.models.Booking;
import com.example.backend.models.Cottage;
import com.example.backend.models.Reservation;
import com.example.backend.models.Review;

public class BookingRepo implements BookingRepoInterface{

    @Override
    public List<Booking> getAllBookings(int cottage) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from bookings where cottage = ?")) {

            stmt.setInt(1, cottage);
            List<Booking> bookings = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Booking b = new Booking(
                        rs.getInt("idRes"),
                        rs.getObject("startDate", LocalDateTime.class),
                        rs.getObject("endDate", LocalDateTime.class),
                        rs.getInt("cottage"),
                        rs.getString("user"),
                        rs.getString("request"),
                        rs.getString("status"),
                        rs.getString("comment"),
                        rs.getString("cottage_name"),
                        rs.getObject("created", LocalDateTime.class));
                bookings.add(b);
            }

            return bookings;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int addBooking(Booking b) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "insert into bookings (idRes, startDate, endDate, cottage, user, request, comment, cottage_name) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        Statement.RETURN_GENERATED_KEYS);
                PreparedStatement stmtReview = conn.prepareStatement(
                        "insert into reviews (idR, cottage, comment, rating, user, booking) values (?, ?, ?, ?, ?, ?)")    ) {

            
            stmt.setString(1, null);
            stmt.setObject(2, b.getStartDate());
            stmt.setObject(3, b.getEndDate());
            stmt.setInt(4, b.getCottage());
            stmt.setString(5, b.getUser());
            if(b.getRequest() == ""){
                stmt.setString(6, null);
            }else{
                stmt.setString(6, b.getRequest());
            }
            stmt.setString(7, null);
            stmt.setString(8, "cottage_name");
            stmt.setObject(3, b.getCreated());
            
            int idRes = stmt.executeUpdate();

            idRes = -1;
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    idRes = generatedKeys.getInt(1);
                } else {
                    throw new SQLException("Creating booking failed, no ID obtained.");
        }
    }

            if(idRes > 0){
                stmtReview.setString(1, null);
                stmtReview.setInt(2, b.getCottage());
                stmtReview.setString(3, null);
                stmtReview.setString(4, null);
                stmtReview.setString(5, b.getUser());
                stmtReview.setInt(6, idRes);
            }

            return stmtReview.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Reservation> getUserBookings(String user) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select b.idRes, c.idC, c.name, c.location, b.user, r.comment, r.rating, b.startDate, b.endDate\n" + //
                                                        "from cottages c, bookings b, reviews r\n" + //
                                                        "where c.idC = b.cottage and r.booking = b.idRes and b.user = ?")) {

            stmt.setString(1, user);
            List<Reservation> bookings = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Reservation b = new Reservation(
                        rs.getInt("idRes"),
                        rs.getInt("idC"),
                        rs.getString("name"),
                        rs.getString("location"),
                        rs.getString("user"),
                        rs.getString("comment"),
                        rs.getFloat("rating"),
                        rs.getObject("startDate", LocalDateTime.class),
                        rs.getObject("endDate", LocalDateTime.class));
                bookings.add(b);
                
            }

            return bookings;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int deleteReservation(Reservation r) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "delete from bookings where idRes = ?");
                PreparedStatement stmtReview = conn.prepareStatement(
                        "delete from reviews where booking = ?")) {

            stmt.setInt(1, r.getIdRes());
            stmtReview.setInt(1, r.getIdRes());
            
            int res = stmtReview.executeUpdate();
            System.out.println(res);
            if(res > 0){
                return stmt.executeUpdate();
            }
        }catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int updateReview(Reservation r) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update reviews set comment = ?, rating = ? where booking = ?");
                PreparedStatement stmtRating = conn.prepareStatement(
                        "update cottages set rating = ? where idC = ?");
                PreparedStatement stmtCottage = conn.prepareStatement(
                        "select avg(rating) as avgRating from reviews where cottage = ?")) {
                
            stmt.setString(1, r.getComment());
            stmt.setFloat(2, r.getRating());
            stmt.setInt(3, r.getIdRes());

            stmtCottage.setInt(1, r.getIdC());
            
            int update = stmt.executeUpdate();
            System.out.println(update);
            if(update > 0){
                ResultSet rs = stmtCottage.executeQuery();
                if(rs.next()){
                    System.out.println("uslo");
                    float avg = rs.getFloat("avgRating");

                    stmtRating.setFloat(1, avg);
                    stmtRating.setInt(2, r.getIdC());

                    return stmtRating.executeUpdate();
                }
            }
            

        }catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Booking> getOwnerBookings(String owner) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from \n" + //
                                                        "bookings b, cottages c\n" + //
                                                        "where b.cottage = c.idC and c.owner = ?")) {

            stmt.setString(1, owner);
            List<Booking> bookings = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                
                Booking b = new Booking(
                        rs.getInt("idRes"),
                        rs.getObject("startDate", LocalDateTime.class),
                        rs.getObject("endDate", LocalDateTime.class),
                        rs.getInt("cottage"),
                        rs.getString("user"),
                        rs.getString("request"),
                        rs.getString("status"),
                        rs.getString("comment"),
                        rs.getString("cottage_name"),
                        rs.getObject("created", LocalDateTime.class));
                bookings.add(b);
            }

            return bookings;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int updateStatus(Booking b) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update bookings set status = ?, comment = ? where idRes = ?")) {

            stmt.setString(1, b.getStatus());
            stmt.setString(2, b.getComment());                
            stmt.setInt(3, b.getIdRes());
            
            return stmt.executeUpdate();
        }catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int getBookings1() {
         try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select COUNT(DISTINCT bookings.cottage) AS cottages_reserved\n" + //
                                                        "FROM bookings\n" + //
                                                        "WHERE bookings.created >= NOW() - INTERVAL 1 DAY")) {

            
        ResultSet rs = stmt.executeQuery();
        if(rs.next()){
            return rs.getInt("cottages_reserved");
        }
        }catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int getBookings7() {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select COUNT(DISTINCT bookings.cottage) AS cottages_reserved\n" + //
                                                        "FROM bookings\n" + //
                                                        "WHERE bookings.created >= NOW() - INTERVAL 7 DAY")) {

            
            
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                return rs.getInt("cottages_reserved");
            }
        }catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int getBookings30() {
         try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select COUNT(DISTINCT bookings.cottage) AS cottages_reserved\n" + //
                                                        "FROM bookings\n" + //
                                                        "WHERE bookings.created >= NOW() - INTERVAL 30 DAY")) {

            
            
            ResultSet rs = stmt.executeQuery();
            if(rs.next()){
                return rs.getInt("cottages_reserved");
            }
        }catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Booking> getAllBookings() {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from bookings")) {

            
            List<Booking> bookings = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Booking b = new Booking(
                        rs.getInt("idRes"),
                        rs.getObject("startDate", LocalDateTime.class),
                        rs.getObject("endDate", LocalDateTime.class),
                        rs.getInt("cottage"),
                        rs.getString("user"),
                        rs.getString("request"),
                        rs.getString("status"),
                        rs.getString("comment"),
                        rs.getString("cottage_name"),
                        rs.getObject("created", LocalDateTime.class));
                bookings.add(b);
            }

            return bookings;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }
    
}
