package com.EcoBite.foodrescue.service;

import com.EcoBite.foodrescue.dto.CreateOfferRequest;
import com.EcoBite.foodrescue.model.Offer;
import com.EcoBite.foodrescue.repository.OfferRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class OfferServiceTest {

    @Autowired
    private OfferRepository repo;

    @Test
    public void createOffer_and_find() {
        OfferService service = new OfferService(repo);

        CreateOfferRequest req = new CreateOfferRequest();
        req.setDonorName("Restaurante A");
        req.setDonorContact("555-1111");
        req.setDescription("Sobras de almoço");
        req.setPortions(20);
        req.setLatitude(-23.5);
        req.setLongitude(-46.6);
        req.setPickupBy(LocalDateTime.now().plusHours(4));

        Offer created = service.createOffer(req);
        assertNotNull(created.getId());

        Offer found = service.findById(created.getId()).orElse(null);
        assertNotNull(found);
        assertEquals(created.getId(), found.getId());
        assertEquals("AVAILABLE", found.getStatus().name());
    }
}
