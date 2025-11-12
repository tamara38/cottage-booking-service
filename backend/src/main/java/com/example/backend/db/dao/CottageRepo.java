package com.example.backend.db.dao;

import java.security.Provider.Service;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.backend.db.DB;
import com.example.backend.models.Cottage;
import com.example.backend.models.Prices;
import com.example.backend.models.Review;
import com.example.backend.models.Services;
import com.example.backend.models.User;

public class CottageRepo implements CottageRepoInterface{

    @Override
    public List<Cottage> getAllCottages() {
       try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from cottages")) {

            
            List<Cottage> cottages = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Cottage c = new Cottage(
                        rs.getInt("idC"),
                        rs.getString("name"),
                        rs.getString("location"),
                        rs.getString("owner"),
                        rs.getFloat("rating"),
                        rs.getString("phone"),
                        rs.getFloat("x"),
                        rs.getFloat("y"),
                        rs.getObject("baned", LocalDateTime.class));
                cottages.add(c);
            }

            return cottages;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Services> getAllServices(int cottage) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from services where cottage = ?")) {

            stmt.setInt(1, cottage);
            List<Services> services = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Services s = new Services(
                    rs.getInt("idS"),
                    rs.getInt("cottage"),
                    rs.getString("name"));
                services.add(s);
            }

            return services;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Review> getAllReviews(int cottage) {
       try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from reviews where cottage = ?")) {

            stmt.setInt(1, cottage);
            List<Review> reviews = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Review r = new Review(
                    rs.getInt("idR"),
                    rs.getInt("cottage"),
                    rs.getString("comment"),
                    rs.getFloat("rating"),
                    rs.getString("user"));
                reviews.add(r);
            }

            return reviews;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Prices> getAllPrices(int cottage) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from prices where cottage = ?")) {

            stmt.setInt(1, cottage);
            List<Prices> prices = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Prices p = new Prices(
                    rs.getInt("idP"),
                    rs.getInt("cottage"),
                    rs.getString("period"),
                    rs.getInt("price"));
                prices.add(p);
            }

            return prices;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Cottage> getMyCottages(String owner) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from cottages where owner = ?")) {

            stmt.setString(1, owner);
            List<Cottage> cottages = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Cottage c = new Cottage(
                        rs.getInt("idC"),
                        rs.getString("name"),
                        rs.getString("location"),
                        rs.getString("owner"),
                        rs.getFloat("rating"),
                        rs.getString("phone"),
                        rs.getFloat("x"),
                        rs.getFloat("y"),
                        rs.getObject("baned", LocalDateTime.class));
                cottages.add(c);
            }

            return cottages;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int deleteCottage(Cottage c) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "delete from cottages where idC = ?");
                PreparedStatement stmtServices = conn.prepareStatement(
                        "delete from services where cottage = ?");
                PreparedStatement stmtPrices = conn.prepareStatement(
                        "delete from prices where cottage = ?")) {

            stmt.setInt(1, c.getIdC());
            stmtServices.setInt(1, c.getIdC());
            stmtPrices.setInt(1, c.getIdC());
            
            int s = stmtServices.executeUpdate();
            int p = stmtPrices.executeUpdate();
            //if(s > 0 && p > 0){
            return stmt.executeUpdate();
            //}
            

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }

    @Override
    public int updateCottage(Cottage c) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update cottages set name = ?, location = ?, rating = ?, phone = ?, x = ?, y = ? where idC = ?")) {

            stmt.setString(1, c.getName());
            stmt.setString(2, c.getLocation());
            stmt.setFloat(3, c.getRating());
            stmt.setString(4, c.getPhone());
            stmt.setFloat(5, c.getX());
            stmt.setFloat(6, c.getY());
            stmt.setInt(7, c.getIdC());
        
            return stmt.executeUpdate();
            

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int deleteServices(int idS) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "delete from services where idS = ?")) {

            stmt.setInt(1, idS);
        
            return stmt.executeUpdate();
            

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int updatePrices(int idP, int price) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update prices set price = ? where idP = ?")) {

            stmt.setInt(1, price);
            stmt.setInt(2, idP);
            
        
            return stmt.executeUpdate();
            

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int insertServices(int idC, String name) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "insert into services (idS, cottage, name) values(?, ?, ?)")) {

            stmt.setString(1, null);
            stmt.setInt(2, idC);
            stmt.setString(3, name);
            
        
            return stmt.executeUpdate();
            

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int addCottage(Cottage c) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "insert into cottages (idC, name, location, owner, rating, phone, x, y) values (?, ?, ?, ?, ?, ?, ?, ?)",
                                                Statement.RETURN_GENERATED_KEYS)) {
            
            
            
            stmt.setString(1, null);
            stmt.setString(2, c.getName());
            stmt.setString(3, c.getLocation());
            stmt.setString(4, c.getOwner());
            stmt.setFloat(5, c.getRating());
            stmt.setString(6, c.getPhone());
            stmt.setFloat(7, c.getX());
            stmt.setFloat(8, c.getY());

            int idC = stmt.executeUpdate();

            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    idC = generatedKeys.getInt(1);
                } else {
                    throw new SQLException("Creating booking failed, no ID obtained.");
                }
            }
            
            return idC;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int addPrices(Prices p) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "insert into prices (idP, cottage, period, price) values (?, ?, ?, ?)")) {
            
            
            
            stmt.setString(1, null);
            stmt.setInt(2, p.getIdC());
            stmt.setString(3, p.getPeriod());
            stmt.setInt(4, p.getPrice());
            
            return stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public boolean getBanedReviews(Cottage c) {
         try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select reviews.rating\n" + //
                                                        "from reviews\n" + //
                                                        "where cottage = ?\n" + //
                                                        "order by reviews.idR desc\n" + //
                                                        "limit 3")) {
            stmt.setInt(1, c.getIdC());
            ResultSet rs = stmt.executeQuery();
            int cnt = 0;
            while(rs.next()){
                if(rs.getInt("rating") < 2){
                    cnt++;
                }
            }
            return cnt == 3;

            
            
        }catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public int banCottage(Cottage c) {
         try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update cottages set baned = ? where idC = ?")) {
            System.out.println(c.getBaned());
            stmt.setObject(1, c.getBaned());
            stmt.setInt(2, c.getIdC());
            
        
            return stmt.executeUpdate();
            

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
    
}
