package com.EcoBite.foodrescue.model;


import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Representa uma reserva/claim feita por um voluntário.
 */
@Entity
@Table(name = "claims")
public class Claim {
    @Id
    private String id;

    private String offerId;
    private String volunteerName;
    private String volunteerContact;
    private LocalDateTime reservedAt;

    public Claim() {
        this.id = UUID.randomUUID().toString();
        this.reservedAt = LocalDateTime.now();
    }

    // getters e setters
    public String getId() { return id; }
    public String getOfferId() { return offerId; }
    public void setOfferId(String offerId) { this.offerId = offerId; }
    public String getVolunteerName() { return volunteerName; }
    public void setVolunteerName(String volunteerName) { this.volunteerName = volunteerName; }
    public String getVolunteerContact() { return volunteerContact; }
    public void setVolunteerContact(String volunteerContact) { this.volunteerContact = volunteerContact; }
    public LocalDateTime getReservedAt() { return reservedAt; }
    public void setReservedAt(LocalDateTime reservedAt) { this.reservedAt = reservedAt; }
}
