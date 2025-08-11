package com.EcoBite.foodrescue.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Representa uma oferta de alimento.
 */
@Entity
@Table(name = "offers")
public class Offer {
    @Id
    private String id;

    private String donorName;
    private String donorContact;
    private String description;
    private int portions; // número estimado de porções
    private double latitude;
    private double longitude;

    @Enumerated(EnumType.STRING)
    private OfferStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime pickupBy; // horário máximo para retirada

    public Offer() {
        this.id = UUID.randomUUID().toString();
    }

    // getters e setters (gerados)
    public String getId() { return id; }
    public String getDonorName() { return donorName; }
    public void setDonorName(String donorName) { this.donorName = donorName; }
    public String getDonorContact() { return donorContact; }
    public void setDonorContact(String donorContact) { this.donorContact = donorContact; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getPortions() { return portions; }
    public void setPortions(int portions) { this.portions = portions; }
    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }
    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
    public OfferStatus getStatus() { return status; }
    public void setStatus(OfferStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getPickupBy() { return pickupBy; }
    public void setPickupBy(LocalDateTime pickupBy) { this.pickupBy = pickupBy; }
}