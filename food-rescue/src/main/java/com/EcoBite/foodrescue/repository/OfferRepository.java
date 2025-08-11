package com.EcoBite.foodrescue.repository;

import com.EcoBite.foodrescue.model.Offer;
import com.EcoBite.foodrescue.model.OfferStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, String> {
    List<Offer> findByStatus(OfferStatus status);
    long countByStatus(OfferStatus status);
}
