package com.EcoBite.foodrescue.controller;

import com.EcoBite.foodrescue.dto.CreateOfferRequest;
import com.EcoBite.foodrescue.model.Offer;
import com.EcoBite.foodrescue.service.OfferService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class OfferController {
    private final OfferService service;

    public OfferController(OfferService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Offer> create(@Valid @RequestBody CreateOfferRequest req) {
        Offer created = service.createOffer(req);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/available")
    public List<Offer> available() {
        return service.listAvailable();
    }

    @GetMapping
    public List<Offer> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> get(@PathVariable String id) {
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/reserve")
    public ResponseEntity<Offer> reserve(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.markReserved(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/in-transit")
    public ResponseEntity<Offer> setInTransit(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.markInTransit(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/delivered")
    public ResponseEntity<Offer> setDelivered(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.markDelivered(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Offer> cancel(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.markCancelled(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.deleteOffer(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        return ResponseEntity.ok(service.getStatistics());
    }
}
