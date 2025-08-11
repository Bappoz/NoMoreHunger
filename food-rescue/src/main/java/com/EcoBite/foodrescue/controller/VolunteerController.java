package com.EcoBite.foodrescue.controller;

import com.EcoBite.foodrescue.dto.ClaimOfferRequest;
import com.EcoBite.foodrescue.model.Claim;
import com.EcoBite.foodrescue.service.ClaimService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/claims")
public class VolunteerController {
    private final ClaimService service;

    public VolunteerController(ClaimService service) {
        this.service = service;
    }

    @PostMapping("/offer/{offerId}")
    public ResponseEntity<?> claimOffer(@PathVariable String offerId, @Valid @RequestBody ClaimOfferRequest req) {
        try {
            Claim claim = service.reserve(offerId, req);
            return ResponseEntity.ok(claim);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }
}
