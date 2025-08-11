package com.EcoBite.foodrescue.controller;

import com.EcoBite.foodrescue.service.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/org")
public class OrganizationController {
    private final ClaimService claimService;

    public OrganizationController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @GetMapping("/claims/{offerId}")
    public ResponseEntity<?> claimsForOffer(@PathVariable String offerId) {
        return ResponseEntity.ok(claimService.findByOfferId(offerId));
    }
}
