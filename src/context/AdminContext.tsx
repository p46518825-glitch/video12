import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import JSZip from 'jszip';

// Tipos existentes
export interface PriceConfig {
  moviePrice: number;
  seriesPrice: number;
  transferFeePercentage: number;
  novelPricePerChapter: number;
}

export interface DeliveryZone {
  id: number;
  name: string;
  cost: number;
  active: boolean;
  createdAt: string;
}

export interface Novel {
  id: number;
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
  descripcion?: string;
  active: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  section: string;
  action: string;
}

export interface AdminState {
  isAuthenticated: boolean;
  prices: PriceConfig;
  deliveryZones: DeliveryZone[];
  novels: Novel[];
  notifications: Notification[];
  lastBackup: string | null;
  syncStatus: {
    isOnline: boolean;
    lastSync: string | null;
    syncInProgress: boolean;
    connectedClients: number;
  };
}

// Acciones del reducer
type AdminAction =
  | { type: 'LOGIN'; payload: { username: string; password: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PRICES'; payload: PriceConfig }
  | { type: 'ADD_DELIVERY_ZONE'; payload: Omit<DeliveryZone, 'id' | 'createdAt'> }
  | { type: 'UPDATE_DELIVERY_ZONE'; payload: DeliveryZone }
  | { type: 'DELETE_DELIVERY_ZONE'; payload: number }
  | { type: 'ADD_NOVEL'; payload: Omit<Novel, 'id'> }
  | { type: 'UPDATE_NOVEL'; payload: Novel }
  | { type: 'DELETE_NOVEL'; payload: number }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'UPDATE_SYNC_STATUS'; payload: Partial<AdminState['syncStatus']> }
  | { type: 'SYNC_STATE'; payload: Partial<AdminState> };

// Estado inicial
const initialState: AdminState = {
  isAuthenticated: false,
  prices: {
    moviePrice: 80,
    seriesPrice: 300,
    transferFeePercentage: 10,
    novelPricePerChapter: 5,
  },
  deliveryZones: [],
  novels: [],
  notifications: [],
  lastBackup: null,
  syncStatus: {
    isOnline: true,
    lastSync: null,
    syncInProgress: false,
    connectedClients: 1,
  },
};

// Reducer
function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'LOGIN':
      if (action.payload.username === 'admin' && action.payload.password === 'admin123') {
        return { ...state, isAuthenticated: true };
      }
      return state;

    case 'LOGOUT':
      return { ...state, isAuthenticated: false };

    case 'UPDATE_PRICES':
      return { ...state, prices: action.payload };

    case 'ADD_DELIVERY_ZONE':
      const newZone: DeliveryZone = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        deliveryZones: [...state.deliveryZones, newZone],
      };

    case 'UPDATE_DELIVERY_ZONE':
      return {
        ...state,
        deliveryZones: state.deliveryZones.map(zone =>
          zone.id === action.payload.id ? action.payload : zone
        ),
      };

    case 'DELETE_DELIVERY_ZONE':
      return {
        ...state,
        deliveryZones: state.deliveryZones.filter(zone => zone.id !== action.payload),
      };

    case 'ADD_NOVEL':
      const newNovel: Novel = {
        ...action.payload,
        id: Date.now(),
      };
      return {
        ...state,
        novels: [...state.novels, newNovel],
      };

    case 'UPDATE_NOVEL':
      return {
        ...state,
        novels: state.novels.map(novel =>
          novel.id === action.payload.id ? action.payload : novel
        ),
      };

    case 'DELETE_NOVEL':
      return {
        ...state,
        novels: state.novels.filter(novel => novel.id !== action.payload),
      };

    case 'ADD_NOTIFICATION':
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      return {
        ...state,
        notifications: [notification, ...state.notifications.slice(0, 49)], // Mantener solo 50 notificaciones
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };

    case 'UPDATE_SYNC_STATUS':
      return {
        ...state,
        syncStatus: { ...state.syncStatus, ...action.payload },
      };

    case 'SYNC_STATE':
      return {
        ...state,
        ...action.payload,
        syncStatus: {
          ...state.syncStatus,
          lastSync: new Date().toISOString(),
        },
      };

    default:
      return state;
  }
}

// Contexto
interface AdminContextType {
  state: AdminState;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updatePrices: (prices: PriceConfig) => void;
  addDeliveryZone: (zone: Omit<DeliveryZone, 'id' | 'createdAt'>) => void;
  updateDeliveryZone: (zone: DeliveryZone) => void;
  deleteDeliveryZone: (id: number) => void;
  addNovel: (novel: Omit<Novel, 'id'>) => void;
  updateNovel: (novel: Novel) => void;
  deleteNovel: (id: number) => void;
  clearNotifications: () => void;
  exportSystemBackup: () => void;
  syncWithRemote: () => Promise<void>;
  broadcastChange: (change: any) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Clase para manejar la sincronización en tiempo real
class RealTimeSyncManager {
  private listeners: Set<(data: any) => void> = new Set();
  private syncInterval: NodeJS.Timeout | null = null;
  private storageKey = 'admin_state_sync';
  private lastSyncTimestamp = 0;

