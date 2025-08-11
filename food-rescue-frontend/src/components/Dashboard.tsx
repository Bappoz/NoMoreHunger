import { Statistics } from "../types";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";

interface DashboardProps {
  statistics: Statistics;
}

const Dashboard = ({ statistics }: DashboardProps) => {
  const stats = [
    {
      name: "Total de Ofertas",
      value: statistics.total,
      icon: BarChart3,
      color: "bg-blue-500",
    },
    {
      name: "Disponíveis",
      value: statistics.available,
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      name: "Reservadas",
      value: statistics.reserved,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      name: "Entregues",
      value: statistics.delivered,
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  const deliveryRate =
    statistics.total > 0
      ? ((statistics.delivered / statistics.total) * 100).toFixed(1)
      : "0";

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-3xl font-bold text-gray-900 mb-2'>Dashboard</h2>
        <p className='text-gray-600'>
          Visão geral do sistema de resgate de alimentos
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className='bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    {stat.name}
                  </p>
                  <p className='text-3xl font-bold text-gray-900'>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className='h-6 w-6 text-white' />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Stats */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Progress Chart */}
        <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-6'>
          <h3 className='text-xl font-semibold text-gray-900 mb-4'>
            Status das Ofertas
          </h3>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-sm font-medium text-gray-600'>
                Disponíveis
              </span>
              <span className='text-sm font-medium text-green-600'>
                {statistics.available}
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-green-500 h-2 rounded-full'
                style={{
                  width:
                    statistics.total > 0
                      ? `${(statistics.available / statistics.total) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-sm font-medium text-gray-600'>
                Reservadas
              </span>
              <span className='text-sm font-medium text-yellow-600'>
                {statistics.reserved}
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-yellow-500 h-2 rounded-full'
                style={{
                  width:
                    statistics.total > 0
                      ? `${(statistics.reserved / statistics.total) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-sm font-medium text-gray-600'>
                Em Trânsito
              </span>
              <span className='text-sm font-medium text-blue-600'>
                {statistics.inTransit}
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-blue-500 h-2 rounded-full'
                style={{
                  width:
                    statistics.total > 0
                      ? `${(statistics.inTransit / statistics.total) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-sm font-medium text-gray-600'>
                Entregues
              </span>
              <span className='text-sm font-medium text-purple-600'>
                {statistics.delivered}
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-purple-500 h-2 rounded-full'
                style={{
                  width:
                    statistics.total > 0
                      ? `${(statistics.delivered / statistics.total) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-sm font-medium text-gray-600'>
                Canceladas
              </span>
              <span className='text-sm font-medium text-red-600'>
                {statistics.cancelled}
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-red-500 h-2 rounded-full'
                style={{
                  width:
                    statistics.total > 0
                      ? `${(statistics.cancelled / statistics.total) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-6'>
          <h3 className='text-xl font-semibold text-gray-900 mb-4'>Resumo</h3>
          <div className='space-y-4'>
            <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
              <div className='flex items-center'>
                <TrendingUp className='h-5 w-5 text-green-600 mr-2' />
                <span className='text-sm font-medium text-green-800'>
                  Taxa de Entrega
                </span>
              </div>
              <p className='text-2xl font-bold text-green-900 mt-2'>
                {deliveryRate}%
              </p>
              <p className='text-sm text-green-700'>
                {statistics.delivered} de {statistics.total} ofertas foram
                entregues
              </p>
            </div>

            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
              <div className='flex items-center'>
                <Users className='h-5 w-5 text-blue-600 mr-2' />
                <span className='text-sm font-medium text-blue-800'>
                  Ofertas Ativas
                </span>
              </div>
              <p className='text-2xl font-bold text-blue-900 mt-2'>
                {statistics.available +
                  statistics.reserved +
                  statistics.inTransit}
              </p>
              <p className='text-sm text-blue-700'>
                Ofertas em processo (disponíveis, reservadas ou em trânsito)
              </p>
            </div>

            <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
              <div className='flex items-center'>
                <BarChart3 className='h-5 w-5 text-gray-600 mr-2' />
                <span className='text-sm font-medium text-gray-800'>
                  Impacto Total
                </span>
              </div>
              <p className='text-2xl font-bold text-gray-900 mt-2'>
                {statistics.total}
              </p>
              <p className='text-sm text-gray-700'>
                Total de ofertas de alimento registradas no sistema
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
