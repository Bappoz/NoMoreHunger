package com.EcoBite.foodrescue.repository;

import com.EcoBite.foodrescue.model.User;
import com.EcoBite.foodrescue.model.UserRole;
import com.EcoBite.foodrescue.model.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<User> findByRole(UserRole role);
    
    List<User> findByStatus(UserStatus status);
    
    List<User> findByRoleAndStatus(UserRole role, UserStatus status);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.status = :status AND " +
           "u.preferredLatitude IS NOT NULL AND u.preferredLongitude IS NOT NULL AND " +
           "u.notificationsEnabled = true")
    List<User> findActiveUsersWithLocationByRole(@Param("role") UserRole role, @Param("status") UserStatus status);
    
    @Query("SELECT u FROM User u WHERE u.lastLogin < :cutoffDate")
    List<User> findInactiveUsers(@Param("cutoffDate") LocalDateTime cutoffDate);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") UserRole role);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.createdAt BETWEEN :startDate AND :endDate")
    long countNewUsersInPeriod(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
