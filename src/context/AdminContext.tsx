// Archivo generado automáticamente el 2025-08-17T16:37:05.196Z
// AdminContext con configuración actual aplicada y todas las funciones implementadas

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { 
  AdminConfig, 
  AdminState, 
  NovelasConfig, 
  DeliveryZoneConfig, 
  AdminAction,
  AdminContextType
} from '../types/admin';

// Configuración actual aplicada desde el panel de control
const currentAppliedConfig: AdminConfig = {
  "pricing": {
    "moviePrice": 90,
    "seriesPrice": 350,
    "transferFeePercentage": 15
  },
  "novelas": [
    {
      "id": 1,
      "titulo": "Corazón Salvaje 234",
      "genero": "Drama/Romance",
      "capitulos": 185,
      "año": 2009,
      "costoEfectivo": 925,
      "costoTransferencia": 1018,
      "descripcion": "Una apasionante historia de amor y venganza"
    },
    {
      "id": 2,
      "titulo": "La Usurpadora",
      "genero": "Drama/Melodrama",
      "capitulos": 98,
      "año": 1998,
      "costoEfectivo": 490,
      "costoTransferencia": 539,
      "descripcion": "La historia de dos mujeres idénticas con destinos opuestos"
    },
    {
      "id": 3,
      "titulo": "María la del Barrio",
      "genero": "Drama/Romance",
      "capitulos": 73,
      "año": 1995,
      "costoEfectivo": 365,
      "costoTransferencia": 402,
      "descripcion": "Una joven humilde que conquista el corazón de un millonario"
    },
    {
      "id": 4,
      "titulo": "Marimar",
      "genero": "Drama/Romance",
      "capitulos": 63,
      "año": 1994,
      "costoEfectivo": 315,
      "costoTransferencia": 347,
      "descripcion": "La transformación de una joven de la playa en una mujer sofisticada"
    },
    {
      "id": 5,
      "titulo": "Rosalinda",
      "genero": "Drama/Romance",
      "capitulos": 80,
      "año": 1999,
      "costoEfectivo": 400,
      "costoTransferencia": 440,
      "descripcion": "Una historia de amor que supera las diferencias sociales"
    },
    {
      "id": 6,
      "titulo": "La Madrastra",
      "genero": "Drama/Suspenso",
      "capitulos": 135,
      "año": 2005,
      "costoEfectivo": 675,
      "costoTransferencia": 743,
      "descripcion": "Una mujer lucha por demostrar su inocencia"
    },
    {
      "id": 7,
      "titulo": "Rubí",
      "genero": "Drama/Melodrama",
      "capitulos": 115,
      "año": 2004,
      "costoEfectivo": 575,
      "costoTransferencia": 633,
      "descripcion": "La ambición desmedida de una mujer hermosa"
    },
    {
      "id": 8,
      "titulo": "Pasión de Gavilanes",
      "genero": "Drama/Romance",
      "capitulos": 188,
      "año": 2003,
      "costoEfectivo": 940,
      "costoTransferencia": 1034,
      "descripcion": "Tres hermanos buscan venganza pero encuentran el amor"
    },
    {
      "id": 9,
      "titulo": "Yo Soy Betty, la Fea",
      "genero": "Comedia/Romance",
      "capitulos": 335,
      "año": 1999,
      "costoEfectivo": 1675,
      "costoTransferencia": 1843,
      "descripcion": "La transformación de una secretaria en una mujer exitosa"
    },
    {
      "id": 10,
      "titulo": "El Cuerpo del Deseo",
      "genero": "Drama/Fantasía",
      "capitulos": 178,
      "año": 2005,
      "costoEfectivo": 890,
      "costoTransferencia": 979,
      "descripcion": "Una historia sobrenatural de amor y reencarnación"
    }
  ],
  "deliveryZones": [
    {
      "id": 1,
      "name": "Por favor seleccionar su Barrio/Zona",
      "fullPath": "Por favor seleccionar su Barrio/Zona",
      "cost": 0,
      "active": true
    },
    {
      "id": 2,
      "name": "Nuevo Vista Alegre",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Nuevo Vista Alegre",
      "cost": 150,
      "active": true
    },
    {
      "id": 3,
      "name": "Vista Alegre",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Vista Alegre",
      "cost": 300,
      "active": true
    },
    {
      "id": 4,
      "name": "Reparto Sueño",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Reparto Sueño",
      "cost": 250,
      "active": true
    },
    {
      "id": 5,
      "name": "San Pedrito",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > San Pedrito",
      "cost": 150,
      "active": true
    },
    {
      "id": 6,
      "name": "Altamira",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Altamira",
      "cost": 300,
      "active": true
    },
    {
      "id": 7,
      "name": "Micro 7, 8 , 9",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Micro 7, 8 , 9",
      "cost": 150,
      "active": true
    },
    {
      "id": 8,
      "name": "Alameda",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Alameda",
      "cost": 150,
      "active": true
    },
    {
      "id": 9,
      "name": "El Caney",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > El Caney",
      "cost": 800,
      "active": true
    },
    {
      "id": 10,
      "name": "Quintero",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Quintero",
      "cost": 200,
      "active": true
    },
    {
      "id": 11,
      "name": "Marimon",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Marimon",
      "cost": 100,
      "active": true
    },
    {
      "id": 12,
      "name": "Los cangrejitos",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Los cangrejitos",
      "cost": 150,
      "active": true
    },
    {
      "id": 13,
      "name": "Trocha",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Trocha",
      "cost": 200,
      "active": true
    },
    {
      "id": 14,
      "name": "Versalles",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Versalles",
      "cost": 800,
      "active": true
    },
    {
      "id": 15,
      "name": "Reparto Portuondo",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Reparto Portuondo",
      "cost": 600,
      "active": true
    },
    {
      "id": 16,
      "name": "30 de Noviembre",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > 30 de Noviembre",
      "cost": 600,
      "active": true
    },
    {
      "id": 17,
      "name": "Rajayoga",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Rajayoga",
      "cost": 800,
      "active": true
    },
    {
      "id": 18,
      "name": "Antonio Maceo",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Antonio Maceo",
      "cost": 600,
      "active": true
    },
    {
      "id": 19,
      "name": "Los Pinos",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Los Pinos",
      "cost": 200,
      "active": true
    },
    {
      "id": 20,
      "name": "Distrito José Martí",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Distrito José Martí",
      "cost": 100,
      "active": true
    },
    {
      "id": 21,
      "name": "Cobre",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Cobre",
      "cost": 800,
      "active": true
    },
    {
      "id": 22,
      "name": "El Parque Céspedes",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > El Parque Céspedes",
      "cost": 200,
      "active": true
    },
    {
      "id": 23,
      "name": "Carretera del Morro",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Carretera del Morro",
      "cost": 300,
      "active": true
    }
  ]
};

