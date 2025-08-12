package com.EcoBite.foodrescue.dto;

import com.EcoBite.foodrescue.model.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    private String name;
    
    @Email(message = "Email deve ser válido")
    @NotBlank(message = "Email é obrigatório")
    private String email;
    
    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
    private String password;
    
    private String phoneNumber;
    
    @NotNull(message = "Tipo de usuário é obrigatório")
    private UserRole role;
    
    // Location preferences (optional)
    private Double preferredLatitude;
    private Double preferredLongitude;
    private Integer maxDistanceKm = 10;
    
    // Notification preferences
    private Boolean notificationsEnabled = true;
    private Boolean emailNotifications = true;
    
    // Constructors
    public RegisterRequest() {}
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }
    
    public Double getPreferredLatitude() { return preferredLatitude; }
    public void setPreferredLatitude(Double preferredLatitude) { this.preferredLatitude = preferredLatitude; }
    
    public Double getPreferredLongitude() { return preferredLongitude; }
    public void setPreferredLongitude(Double preferredLongitude) { this.preferredLongitude = preferredLongitude; }
    
    public Integer getMaxDistanceKm() { return maxDistanceKm; }
    public void setMaxDistanceKm(Integer maxDistanceKm) { this.maxDistanceKm = maxDistanceKm; }
    
    public Boolean getNotificationsEnabled() { return notificationsEnabled; }
    public void setNotificationsEnabled(Boolean notificationsEnabled) { this.notificationsEnabled = notificationsEnabled; }
    
    public Boolean getEmailNotifications() { return emailNotifications; }
    public void setEmailNotifications(Boolean emailNotifications) { this.emailNotifications = emailNotifications; }
}