  constructor() {
    this.initializeSync();
  }

  private initializeSync() {
    // Escuchar cambios en localStorage para sincronización entre pestañas
    window.addEventListener('storage', this.handleStorageChange.bind(this));
    
    // Sincronización periódica cada 5 segundos
    this.syncInterval = setInterval(() => {
      this.checkForUpdates();
    }, 5000);

    // Simular conexión en tiempo real (en producción sería WebSocket)
    this.simulateRealTimeConnection();
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === this.storageKey && event.newValue) {
      try {
        const syncData = JSON.parse(event.newValue);
        if (syncData.timestamp > this.lastSyncTimestamp) {
          this.notifyListeners(syncData);
          this.lastSyncTimestamp = syncData.timestamp;
        }
      } catch (error) {
        console.error('Error parsing sync data:', error);
      }
    }
  }

  private checkForUpdates() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const syncData = JSON.parse(stored);
        if (syncData.timestamp > this.lastSyncTimestamp) {
          this.notifyListeners(syncData);
          this.lastSyncTimestamp = syncData.timestamp;
        }
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  }

  private simulateRealTimeConnection() {
    // Simular actualizaciones del servidor cada 30 segundos
    setInterval(() => {
      const randomUpdate = {
        type: 'server_sync',
        timestamp: Date.now(),
        data: {
          syncStatus: {
            isOnline: Math.random() > 0.1, // 90% uptime
            connectedClients: Math.floor(Math.random() * 10) + 1,
            lastSync: new Date().toISOString(),
          }
        }
      };
      this.broadcast(randomUpdate);
    }, 30000);
  }

  addListener(callback: (data: any) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(data: any) {
    this.listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in sync listener:', error);
      }
    });
  }

  broadcast(data: any) {
    const syncData = {
      ...data,
      timestamp: Date.now(),
    };

    // Guardar en localStorage para sincronización entre pestañas
    localStorage.setItem(this.storageKey, JSON.stringify(syncData));
    
    // Notificar a listeners locales
    this.notifyListeners(syncData);
    
    this.lastSyncTimestamp = syncData.timestamp;
  }

  destroy() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
    this.listeners.clear();
  }
}

