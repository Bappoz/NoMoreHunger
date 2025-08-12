package com.EcoBite.foodrescue.service;

import com.EcoBite.foodrescue.dto.UpdateProfileRequest;
import com.EcoBite.foodrescue.dto.UserProfileResponse;
import com.EcoBite.foodrescue.model.User;
import com.EcoBite.foodrescue.model.UserRole;
import com.EcoBite.foodrescue.model.UserStatus;
import com.EcoBite.foodrescue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    /**
     * Buscar usuário por ID
     */
    public Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }

    /**
     * Buscar usuário por ID String (converte para UUID)
     */
    public Optional<User> findById(String id) {
        try {
            return userRepository.findById(UUID.fromString(id));
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }
    }

    /**
     * Buscar usuário por email
     */
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Listar todos os usuários
     */
    public List<UserProfileResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::convertToProfileResponse)
                .collect(Collectors.toList());
    }

    /**
     * Obter perfil do usuário
     */
    public UserProfileResponse getUserProfile(String userId) {
        User user = findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        return convertToProfileResponse(user);
    }

    /**
     * Atualizar perfil do usuário
     */
    public UserProfileResponse updateUserProfile(String userId, UpdateProfileRequest request) {
        User user = findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Atualizar campos básicos
        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getPhone() != null) {
            user.setPhoneNumber(request.getPhone());
        }
        if (request.getLatitude() != null) {
            user.setPreferredLatitude(request.getLatitude());
        }
        if (request.getLongitude() != null) {
            user.setPreferredLongitude(request.getLongitude());
        }

        // Atualizar preferências de notificação
        if (request.getNotifications() != null) {
            user.setEmailNotifications(request.getNotifications().isEmail());
            user.setNotificationsEnabled(request.getNotifications().isPush());
        }

        user.setUpdatedAt(LocalDateTime.now());
        User savedUser = userRepository.save(user);
        
        return convertToProfileResponse(savedUser);
    }

    /**
     * Buscar usuários por role
     */
    public List<UserProfileResponse> getUsersByRole(UserRole role) {
        List<User> users = userRepository.findByRole(role);
        return users.stream()
                .map(this::convertToProfileResponse)
                .collect(Collectors.toList());
    }

    /**
     * Buscar usuários ativos
     */
    public List<UserProfileResponse> getActiveUsers() {
        List<User> users = userRepository.findByStatus(UserStatus.ACTIVE);
        return users.stream()
                .map(this::convertToProfileResponse)
                .collect(Collectors.toList());
    }

    /**
     * Atualizar status do usuário
     */
    public UserProfileResponse updateUserStatus(String userId, UserStatus status) {
        User user = findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        user.setStatus(status);
        user.setUpdatedAt(LocalDateTime.now());
        User savedUser = userRepository.save(user);
        
        return convertToProfileResponse(savedUser);
    }

    /**
     * Criar novo usuário (para uso interno/admin)
     */
    public User createUser(String name, String email, String password, UserRole role) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email já está em uso");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setStatus(UserStatus.ACTIVE);
        user.setEmailNotifications(true);
        user.setNotificationsEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setLastLogin(LocalDateTime.now());

        return userRepository.save(user);
    }

    /**
     * Atualizar último login
     */
    public void updateLastLogin(String userId) {
        findById(userId).ifPresent(user -> {
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
        });
    }

    /**
     * Verificar se email já existe
     */
    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    /**
     * Converter User para UserProfileResponse
     */
    private UserProfileResponse convertToProfileResponse(User user) {
        UserProfileResponse response = new UserProfileResponse();
        response.setId(user.getId().toString());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhoneNumber());
        response.setRole(user.getRole().name());
        response.setStatus(user.getStatus().name());
        response.setLatitude(user.getPreferredLatitude());
        response.setLongitude(user.getPreferredLongitude());
        
        // Configurar preferências de notificação
        UserProfileResponse.NotificationPreferences notifications = 
            new UserProfileResponse.NotificationPreferences(
                user.getEmailNotifications() != null ? user.getEmailNotifications() : false,
                user.getNotificationsEnabled() != null ? user.getNotificationsEnabled() : false,
                false // SMS não implementado no User model atual
            );
        response.setNotifications(notifications);

        // Configurar estatísticas (valores padrão por enquanto)
        UserProfileResponse.UserStats stats = new UserProfileResponse.UserStats(
            0, // donationsGiven
            0, // donationsReceived  
            0, // volunteeredHours
            0.0, // rating
            0 // reviewCount
        );
        response.setStats(stats);

        // Formatar datas
        if (user.getCreatedAt() != null) {
            response.setCreatedAt(user.getCreatedAt().format(formatter));
        }
        if (user.getLastLogin() != null) {
            response.setLastActive(user.getLastLogin().format(formatter));
        }

        return response;
    }

    /**
     * Buscar usuários próximos (para funcionalidades futuras)
     */
    public List<UserProfileResponse> getUsersNearby(double latitude, double longitude, double radiusKm) {
        // Esta seria uma implementação futura usando PostGIS ou cálculos de distância
        // Por enquanto, retorna todos os usuários ativos
        return getActiveUsers();
    }

    /**
     * Deletar usuário (soft delete)
     */
    public void deleteUser(String userId) {
        User user = findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        user.setStatus(UserStatus.INACTIVE);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    /**
     * Contar usuários por role
     */
    public long countUsersByRole(UserRole role) {
        return userRepository.countByRole(role);
    }

    /**
     * Buscar usuários inativos
     */
    public List<UserProfileResponse> getInactiveUsers(int daysInactive) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(daysInactive);
        List<User> users = userRepository.findInactiveUsers(cutoffDate);
        return users.stream()
                .map(this::convertToProfileResponse)
                .collect(Collectors.toList());
    }
}
