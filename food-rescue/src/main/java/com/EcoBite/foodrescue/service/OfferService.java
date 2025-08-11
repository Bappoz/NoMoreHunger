package com.EcoBite.foodrescue.service;

import com.EcoBite.foodrescue.dto.CreateOfferRequest;
import com.EcoBite.foodrescue.model.Offer;
import com.EcoBite.foodrescue.model.OfferStatus;
import com.EcoBite.foodrescue.repository.OfferRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OfferService {
    private final OfferRepository repo;

    public OfferService(OfferRepository repo) {
        this.repo = repo;
    }

    public Offer createOffer(CreateOfferRequest req) {
        Offer offer = new Offer();
        offer.setDonorName(req.getDonorName());
        offer.setDonorContact(req.getDonorContact());
        offer.setDescription(req.getDescription());
        offer.setPortions(req.getPortions());
        offer.setLatitude(req.getLatitude());
        offer.setLongitude(req.getLongitude());
        offer.setPickupBy(req.getPickupBy());
        offer.setCreatedAt(LocalDateTime.now());
        offer.setStatus(OfferStatus.AVAILABLE);
        return repo.save(offer);
    }

    public List<Offer> listAvailable() {
        return repo.findByStatus(OfferStatus.AVAILABLE);
    }

    public Optional<Offer> findById(String id) {
        return repo.findById(id);
    }

    @Transactional
    public Offer markInTransit(String id) {
        Offer offer = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Offer not found"));
        offer.setStatus(OfferStatus.IN_TRANSIT);
        return repo.save(offer);
    }

    @Transactional
    public Offer markDelivered(String id) {
        Offer offer = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Offer not found"));
        offer.setStatus(OfferStatus.DELIVERED);
        return repo.save(offer);
    }

    @Transactional
    public Offer markReserved(String id) {
        Offer offer = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Offer not found"));
        offer.setStatus(OfferStatus.RESERVED);
        return repo.save(offer);
    }

    @Transactional
    public Offer markCancelled(String id) {
        Offer offer = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Offer not found"));
        offer.setStatus(OfferStatus.CANCELLED);
        return repo.save(offer);
    }

    public List<Offer> findAll() {
        return repo.findAll();
    }

    @Transactional
    public void deleteOffer(String id) {
        repo.deleteById(id);
    }

    public java.util.Map<String, Object> getStatistics() {
        java.util.Map<String, Object> stats = new java.util.HashMap<>();
        stats.put("total", repo.count());
        stats.put("available", repo.countByStatus(OfferStatus.AVAILABLE));
        stats.put("reserved", repo.countByStatus(OfferStatus.RESERVED));
        stats.put("inTransit", repo.countByStatus(OfferStatus.IN_TRANSIT));
        stats.put("delivered", repo.countByStatus(OfferStatus.DELIVERED));
        stats.put("cancelled", repo.countByStatus(OfferStatus.CANCELLED));
        return stats;
    }
}
