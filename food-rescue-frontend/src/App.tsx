import { useState, useEffect } from "react";
import { Offer, Statistics, OfferStatus } from "./types";
import { offerService } from "./services/api";
import OfferCard from "./components/OfferCard";
import CreateOfferForm from "./components/CreateOfferForm";
import Dashboard from "./components/Dashboard";
import { Heart, Plus, BarChart3, List } from "lucide-react";

function App() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<
    "dashboard" | "offers" | "create"
  >("dashboard");
  const [filterStatus, setFilterStatus] = useState<OfferStatus | "ALL">("ALL");

  const fetchOffers = async () => {
    try {
      const data = await offerService.getAllOffers();
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const stats = await offerService.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchOffers(), fetchStatistics()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleOfferCreated = () => {
    fetchOffers();
    fetchStatistics();
    setCurrentView("offers");
  };

  const handleStatusUpdate = async (offerId: string, action: string) => {
    try {
      switch (action) {
        case "reserve":
          await offerService.reserveOffer(offerId);
          break;
        case "in-transit":
          await offerService.setInTransit(offerId);
          break;
        case "delivered":
          await offerService.setDelivered(offerId);
          break;
        case "cancel":
          await offerService.cancelOffer(offerId);
          break;
        default:
          return;
      }
      await fetchOffers();
      await fetchStatistics();
    } catch (error) {
      console.error("Error updating offer status:", error);
    }
  };

  const filteredOffers =
    filterStatus === "ALL"
      ? offers
      : offers.filter((offer) => offer.status === filterStatus);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50'>
      {/* Header */}
      <header className='bg-white shadow-lg border-b-4 border-green-500'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div className='flex items-center space-x-3'>
              <Heart className='h-8 w-8 text-green-600' />
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>EcoBite</h1>
                <p className='text-sm text-gray-600'>Resgate de Alimentos</p>
              </div>
            </div>

            <nav className='flex space-x-4'>
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === "dashboard"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                <BarChart3 className='h-5 w-5' />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setCurrentView("offers")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === "offers"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                <List className='h-5 w-5' />
                <span>Ofertas</span>
              </button>

              <button
                onClick={() => setCurrentView("create")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === "create"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                <Plus className='h-5 w-5' />
                <span>Nova Oferta</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {currentView === "dashboard" && statistics && (
          <Dashboard statistics={statistics} />
        )}

        {currentView === "offers" && (
          <div>
            <div className='mb-6 flex justify-between items-center'>
              <h2 className='text-2xl font-bold text-gray-900'>
                Ofertas de Alimento
              </h2>

              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as OfferStatus | "ALL")
                }
                className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
              >
                <option value='ALL'>Todos os status</option>
                <option value={OfferStatus.AVAILABLE}>Disponível</option>
                <option value={OfferStatus.RESERVED}>Reservado</option>
                <option value={OfferStatus.IN_TRANSIT}>Em Trânsito</option>
                <option value={OfferStatus.DELIVERED}>Entregue</option>
                <option value={OfferStatus.CANCELLED}>Cancelado</option>
              </select>
            </div>

            {filteredOffers.length === 0 ? (
              <div className='text-center py-12'>
                <Heart className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-gray-600 mb-2'>
                  Nenhuma oferta encontrada
                </h3>
                <p className='text-gray-500'>
                  {filterStatus === "ALL"
                    ? "Não há ofertas cadastradas ainda."
                    : `Não há ofertas com status "${filterStatus}".`}
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredOffers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    onStatusUpdate={(action) =>
                      handleStatusUpdate(offer.id, action)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === "create" && (
          <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Nova Oferta de Alimento
            </h2>
            <CreateOfferForm onOfferCreated={handleOfferCreated} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
