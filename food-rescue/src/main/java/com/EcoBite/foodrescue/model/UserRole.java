package com.EcoBite.foodrescue.model;

public enum UserRole {
    ADMIN("Administrador"),
    DONOR("Doador"),
    VOLUNTEER("Voluntário"),
    ORGANIZATION("Organização");

    private final String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
