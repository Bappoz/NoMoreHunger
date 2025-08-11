package com.EcoBite.foodrescue.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

/**
 * DTO para criar uma oferta.
 */
public class CreateOfferRequest {
    @NotBlank
    private String donorName;
    @NotBlank
    private String donorContact;
    @NotBlank
    private String description;
    @Min(1)
    private int portions;
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private double latitude;
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private double longitude;
    @NotNull
    private LocalDateTime pickupBy;

    // getters e setters
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
    public LocalDateTime getPickupBy() { return pickupBy; }
    public void setPickupBy(LocalDateTime pickupBy) { this.pickupBy = pickupBy; }
}
