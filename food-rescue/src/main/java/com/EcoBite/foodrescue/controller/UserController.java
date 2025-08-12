package com.EcoBite.foodrescue.controller;

import com.EcoBite.foodrescue.dto.UserProfileResponse;
import com.EcoBite.foodrescue.dto.UpdateProfileRequest;
import com.EcoBite.foodrescue.model.User;
import com.EcoBite.foodrescue.model.UserRole;
import com.EcoBite.foodrescue.model.UserStatus;
import com.EcoBite.foodrescue.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserProfileResponse> getProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        UserProfileResponse profile = userService.getUserProfile(user.getId().toString());
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserProfileResponse> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        UserProfileResponse updatedProfile = userService.updateUserProfile(user.getId().toString(), request);
        return ResponseEntity.ok(updatedProfile);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserProfileResponse>> getAllUsers() {
        List<UserProfileResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserProfileResponse> getUserById(@PathVariable String id) {
        UserProfileResponse user = userService.getUserProfile(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            UserStatus status = UserStatus.valueOf(statusUpdate.get("status"));
            userService.updateUserStatus(id, status);
            return ResponseEntity.ok(Map.of("message", "Status atualizado com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/role/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserProfileResponse>> getUsersByRole(@PathVariable String role) {
        try {
            UserRole userRole = UserRole.valueOf(role.toUpperCase());
            List<UserProfileResponse> users = userService.getUsersByRole(userRole);
            return ResponseEntity.ok(users);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/active")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserProfileResponse>> getActiveUsers() {
        List<UserProfileResponse> users = userService.getActiveUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserStatistics() {
        Map<String, Object> stats = Map.of(
            "totalUsers", userService.getAllUsers().size(),
            "activeUsers", userService.getActiveUsers().size(),
            "volunteers", userService.getUsersByRole(UserRole.VOLUNTEER).size(),
            "organizations", userService.getUsersByRole(UserRole.ORGANIZATION).size(),
            "admins", userService.getUsersByRole(UserRole.ADMIN).size()
        );
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/nearby")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<UserProfileResponse>> getUsersNearby(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(defaultValue = "10.0") double radius) {
        List<UserProfileResponse> users = userService.getUsersNearby(latitude, longitude, radius);
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(Map.of("message", "Usuário deletado com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/last-login")
    @PreAuthorize("hasRole('ADMIN') or @userService.isCurrentUser(#id, authentication)")
    public ResponseEntity<?> updateLastLogin(@PathVariable String id) {
        try {
            userService.updateLastLogin(id);
            return ResponseEntity.ok(Map.of("message", "Último login atualizado"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/inactive")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserProfileResponse>> getInactiveUsers(
            @RequestParam(defaultValue = "30") int daysInactive) {
        List<UserProfileResponse> users = userService.getInactiveUsers(daysInactive);
        return ResponseEntity.ok(users);
    }
}