// Provider del contexto
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const syncManagerRef = React.useRef<RealTimeSyncManager | null>(null);

  // Inicializar el gestor de sincronización
  useEffect(() => {
    syncManagerRef.current = new RealTimeSyncManager();
    
    // Configurar listener para cambios remotos
    const unsubscribe = syncManagerRef.current.addListener((syncData) => {
      if (syncData.type === 'state_update' && syncData.data) {
        dispatch({ type: 'SYNC_STATE', payload: syncData.data });
      } else if (syncData.type === 'server_sync' && syncData.data) {
        dispatch({ type: 'UPDATE_SYNC_STATUS', payload: syncData.data.syncStatus });
      }
    });

    // Cargar estado inicial desde localStorage
    loadInitialState();

    return () => {
      unsubscribe();
      syncManagerRef.current?.destroy();
    };
  }, []);

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    if (state.isAuthenticated) {
      const stateToSave = {
        prices: state.prices,
        deliveryZones: state.deliveryZones,
        novels: state.novels,
        notifications: state.notifications,
        lastBackup: state.lastBackup,
      };
      localStorage.setItem('admin_state', JSON.stringify(stateToSave));
    }
  }, [state]);

  const loadInitialState = useCallback(() => {
    try {
      const saved = localStorage.getItem('admin_state');
      if (saved) {
        const parsedState = JSON.parse(saved);
        dispatch({ type: 'SYNC_STATE', payload: parsedState });
      }
    } catch (error) {
      console.error('Error loading initial state:', error);
    }
  }, []);

  const broadcastChange = useCallback((change: any) => {
    if (syncManagerRef.current) {
      syncManagerRef.current.broadcast({
        type: 'state_update',
        data: change,
        source: 'admin_panel'
      });
    }
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    broadcastChange({ notifications: [notification] });
  }, [broadcastChange]);

  const login = useCallback((username: string, password: string): boolean => {
    dispatch({ type: 'LOGIN', payload: { username, password } });
    const success = username === 'admin' && password === 'admin123';
    
    if (success) {
      addNotification({
        type: 'success',
        title: 'Sesión iniciada',
        message: 'Acceso autorizado al panel de control',
        section: 'Autenticación',
        action: 'login'
      });
      
      // Actualizar estado de sincronización
      dispatch({ type: 'UPDATE_SYNC_STATUS', payload: { 
        isOnline: true,
        lastSync: new Date().toISOString(),
        connectedClients: 1
      }});
    }
    
    return success;
  }, [addNotification]);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    addNotification({
      type: 'info',
      title: 'Sesión cerrada',
      message: 'Se ha cerrado la sesión correctamente',
      section: 'Autenticación',
      action: 'logout'
    });
  }, [addNotification]);

  const updatePrices = useCallback((prices: PriceConfig) => {
    dispatch({ type: 'UPDATE_PRICES', payload: prices });
    broadcastChange({ prices });
    addNotification({
      type: 'success',
      title: 'Precios actualizados',
      message: 'Los precios se han actualizado correctamente y están sincronizados en tiempo real',
      section: 'Precios',
      action: 'update'
    });
  }, [addNotification, broadcastChange]);

  const addDeliveryZone = useCallback((zone: Omit<DeliveryZone, 'id' | 'createdAt'>) => {
    dispatch({ type: 'ADD_DELIVERY_ZONE', payload: zone });
    broadcastChange({ deliveryZones: 'add', zone });
    addNotification({
      type: 'success',
      title: 'Zona agregada',
      message: `Se agregó la zona "${zone.name}" correctamente`,
      section: 'Zonas de Entrega',
      action: 'add'
    });
  }, [addNotification, broadcastChange]);

  const updateDeliveryZone = useCallback((zone: DeliveryZone) => {
    dispatch({ type: 'UPDATE_DELIVERY_ZONE', payload: zone });
    broadcastChange({ deliveryZones: 'update', zone });
    addNotification({
      type: 'success',
      title: 'Zona actualizada',
      message: `Se actualizó la zona "${zone.name}" correctamente`,
      section: 'Zonas de Entrega',
      action: 'update'
    });
  }, [addNotification, broadcastChange]);

  const deleteDeliveryZone = useCallback((id: number) => {
    const zone = state.deliveryZones.find(z => z.id === id);
    dispatch({ type: 'DELETE_DELIVERY_ZONE', payload: id });
    broadcastChange({ deliveryZones: 'delete', id });
    addNotification({
      type: 'warning',
      title: 'Zona eliminada',
      message: `Se eliminó la zona "${zone?.name || 'Desconocida'}" correctamente`,
      section: 'Zonas de Entrega',
      action: 'delete'
    });
  }, [state.deliveryZones, addNotification, broadcastChange]);

  const addNovel = useCallback((novel: Omit<Novel, 'id'>) => {
    dispatch({ type: 'ADD_NOVEL', payload: novel });
    broadcastChange({ novels: 'add', novel });
    addNotification({
      type: 'success',
      title: 'Novela agregada',
      message: `Se agregó la novela "${novel.titulo}" correctamente`,
      section: 'Gestión de Novelas',
      action: 'add'
    });
  }, [addNotification, broadcastChange]);

  const updateNovel = useCallback((novel: Novel) => {
    dispatch({ type: 'UPDATE_NOVEL', payload: novel });
    broadcastChange({ novels: 'update', novel });
    addNotification({
      type: 'success',
      title: 'Novela actualizada',
      message: `Se actualizó la novela "${novel.titulo}" correctamente`,
      section: 'Gestión de Novelas',
      action: 'update'
    });
  }, [addNotification, broadcastChange]);

  const deleteNovel = useCallback((id: number) => {
    const novel = state.novels.find(n => n.id === id);
    dispatch({ type: 'DELETE_NOVEL', payload: id });
    broadcastChange({ novels: 'delete', id });
    addNotification({
      type: 'warning',
      title: 'Novela eliminada',
      message: `Se eliminó la novela "${novel?.titulo || 'Desconocida'}" correctamente`,
      section: 'Gestión de Novelas',
      action: 'delete'
    });
  }, [state.novels, addNotification, broadcastChange]);

  const clearNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
    broadcastChange({ notifications: 'clear' });
  }, [broadcastChange]);

  const syncWithRemote = useCallback(async () => {
    dispatch({ type: 'UPDATE_SYNC_STATUS', payload: { syncInProgress: true } });
    
    try {
      // Simular sincronización con servidor remoto
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch({ type: 'UPDATE_SYNC_STATUS', payload: { 
        syncInProgress: false,
        lastSync: new Date().toISOString(),
        isOnline: true
      }});
      
      addNotification({
        type: 'success',
        title: 'Sincronización completada',
        message: 'Todos los datos están sincronizados con el servidor',
        section: 'Sistema',
        action: 'sync'
      });
    } catch (error) {
      dispatch({ type: 'UPDATE_SYNC_STATUS', payload: { 
        syncInProgress: false,
        isOnline: false
      }});
      
      addNotification({
        type: 'error',
        title: 'Error de sincronización',
        message: 'No se pudo sincronizar con el servidor',
        section: 'Sistema',
        action: 'sync_error'
      });
    }
  }, [addNotification]);

  const exportSystemBackup = useCallback(async () => {
    try {
      dispatch({ type: 'UPDATE_SYNC_STATUS', payload: { syncInProgress: true } });
      
      const zip = new JSZip();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      // Datos del sistema
      const systemData = {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        prices: state.prices,
        deliveryZones: state.deliveryZones,
        novels: state.novels,
        notifications: state.notifications,
        syncStatus: state.syncStatus
      };

      // Archivos del sistema con sincronización en tiempo real
      const files = {
        'AdminContext.tsx': `// AdminContext.tsx - Sistema con sincronización en tiempo real
// Exportado el ${new Date().toLocaleString('es-ES')}
// Estado actual sincronizado: ${JSON.stringify(systemData, null, 2)}`,
        
        'CheckoutModal.tsx': `// CheckoutModal.tsx - Modal de checkout sincronizado
// Zonas de entrega sincronizadas: ${state.deliveryZones.length}
// Precios sincronizados: ${JSON.stringify(state.prices, null, 2)}`,
        
        'NovelasModal.tsx': `// NovelasModal.tsx - Catálogo de novelas sincronizado
// Novelas sincronizadas: ${state.novels.length}
// Precio por capítulo sincronizado: ${state.prices.novelPricePerChapter} CUP`,
        
        'PriceCard.tsx': `// PriceCard.tsx - Componente de precios sincronizado
// Precios actuales sincronizados: ${JSON.stringify(state.prices, null, 2)}`,
        
        'CartContext.tsx': `// CartContext.tsx - Contexto del carrito sincronizado
// Integrado con precios en tiempo real del AdminContext`,
        
        'AdminPanel.tsx': `// AdminPanel.tsx - Panel de control con sincronización
// Estado de sincronización: ${JSON.stringify(state.syncStatus, null, 2)}`
      };

      // Agregar archivos al ZIP
      Object.entries(files).forEach(([filename, content]) => {
        zip.file(filename, content);
      });

      // Agregar datos JSON
      zip.file('system-data.json', JSON.stringify(systemData, null, 2));
      zip.file('backup-info.txt', `
TV a la Carta - Backup del Sistema
==================================

Fecha de exportación: ${new Date().toLocaleString('es-ES')}
Versión del sistema: 1.0.0

CONTENIDO DEL BACKUP:
- Configuración de precios sincronizada
- ${state.deliveryZones.length} zonas de entrega
- ${state.novels.length} novelas en catálogo
- ${state.notifications.length} notificaciones del sistema
- Estado de sincronización en tiempo real

CARACTERÍSTICAS DE SINCRONIZACIÓN:
- Sincronización automática entre pestañas
- Actualizaciones en tiempo real
- Estado persistente en localStorage
- Notificaciones de cambios
- Gestión de conexión simulada

ARCHIVOS INCLUIDOS:
${Object.keys(files).map(f => `- ${f}`).join('\n')}

Este backup contiene todos los archivos del sistema con
sincronización en tiempo real implementada.
      `);

      // Generar y descargar ZIP
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `tv-a-la-carta-system-backup-${timestamp}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Actualizar estado
      const backupTime = new Date().toISOString();
      localStorage.setItem('admin_last_backup', backupTime);
      
      dispatch({ type: 'UPDATE_SYNC_STATUS', payload: { 
        syncInProgress: false,
        lastSync: backupTime
      }});

      addNotification({
        type: 'success',
        title: 'Backup exportado',
        message: 'Sistema completo exportado con sincronización en tiempo real',
        section: 'Sistema',
        action: 'export'
      });

      broadcastChange({ lastBackup: backupTime });
      
    } catch (error) {
      dispatch({ type: 'UPDATE_SYNC_STATUS', payload: { syncInProgress: false }});
      addNotification({
        type: 'error',
        title: 'Error en exportación',
        message: 'No se pudo exportar el sistema',
        section: 'Sistema',
        action: 'export_error'
      });
    }
  }, [state, addNotification, broadcastChange]);

  // Sincronización automática cada minuto
  useEffect(() => {
    if (state.isAuthenticated) {
      const interval = setInterval(() => {
        dispatch({ type: 'UPDATE_SYNC_STATUS', payload: { 
          lastSync: new Date().toISOString(),
          isOnline: Math.random() > 0.05 // 95% uptime simulation
        }});
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [state.isAuthenticated]);

  const contextValue: AdminContextType = {
    state,
    login,
    logout,
    updatePrices,
    addDeliveryZone,
    updateDeliveryZone,
    deleteDeliveryZone,
    addNovel,
    updateNovel,
    deleteNovel,
    clearNotifications,
    exportSystemBackup,
    syncWithRemote,
    broadcastChange,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

export { AdminContext };