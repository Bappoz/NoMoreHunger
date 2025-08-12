package com.EcoBite.foodrescue.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateProfileRequest {
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    private String name;
    
    @Size(max = 15, message = "Telefone deve ter no máximo 15 caracteres")
    private String phone;
    
    @Size(max = 255, message = "Endereço deve ter no máximo 255 caracteres")
    private String address;
    
    private Double latitude;
    private Double longitude;
    
    @Size(max = 100, message = "Organização deve ter no máximo 100 caracteres")
    private String organization;
    
    private String preferredContactMethod;
    private NotificationPreferences notifications;

    // Constructors
    public UpdateProfileRequest() {}

    public UpdateProfileRequest(String name, String phone, String address) {
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    // Inner class for notification preferences
    public static class NotificationPreferences {
        private boolean email = true;
        private boolean push = true;
        private boolean sms = false;

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

    @Override
    public String toString() {
        return "UpdateProfileRequest{" +
                "name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", organization='" + organization + '\'' +
                ", preferredContactMethod='" + preferredContactMethod + '\'' +
                '}';
    }
}
