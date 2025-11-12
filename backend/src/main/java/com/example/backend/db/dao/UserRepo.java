package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.backend.db.DB;
import com.example.backend.models.User;

public class UserRepo implements UserRepoInterface{

    @Override
    public User login(User u) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from users where username = ? and status = 'active'")) {

            stmt.setString(1, u.getUsername());
            
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {

                String encodedPassword = rs.getString("password");
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

                if(encoder.matches(u.getPassword(), encodedPassword)){
                    return new User(
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("firstname"),
                        rs.getString("lastname"),
                        rs.getString("gender").charAt(0),
                        rs.getString("address"),
                        rs.getString("phone"),
                        rs.getString("email"),
                        rs.getString("prof_img"),
                        rs.getString("type"),
                        rs.getString("card"),
                        rs.getString("status"),
                        rs.getString("oldUsername"));
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }
    

    @Override
    public int register(User u) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "insert into users (username, password, firstname, lastname, gender, address, phone, email, prof_img, type, card, status) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {
            
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String encryptedPassword = encoder.encode(u.getPassword());
            System.out.println(u.getProf_img());
            stmt.setString(1, u.getUsername());
            stmt.setString(2, encryptedPassword);
            stmt.setString(3, u.getFirstname());
            stmt.setString(4, u.getLastname());
            stmt.setString(5, String.valueOf(u.getGender()));
            stmt.setString(6, u.getAddress());
            stmt.setString(7, u.getPhone());
            stmt.setString(8, u.getEmail());
            stmt.setString(9, u.getProf_img());
            stmt.setString(10, u.getType());
            stmt.setString(11, u.getCard());
            stmt.setString(12, u.getStatus());
            //System.out.println("uslo");
            return stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int changePassword(String username, String oldPassword, String newPassword) {
         try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt2 = conn.prepareStatement(
                        "update users set password = ? where username = ? and status = 'active'");
                        PreparedStatement stmt1 = conn.prepareStatement(
                        "select * from users where username = ? and status = 'active'")) {
            
            stmt1.setString(1, username);
            ResultSet rs = stmt1.executeQuery();
            if(rs.next()){
                String encryptedOld = rs.getString("password");
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                if(encoder.matches(oldPassword, encryptedOld)){
                    String encryptedNew = encoder.encode(newPassword);
                    stmt2.setString(1, encryptedNew);
                    stmt2.setString(2, username);
                    System.out.println(newPassword);
                    return stmt2.executeUpdate();
                }
            }
            

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }


    @Override
    public int updateFirstname(User u) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update users set firstname = ? where username = ?")) {
            
            stmt.setString(1, u.getFirstname());
            stmt.setString(2, u.getUsername());
            
            return stmt.executeUpdate();
        
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }


    @Override
    public int updateLastname(User u) {
       try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update users set lastname = ? where username = ?")) {
            
            stmt.setString(1, u.getLastname());
            stmt.setString(2, u.getUsername());
            
            return stmt.executeUpdate();
        
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }


    @Override
    public int updateAddress(User u) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update users set address = ? where username = ?")) {
            
            stmt.setString(1, u.getAddress());
            stmt.setString(2, u.getUsername());
            
            return stmt.executeUpdate();
        
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }


    @Override
    public int updateEmail(User u) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update users set email = ? where username = ?")) {
            
            stmt.setString(1, u.getEmail());
            stmt.setString(2, u.getUsername());
            
            return stmt.executeUpdate();
        
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }


    @Override
    public int updatePhone(User u) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update users set phone = ? where username = ?")) {
            
            stmt.setString(1, u.getPhone());
            stmt.setString(2, u.getUsername());
            
            return stmt.executeUpdate();
        
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }


    @Override
    public int updateCard(User u) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update users set card = ? where username = ?")) {
            
            stmt.setString(1, u.getCard());
            stmt.setString(2, u.getUsername());
            
            return stmt.executeUpdate();
        
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }


    @Override
    public int updateProfPic(User u) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update users set prof_img = ? where username = ?")) {
            
            stmt.setString(1, u.getProf_img());
            stmt.setString(2, u.getUsername());
            
            return stmt.executeUpdate();
        
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }


    @Override
    public List<User> getAll() {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from users")) {

            
            List<User> pending = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                User u = new User(
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("firstname"),
                        rs.getString("lastname"),
                        rs.getString("gender").charAt(0),
                        rs.getString("address"),
                        rs.getString("phone"),
                        rs.getString("email"),
                        rs.getString("prof_img"),
                        rs.getString("type"),
                        rs.getString("card"),
                        rs.getString("status"),
                        rs.getString("oldUsername"));
                pending.add(u);
            }

            return pending;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }


    @Override
    public List<User> getAllTourists() {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from users where type = 'tourist'")) {

            
            List<User> tourists = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                User u = new User(
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("firstname"),
                        rs.getString("lastname"),
                        rs.getString("gender").charAt(0),
                        rs.getString("address"),
                        rs.getString("phone"),
                        rs.getString("email"),
                        rs.getString("prof_img"),
                        rs.getString("type"),
                        rs.getString("card"),
                        rs.getString("status"),
                        rs.getString("oldUsername"));
                tourists.add(u);
            }

            return tourists;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }


    @Override
    public List<User> getAllOwners() {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from users where type = 'owner'")) {

            
            List<User> owners = new ArrayList<>();
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                User u = new User(
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("firstname"),
                        rs.getString("lastname"),
                        rs.getString("gender").charAt(0),
                        rs.getString("address"),
                        rs.getString("phone"),
                        rs.getString("email"),
                        rs.getString("prof_img"),
                        rs.getString("type"),
                        rs.getString("card"),
                        rs.getString("status"),
                        rs.getString("oldUsername"));
                owners.add(u);
            }

            return owners;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }


    @Override
    public int deleteUser(User u) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "delete from users where username = ?")) {
            
            
            stmt.setString(1, u.getUsername());
            
            return stmt.executeUpdate();
        
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }


    @Override
    public int updateStatus(User u) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update users set status = ? where username = ?")) {
            System.out.println(u.getStatus());
            stmt.setString(1, u.getStatus());
            stmt.setString(2, u.getUsername());
            
            return stmt.executeUpdate();
        
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }


    @Override
    public User adminLogin(User u) {
         try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "select * from users where username = ? and password = ?")) {

            stmt.setString(1, u.getUsername());
            stmt.setString(2, u.getPassword());
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new User(
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("firstname"),
                        rs.getString("lastname"),
                        rs.getString("gender").charAt(0),
                        rs.getString("address"),
                        rs.getString("phone"),
                        rs.getString("email"),
                        rs.getString("prof_img"),
                        rs.getString("type"),
                        rs.getString("card"),
                        rs.getString("status"),
                        rs.getString("oldUsername"));
                
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }


    @Override
    public int updateUser(User u) {
         try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement(
                        "update users set username ?, firstname = ?, lastname ?, gender = ?, address = ?, phone = ?, email = ?, prof_img = ?, type = ?, card = ? where username = ?")) {
            
            
            
            stmt.setString(1, u.getUsername());
            stmt.setString(2, u.getFirstname());
            stmt.setString(3, u.getLastname());
            stmt.setString(4, String.valueOf(u.getGender()));
            stmt.setString(5, u.getAddress());
            stmt.setString(6, u.getPhone());
            stmt.setString(7, u.getEmail());
            stmt.setString(8, u.getProf_img());
            stmt.setString(9, u.getType());
            stmt.setString(10, u.getCard());
            stmt.setString(11, u.getOldUsername());
            
            
            return stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
    
}
