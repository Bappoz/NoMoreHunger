package com.EcoBite.foodrescue.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO para um voluntário reservar uma oferta.
 */
public class ClaimOfferRequest {
    @NotBlank
    private String volunteerName;
    @NotBlank
    private String volunteerContact;

    // getters/setters
    public String getVolunteerName() { return volunteerName; }
    public void setVolunteerName(String volunteerName) { this.volunteerName = volunteerName; }
    public String getVolunteerContact() { return volunteerContact; }
    public void setVolunteerContact(String volunteerContact) { this.volunteerContact = volunteerContact; }
}
