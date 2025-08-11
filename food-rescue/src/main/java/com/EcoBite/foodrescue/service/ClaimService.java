package com.EcoBite.foodrescue.service;

import com.EcoBite.foodrescue.dto.ClaimOfferRequest;
import com.EcoBite.foodrescue.model.Claim;
import com.EcoBite.foodrescue.model.Offer;
import com.EcoBite.foodrescue.model.OfferStatus;
import com.EcoBite.foodrescue.repository.ClaimRepository;
import com.EcoBite.foodrescue.repository.OfferRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClaimService {
    private final ClaimRepository claimRepo;
    private final OfferRepository offerRepo;

    public ClaimService(ClaimRepository claimRepo, OfferRepository offerRepo) {
        this.claimRepo = claimRepo;
        this.offerRepo = offerRepo;
    }

    /**
     * Reserva uma oferta (troca status para RESERVED e cria claim).
     */
    @Transactional
    public Claim reserve(String offerId, ClaimOfferRequest req) {
        Offer offer = offerRepo.findById(offerId).orElseThrow(() -> new IllegalArgumentException("Offer not found"));

        if (offer.getStatus() != OfferStatus.AVAILABLE) {
            throw new IllegalStateException("Offer not available");
        }

        offer.setStatus(OfferStatus.RESERVED);
        offerRepo.save(offer);

        Claim claim = new Claim();
        claim.setOfferId(offerId);
        claim.setVolunteerName(req.getVolunteerName());
        claim.setVolunteerContact(req.getVolunteerContact());
        return claimRepo.save(claim);
    }

    public List<Claim> findByOfferId(String offerId) {
        return claimRepo.findByOfferId(offerId);
    }
}
