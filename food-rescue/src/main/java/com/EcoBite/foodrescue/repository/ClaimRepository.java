package com.EcoBite.foodrescue.repository;

import com.EcoBite.foodrescue.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, String> {
    List<Claim> findByOfferId(String offerId);
}