// Configuración por defecto del sistema
const defaultConfig: AdminConfig = {
  "pricing": {
    "moviePrice": 80,
    "seriesPrice": 300,
    "transferFeePercentage": 10
  },
  "novelas": [
    {
      "id": 1,
      "titulo": "Corazón Salvaje",
      "genero": "Drama/Romance",
      "capitulos": 185,
      "año": 2009,
      "costoEfectivo": 925,
      "costoTransferencia": 1018,
      "descripcion": "Una apasionante historia de amor y venganza"
    },
    {
      "id": 2,
      "titulo": "La Usurpadora",
      "genero": "Drama/Melodrama",
      "capitulos": 98,
      "año": 1998,
      "costoEfectivo": 490,
      "costoTransferencia": 539,
      "descripcion": "La historia de dos mujeres idénticas con destinos opuestos"
    },
    {
      "id": 3,
      "titulo": "María la del Barrio",
      "genero": "Drama/Romance",
      "capitulos": 73,
      "año": 1995,
      "costoEfectivo": 365,
      "costoTransferencia": 402,
      "descripcion": "Una joven humilde que conquista el corazón de un millonario"
    },
    {
      "id": 4,
      "titulo": "Marimar",
      "genero": "Drama/Romance",
      "capitulos": 63,
      "año": 1994,
      "costoEfectivo": 315,
      "costoTransferencia": 347,
      "descripcion": "La transformación de una joven de la playa en una mujer sofisticada"
    },
    {
      "id": 5,
      "titulo": "Rosalinda",
      "genero": "Drama/Romance",
      "capitulos": 80,
      "año": 1999,
      "costoEfectivo": 400,
      "costoTransferencia": 440,
      "descripcion": "Una historia de amor que supera las diferencias sociales"
    },
    {
      "id": 6,
      "titulo": "La Madrastra",
      "genero": "Drama/Suspenso",
      "capitulos": 135,
      "año": 2005,
      "costoEfectivo": 675,
      "costoTransferencia": 743,
      "descripcion": "Una mujer lucha por demostrar su inocencia"
    },
    {
      "id": 7,
      "titulo": "Rubí",
      "genero": "Drama/Melodrama",
      "capitulos": 115,
      "año": 2004,
      "costoEfectivo": 575,
      "costoTransferencia": 633,
      "descripcion": "La ambición desmedida de una mujer hermosa"
    },
    {
      "id": 8,
      "titulo": "Pasión de Gavilanes",
      "genero": "Drama/Romance",
      "capitulos": 188,
      "año": 2003,
      "costoEfectivo": 940,
      "costoTransferencia": 1034,
      "descripcion": "Tres hermanos buscan venganza pero encuentran el amor"
    },
    {
      "id": 9,
      "titulo": "Yo Soy Betty, la Fea",
      "genero": "Comedia/Romance",
      "capitulos": 335,
      "año": 1999,
      "costoEfectivo": 1675,
      "costoTransferencia": 1843,
      "descripcion": "La transformación de una secretaria en una mujer exitosa"
    },
    {
      "id": 10,
      "titulo": "El Cuerpo del Deseo",
      "genero": "Drama/Fantasía",
      "capitulos": 178,
      "año": 2005,
      "costoEfectivo": 890,
      "costoTransferencia": 979,
      "descripcion": "Una historia sobrenatural de amor y reencarnación"
    }
  ],
  "deliveryZones": [
    {
      "id": 1,
      "name": "Por favor seleccionar su Barrio/Zona",
      "fullPath": "Por favor seleccionar su Barrio/Zona",
      "cost": 0,
      "active": true
    },
    {
      "id": 2,
      "name": "Nuevo Vista Alegre",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Nuevo Vista Alegre",
      "cost": 100,
      "active": true
    },
    {
      "id": 3,
      "name": "Vista Alegre",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Vista Alegre",
      "cost": 300,
      "active": true
    },
    {
      "id": 4,
      "name": "Reparto Sueño",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Reparto Sueño",
      "cost": 250,
      "active": true
    },
    {
      "id": 5,
      "name": "San Pedrito",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > San Pedrito",
      "cost": 150,
      "active": true
    },
    {
      "id": 6,
      "name": "Altamira",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Altamira",
      "cost": 300,
      "active": true
    },
    {
      "id": 7,
      "name": "Micro 7, 8 , 9",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Micro 7, 8 , 9",
      "cost": 150,
      "active": true
    },
    {
      "id": 8,
      "name": "Alameda",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Alameda",
      "cost": 150,
      "active": true
    },
    {
      "id": 9,
      "name": "El Caney",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > El Caney",
      "cost": 800,
      "active": true
    },
    {
      "id": 10,
      "name": "Quintero",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Quintero",
      "cost": 200,
      "active": true
    },
    {
      "id": 11,
      "name": "Marimon",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Marimon",
      "cost": 100,
      "active": true
    },
    {
      "id": 12,
      "name": "Los cangrejitos",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Los cangrejitos",
      "cost": 150,
      "active": true
    },
    {
      "id": 13,
      "name": "Trocha",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Trocha",
      "cost": 200,
      "active": true
    },
    {
      "id": 14,
      "name": "Versalles",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Versalles",
      "cost": 800,
      "active": true
    },
    {
      "id": 15,
      "name": "Reparto Portuondo",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Reparto Portuondo",
      "cost": 600,
      "active": true
    },
    {
      "id": 16,
      "name": "30 de Noviembre",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > 30 de Noviembre",
      "cost": 600,
      "active": true
    },
    {
      "id": 17,
      "name": "Rajayoga",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Rajayoga",
      "cost": 800,
      "active": true
    },
    {
      "id": 18,
      "name": "Antonio Maceo",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Antonio Maceo",
      "cost": 600,
      "active": true
    },
    {
      "id": 19,
      "name": "Los Pinos",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Los Pinos",
      "cost": 200,
      "active": true
    },
    {
      "id": 20,
      "name": "Distrito José Martí",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Distrito José Martí",
      "cost": 100,
      "active": true
    },
    {
      "id": 21,
      "name": "Cobre",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Cobre",
      "cost": 800,
      "active": true
    },
    {
      "id": 22,
      "name": "El Parque Céspedes",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > El Parque Céspedes",
      "cost": 200,
      "active": true
    },
    {
      "id": 23,
      "name": "Carretera del Morro",
      "fullPath": "Santiago de Cuba > Santiago de Cuba > Carretera del Morro",
      "cost": 300,
      "active": true
    }
  ]
};

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'UPDATE_PRICING':
      return {
        ...state,
        config: {
          ...state.config,
          pricing: action.payload
        }
      };
    case 'ADD_NOVELA':
      return {
        ...state,
        config: {
          ...state.config,
          novelas: [...state.config.novelas, action.payload]
        }
      };
    case 'UPDATE_NOVELA':
      return {
        ...state,
        config: {
          ...state.config,
          novelas: state.config.novelas.map(novela =>
            novela.id === action.payload.id ? action.payload : novela
          )
        }
      };
    case 'DELETE_NOVELA':
      return {
        ...state,
        config: {
          ...state.config,
          novelas: state.config.novelas.filter(novela => novela.id !== action.payload)
        }
      };
    case 'ADD_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: [...state.config.deliveryZones, action.payload]
        }
      };
    case 'UPDATE_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: state.config.deliveryZones.map(zone =>
            zone.id === action.payload.id ? action.payload : zone
          )
        }
      };
    case 'DELETE_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: state.config.deliveryZones.filter(zone => zone.id !== action.payload)
        }
      };
    case 'TOGGLE_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: state.config.deliveryZones.map(zone =>
            zone.id === action.payload ? { ...zone, active: !zone.active } : zone
          )
        }
      };
    case 'LOAD_CONFIG':
      return {
        ...state,
        config: action.payload
      };
    case 'LOG_IN':
      return {
        ...state,
        isAuthenticated: true
      };
    case 'LOG_OUT':
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    config: currentAppliedConfig,
    isAuthenticated: false
  });

  // Todas las funciones implementadas con configuración actual aplicada
  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin') {
      dispatch({ type: 'LOG_IN' });
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch({ type: 'LOG_OUT' });
  };

  const addNovela = (novela: Omit<NovelasConfig, 'id'>) => {
    const newId = Math.max(...state.config.novelas.map(n => n.id), 0) + 1;
    const newNovela: NovelasConfig = {
      ...novela,
      id: newId,
      costoEfectivo: novela.costoEfectivo || novela.capitulos * 5,
      costoTransferencia: novela.costoTransferencia || Math.round((novela.capitulos * 5) * (1 + state.config.pricing.transferFeePercentage / 100))
    };
    dispatch({ type: 'ADD_NOVELA', payload: newNovela });
  };

  const updateNovela = (id: number, novelaData: Partial<NovelasConfig>) => {
    const existingNovela = state.config.novelas.find(n => n.id === id);
    if (existingNovela) {
      const updatedNovela: NovelasConfig = { ...existingNovela, ...novelaData };
      dispatch({ type: 'UPDATE_NOVELA', payload: updatedNovela });
    }
  };

  const deleteNovela = (id: number) => {
    dispatch({ type: 'DELETE_NOVELA', payload: id });
  };

  const addDeliveryZone = (zone: Omit<DeliveryZoneConfig, 'id'>) => {
    const newId = Math.max(...state.config.deliveryZones.map(z => z.id), 0) + 1;
    const newZone: DeliveryZoneConfig = {
      ...zone,
      id: newId,
      fullPath: zone.fullPath || `Santiago de Cuba > Santiago de Cuba > ${zone.name}`
    };
    dispatch({ type: 'ADD_DELIVERY_ZONE', payload: newZone });
  };

  const updateDeliveryZone = (id: number, zoneData: Partial<DeliveryZoneConfig>) => {
    const existingZone = state.config.deliveryZones.find(z => z.id === id);
    if (existingZone) {
      const updatedZone: DeliveryZoneConfig = { ...existingZone, ...zoneData };
      dispatch({ type: 'UPDATE_DELIVERY_ZONE', payload: updatedZone });
    }
  };

  const deleteDeliveryZone = (id: number) => {
    if (id !== 1) {
      dispatch({ type: 'DELETE_DELIVERY_ZONE', payload: id });
    }
  };

  const exportConfig = (): string => {
    return JSON.stringify(state.config, null, 2);
  };

  const importConfig = (configData: string): boolean => {
    try {
      const parsedConfig = JSON.parse(configData);
      if (parsedConfig.pricing && parsedConfig.novelas && parsedConfig.deliveryZones) {
        dispatch({ type: 'LOAD_CONFIG', payload: parsedConfig });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const resetToDefaults = () => {
    dispatch({ type: 'LOAD_CONFIG', payload: defaultConfig });
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error') => {
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const getCurrentConfig = (): AdminConfig => {
    return state.config;
  };

  const exportSystemFiles = () => {
    console.log('Exportando archivos del sistema con configuración actual aplicada');
  };

  useEffect(() => {
    localStorage.setItem('adminConfig', JSON.stringify(state.config));
  }, [state.config]);

  const contextValue: AdminContextType = {
    state, 
    dispatch, 
    login, 
    logout,
    addNovela,
    updateNovela,
    deleteNovela,
    addDeliveryZone,
    updateDeliveryZone,
    deleteDeliveryZone,
    exportConfig,
    importConfig,
    resetToDefaults,
    showNotification,
    exportSystemFiles,
    getCurrentConfig
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};