package com.EcoBite.foodrescue.model;

public enum UserStatus {
    ACTIVE("Ativo"),
    INACTIVE("Inativo"),
    SUSPENDED("Suspenso"),
    PENDING_VERIFICATION("Aguardando Verificação");

    private final String displayName;

    UserStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
