import { Offer, OfferStatus } from "../types";
import { MapPin, Clock, Users, Phone } from "lucide-react";

interface OfferCardProps {
  offer: Offer;
  onStatusUpdate: (action: string) => void;
}

const statusColors = {
  [OfferStatus.AVAILABLE]: "bg-green-100 text-green-800",
  [OfferStatus.RESERVED]: "bg-yellow-100 text-yellow-800",
  [OfferStatus.IN_TRANSIT]: "bg-blue-100 text-blue-800",
  [OfferStatus.DELIVERED]: "bg-gray-100 text-gray-800",
  [OfferStatus.CANCELLED]: "bg-red-100 text-red-800",
};

const statusLabels = {
  [OfferStatus.AVAILABLE]: "Disponível",
  [OfferStatus.RESERVED]: "Reservado",
  [OfferStatus.IN_TRANSIT]: "Em Trânsito",
  [OfferStatus.DELIVERED]: "Entregue",
  [OfferStatus.CANCELLED]: "Cancelado",
};

const OfferCard = ({ offer, onStatusUpdate }: OfferCardProps) => {
  const getAvailableActions = () => {
    switch (offer.status) {
      case OfferStatus.AVAILABLE:
        return [
          {
            action: "reserve",
            label: "Reservar",
            color: "bg-yellow-500 hover:bg-yellow-600",
          },
          {
            action: "cancel",
            label: "Cancelar",
            color: "bg-red-500 hover:bg-red-600",
          },
        ];
      case OfferStatus.RESERVED:
        return [
          {
            action: "in-transit",
            label: "Em Trânsito",
            color: "bg-blue-500 hover:bg-blue-600",
          },
          {
            action: "cancel",
            label: "Cancelar",
            color: "bg-red-500 hover:bg-red-600",
          },
        ];
      case OfferStatus.IN_TRANSIT:
        return [
          {
            action: "delivered",
            label: "Entregue",
            color: "bg-green-500 hover:bg-green-600",
          },
        ];
      default:
        return [];
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300'>
      {/* Status Badge */}
      <div className='p-4 border-b border-gray-100'>
        <div className='flex justify-between items-start'>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[offer.status]
            }`}
          >
            {statusLabels[offer.status]}
          </span>
          <div className='text-right'>
            <p className='text-sm text-gray-500'>ID: {offer.id.slice(0, 8)}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
          {offer.description}
        </h3>

        <div className='space-y-2 mb-4'>
          <div className='flex items-center text-gray-600'>
            <Users className='h-4 w-4 mr-2' />
            <span className='text-sm'>{offer.portions} porções</span>
          </div>

          <div className='flex items-center text-gray-600'>
            <MapPin className='h-4 w-4 mr-2' />
            <span className='text-sm'>
              {offer.latitude.toFixed(4)}, {offer.longitude.toFixed(4)}
            </span>
          </div>

          <div className='flex items-center text-gray-600'>
            <Clock className='h-4 w-4 mr-2' />
            <span className='text-sm'>
              Retirar até: {formatDate(offer.pickupBy)}
            </span>
          </div>
        </div>

        {/* Donor Info */}
        <div className='bg-gray-50 rounded-lg p-3 mb-4'>
          <h4 className='font-medium text-gray-900 mb-1'>{offer.donorName}</h4>
          <div className='flex items-center text-gray-600'>
            <Phone className='h-4 w-4 mr-2' />
            <span className='text-sm'>{offer.donorContact}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap gap-2'>
          {getAvailableActions().map(({ action, label, color }) => (
            <button
              key={action}
              onClick={() => onStatusUpdate(action)}
              className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${color}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Created At */}
        <div className='mt-4 pt-3 border-t border-gray-100'>
          <p className='text-xs text-gray-500'>
            Criado em: {formatDate(offer.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
