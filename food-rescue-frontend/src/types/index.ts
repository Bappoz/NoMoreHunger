// Types for the Food Rescue application
export interface Offer {
  id: string;
  donorName: string;
  donorContact: string;
  description: string;
  portions: number;
  latitude: number;
  longitude: number;
  status: OfferStatus;
  createdAt: string;
  pickupBy: string;
}

export enum OfferStatus {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface CreateOfferRequest {
  donorName: string;
  donorContact: string;
  description: string;
  portions: number;
  latitude: number;
  longitude: number;
  pickupBy: string;
}

export interface Statistics {
  total: number;
  available: number;
  reserved: number;
  inTransit: number;
  delivered: number;
  cancelled: number;
}
