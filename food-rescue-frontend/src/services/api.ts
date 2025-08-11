import axios from "axios";
import { Offer, CreateOfferRequest, Statistics } from "../types";

const API_BASE_URL = "http://localhost:8081/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const offerService = {
  // Get all offers
  getAllOffers: (): Promise<Offer[]> =>
    api.get("/offers").then((response) => response.data),

  // Get available offers
  getAvailableOffers: (): Promise<Offer[]> =>
    api.get("/offers/available").then((response) => response.data),

  // Get offer by ID
  getOfferById: (id: string): Promise<Offer> =>
    api.get(`/offers/${id}`).then((response) => response.data),

  // Create new offer
  createOffer: (offer: CreateOfferRequest): Promise<Offer> =>
    api.post("/offers", offer).then((response) => response.data),

  // Update offer status
  reserveOffer: (id: string): Promise<Offer> =>
    api.post(`/offers/${id}/reserve`).then((response) => response.data),

  setInTransit: (id: string): Promise<Offer> =>
    api.post(`/offers/${id}/in-transit`).then((response) => response.data),

  setDelivered: (id: string): Promise<Offer> =>
    api.post(`/offers/${id}/delivered`).then((response) => response.data),

  cancelOffer: (id: string): Promise<Offer> =>
    api.post(`/offers/${id}/cancel`).then((response) => response.data),

  // Delete offer
  deleteOffer: (id: string): Promise<void> =>
    api.delete(`/offers/${id}`).then((response) => response.data),

  // Get statistics
  getStatistics: (): Promise<Statistics> =>
    api.get("/offers/stats").then((response) => response.data),
};
