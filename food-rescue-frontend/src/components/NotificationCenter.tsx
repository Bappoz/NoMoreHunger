import { useState, useEffect } from "react";
import { Bell, X, Check, Clock, AlertCircle, Info } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications - em produção viria da API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "Nova oferta próxima!",
        message:
          "Restaurante Exemplo tem 20 marmitas disponíveis a 1.2km de você",
        type: "info",
        isRead: false,
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 min ago
        actionUrl: "/offers",
      },
      {
        id: "2",
        title: "Oferta reservada com sucesso",
        message:
          "Você reservou 10 marmitas do Supermercado Central. Retire até 18:00.",
        type: "success",
        isRead: false,
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 min ago
      },
      {
        id: "3",
        title: "Oferta expirando em breve",
        message: 'A oferta "Pães variados" expira em 30 minutos.',
        type: "warning",
        isRead: true,
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.isRead).length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification && !notification.isRead) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <Check className='h-5 w-5 text-green-600' />;
      case "warning":
        return <Clock className='h-5 w-5 text-yellow-600' />;
      case "error":
        return <AlertCircle className='h-5 w-5 text-red-600' />;
      default:
        return <Info className='h-5 w-5 text-blue-600' />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = Date.now();
    const time = new Date(timestamp).getTime();
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));

    if (diffInMinutes < 1) return "Agora";
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  };

  return (
    <div className='relative'>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
        aria-label='Notificações'
      >
        <Bell className='h-6 w-6' />
        {unreadCount > 0 && (
          <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-40'
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className='absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden'>
            {/* Header */}
            <div className='px-4 py-3 border-b border-gray-200 bg-gray-50'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Notificações
                </h3>
                <div className='flex items-center space-x-2'>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className='text-sm text-blue-600 hover:text-blue-800'
                    >
                      Marcar todas como lidas
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className='text-gray-400 hover:text-gray-600'
                  >
                    <X className='h-5 w-5' />
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className='max-h-80 overflow-y-auto'>
              {notifications.length === 0 ? (
                <div className='p-8 text-center text-gray-500'>
                  <Bell className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                  <p className='text-lg font-medium'>Nenhuma notificação</p>
                  <p className='text-sm'>
                    Quando você tiver notificações, elas aparecerão aqui.
                  </p>
                </div>
              ) : (
                <div className='divide-y divide-gray-100'>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.isRead ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className='flex items-start space-x-3'>
                        {/* Icon */}
                        <div className='flex-shrink-0 mt-1'>
                          {getIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-start justify-between'>
                            <div className='flex-1'>
                              <p
                                className={`text-sm font-medium ${
                                  !notification.isRead
                                    ? "text-gray-900"
                                    : "text-gray-700"
                                }`}
                              >
                                {notification.title}
                              </p>
                              <p className='text-sm text-gray-600 mt-1'>
                                {notification.message}
                              </p>
                              <p className='text-xs text-gray-400 mt-2'>
                                {formatTimeAgo(notification.createdAt)}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className='flex items-center space-x-1 ml-2'>
                              {!notification.isRead && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className='p-1 text-blue-600 hover:bg-blue-100 rounded'
                                  title='Marcar como lida'
                                >
                                  <Check className='h-4 w-4' />
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  removeNotification(notification.id)
                                }
                                className='p-1 text-gray-400 hover:bg-gray-100 rounded'
                                title='Remover'
                              >
                                <X className='h-4 w-4' />
                              </button>
                            </div>
                          </div>

                          {/* Action Button */}
                          {notification.actionUrl && (
                            <button className='mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium'>
                              Ver detalhes →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className='px-4 py-3 border-t border-gray-200 bg-gray-50'>
              <button className='w-full text-sm text-center text-blue-600 hover:text-blue-800 font-medium'>
                Ver todas as notificações
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;
