package com.EcoBite.foodrescue.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserProfileResponse {
    
    private String id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private String status;
    private String address;
    private Double latitude;
    private Double longitude;
    private String organization;
    private String preferredContactMethod;
    private NotificationPreferences notifications;
    private UserStats stats;
    private String createdAt;
    private String lastActive;

    // Constructors
    public UserProfileResponse() {}

    public UserProfileResponse(String id, String name, String email, String role, String status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.status = status;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getPreferredContactMethod() {
        return preferredContactMethod;
    }

    public void setPreferredContactMethod(String preferredContactMethod) {
        this.preferredContactMethod = preferredContactMethod;
    }

    public NotificationPreferences getNotifications() {
        return notifications;
    }

    public void setNotifications(NotificationPreferences notifications) {
        this.notifications = notifications;
    }

    public UserStats getStats() {
        return stats;
    }

    public void setStats(UserStats stats) {
        this.stats = stats;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getLastActive() {
        return lastActive;
    }

    public void setLastActive(String lastActive) {
        this.lastActive = lastActive;
    }

    // Inner classes for nested objects
    public static class NotificationPreferences {
        private boolean email;
        private boolean push;
        private boolean sms;

        public NotificationPreferences() {}

        public NotificationPreferences(boolean email, boolean push, boolean sms) {
            this.email = email;
            this.push = push;
            this.sms = sms;
        }

        public boolean isEmail() {
            return email;
        }

        public void setEmail(boolean email) {
            this.email = email;
        }

        public boolean isPush() {
            return push;
        }

        public void setPush(boolean push) {
            this.push = push;
        }

        public boolean isSms() {
            return sms;
        }

        public void setSms(boolean sms) {
            this.sms = sms;
        }
    }

    public static class UserStats {
        private int donationsGiven;
        private int donationsReceived;
        private int volunteeredHours;
        private double rating;
        private int reviewCount;

        public UserStats() {}

        public UserStats(int donationsGiven, int donationsReceived, int volunteeredHours, double rating, int reviewCount) {
            this.donationsGiven = donationsGiven;
            this.donationsReceived = donationsReceived;
            this.volunteeredHours = volunteeredHours;
            this.rating = rating;
            this.reviewCount = reviewCount;
        }

        public int getDonationsGiven() {
            return donationsGiven;
        }

        public void setDonationsGiven(int donationsGiven) {
            this.donationsGiven = donationsGiven;
        }

        public int getDonationsReceived() {
            return donationsReceived;
        }

        public void setDonationsReceived(int donationsReceived) {
            this.donationsReceived = donationsReceived;
        }

        public int getVolunteeredHours() {
            return volunteeredHours;
        }

        public void setVolunteeredHours(int volunteeredHours) {
            this.volunteeredHours = volunteeredHours;
        }

        public double getRating() {
            return rating;
        }

        public void setRating(double rating) {
            this.rating = rating;
        }

        public int getReviewCount() {
            return reviewCount;
        }

        public void setReviewCount(int reviewCount) {
            this.reviewCount = reviewCount;
        }
    }
}
