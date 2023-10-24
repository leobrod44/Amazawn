package com.backend.Entities;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.UUID;

@Entity
@Table
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    protected UUID id;
    @Column
    protected UUID userId;
    @Column
    protected String name;
    @Column
    protected String email;
    @Column
    protected String password;
//    @Column
//    @Value("${arrayOfStrings}")
//    protected List<UUID> shipments;

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public UUID getUserId()
    {
        return userId;
    }

    public void setUserIdID()
    {
        this.userId = UUID.randomUUID();
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }



    public User(){

    }
}
