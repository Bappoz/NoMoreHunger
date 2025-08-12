package com.EcoBite.foodrescue.repository;

import com.EcoBite.foodrescue.model.Notification;
import com.EcoBite.foodrescue.model.NotificationType;
import com.EcoBite.foodrescue.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    
    Page<Notification> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    
    List<Notification> findByUserAndIsReadFalseOrderByCreatedAtDesc(User user);
    
    long countByUserAndIsReadFalse(User user);
    
    List<Notification> findByUserAndTypeOrderByCreatedAtDesc(User user, NotificationType type);
    
    @Modifying
    @Query("UPDATE Notification n SET n.isRead = true, n.readAt = :readAt WHERE n.user = :user AND n.isRead = false")
    void markAllAsReadForUser(@Param("user") User user, @Param("readAt") LocalDateTime readAt);
    
    @Modifying
    @Query("DELETE FROM Notification n WHERE n.createdAt < :cutoffDate")
    void deleteOldNotifications(@Param("cutoffDate") LocalDateTime cutoffDate);
    
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.createdAt BETWEEN :startDate AND :endDate")
    long countNotificationsInPeriod(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    List<Notification> findByRelatedOfferIdOrderByCreatedAtDesc(UUID offerId);
    
    List<Notification> findByRelatedClaimIdOrderByCreatedAtDesc(UUID claimId);
}
