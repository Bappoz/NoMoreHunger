package com.EcoBite.foodrescue.model;

public enum NotificationType {
    OFFER_CREATED("Nova oferta criada"),
    OFFER_CLAIMED("Oferta reservada"),
    OFFER_IN_TRANSIT("Oferta em trânsito"),
    OFFER_DELIVERED("Oferta entregue"),
    OFFER_CANCELLED("Oferta cancelada"),
    OFFER_EXPIRED("Oferta expirada"),
    NEW_OFFER_NEARBY("Nova oferta próxima"),
    SYSTEM_UPDATE("Atualização do sistema"),
    WELCOME("Bem-vindo"),
    REMINDER("Lembrete");

    private final String displayName;

    NotificationType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
