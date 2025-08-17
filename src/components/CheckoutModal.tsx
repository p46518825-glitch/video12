// Archivo generado automáticamente el 2025-08-17T16:37:05.196Z
// CheckoutModal con configuración actual aplicada

import React, { useState } from 'react';
import { X, User, MapPin, Phone, Copy, Check, MessageCircle, Calculator, DollarSign, CreditCard } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

// Configuración de precios actual aplicada
const CURRENT_PRICING = {
  "moviePrice": 90,
  "seriesPrice": 350,
  "transferFeePercentage": 15
};

// Zonas de entrega actuales aplicadas (solo activas)
const CURRENT_DELIVERY_ZONES = [
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
];

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
}

export interface OrderData {
  orderId: string;
  customerInfo: CustomerInfo;
  deliveryZone: string;
  deliveryCost: number;
  items: any[];
  subtotal: number;
  transferFee: number;
  total: number;
  cashTotal?: number;
  transferTotal?: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (orderData: OrderData) => void;
  items: any[];
  total: number;
}

export function CheckoutModal({ isOpen, onClose, onCheckout, items, total }: CheckoutModalProps) {
  const { getCurrentConfig } = useAdmin();
  
  // Obtener configuración actual del admin
  const currentConfig = getCurrentConfig();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    address: '',
  });
  
  const [deliveryZone, setDeliveryZone] = useState('Por favor seleccionar su Barrio/Zona');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderGenerated, setOrderGenerated] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState('');
  const [copied, setCopied] = useState(false);

  // Usar configuración actual aplicada
  const deliveryZones = CURRENT_DELIVERY_ZONES;
  const selectedZone = deliveryZones.find(zone => zone.fullPath === deliveryZone);
  const deliveryCost = selectedZone?.cost || 0;
  const finalTotal = total + deliveryCost;

  // Validar formulario
  const isFormValid = customerInfo.fullName.trim() !== '' && 
                     customerInfo.phone.trim() !== '' && 
                     customerInfo.address.trim() !== '' &&
                     deliveryZone !== 'Por favor seleccionar su Barrio/Zona';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TVC-${timestamp}-${random}`.toUpperCase();
  };

  const calculateTotals = () => {
    const cashItems = items.filter(item => item.paymentType === 'cash');
    const transferItems = items.filter(item => item.paymentType === 'transfer');
    
    const cashTotal = cashItems.reduce((sum, item) => {
      const basePrice = item.type === 'movie' ? CURRENT_PRICING.moviePrice : (item.selectedSeasons?.length || 1) * CURRENT_PRICING.seriesPrice;
      return sum + basePrice;
    }, 0);
    
    const transferTotal = transferItems.reduce((sum, item) => {
      const basePrice = item.type === 'movie' ? CURRENT_PRICING.moviePrice : (item.selectedSeasons?.length || 1) * CURRENT_PRICING.seriesPrice;
      return sum + Math.round(basePrice * (1 + CURRENT_PRICING.transferFeePercentage / 100));
    }, 0);
    
    return { cashTotal, transferTotal };
  };

  const generateOrderText = () => {
    const orderId = generateOrderId();
    const { cashTotal, transferTotal } = calculateTotals();
    
    const transferFee = transferTotal - items.filter(item => item.paymentType === 'transfer').reduce((sum, item) => {
      const basePrice = item.type === 'movie' ? CURRENT_PRICING.moviePrice : (item.selectedSeasons?.length || 1) * CURRENT_PRICING.seriesPrice;
      return sum + basePrice;
    }, 0);

    // Formatear lista de productos con precios actuales
    const itemsList = items
      .map(item => {
        const seasonInfo = item.selectedSeasons && item.selectedSeasons.length > 0 
          ? `\n  📺 Temporadas: ${item.selectedSeasons.sort((a, b) => a - b).join(', ')}` 
          : '';
        const itemType = item.type === 'movie' ? 'Película' : 'Serie';
        const basePrice = item.type === 'movie' ? CURRENT_PRICING.moviePrice : (item.selectedSeasons?.length || 1) * CURRENT_PRICING.seriesPrice;
        const finalPrice = item.paymentType === 'transfer' ? Math.round(basePrice * (1 + CURRENT_PRICING.transferFeePercentage / 100)) : basePrice;
        const paymentTypeText = item.paymentType === 'transfer' ? `Transferencia (+${CURRENT_PRICING.transferFeePercentage}%)` : 'Efectivo';
        const emoji = item.type === 'movie' ? '🎬' : '📺';
        return `${emoji} *${item.title}*${seasonInfo}\n  📋 Tipo: ${itemType}\n  💳 Pago: ${paymentTypeText}\n  💰 Precio: $${finalPrice.toLocaleString()} CUP`;
      })
      .join('\n\n');

    let orderText = `🎬 *PEDIDO - TV A LA CARTA*\n\n`;
    orderText += `📋 *ID de Orden:* ${orderId}\n\n`;
    
    orderText += `👤 *DATOS DEL CLIENTE:*\n`;
    orderText += `• Nombre: ${customerInfo.fullName}\n`;
    orderText += `• Teléfono: ${customerInfo.phone}\n`;
    orderText += `• Dirección: ${customerInfo.address}\n\n`;
    
    orderText += `🎯 *PRODUCTOS SOLICITADOS:*\n${itemsList}\n\n`;
    
    orderText += `💰 *RESUMEN DE COSTOS:*\n`;
    
    if (cashTotal > 0) {
      orderText += `💵 Efectivo: $${cashTotal.toLocaleString()} CUP\n`;
    }
    if (transferTotal > 0) {
      orderText += `🏦 Transferencia: $${transferTotal.toLocaleString()} CUP\n`;
    }
    orderText += `• *Subtotal Contenido: $${total.toLocaleString()} CUP*\n`;
    
    if (transferFee > 0) {
      orderText += `• Recargo transferencia (${CURRENT_PRICING.transferFeePercentage}%): +$${transferFee.toLocaleString()} CUP\n`;
    }
    
    orderText += `🚚 Entrega (${selectedZone?.name || 'Zona desconocida'}): +$${deliveryCost.toLocaleString()} CUP\n`;
    orderText += `\n🎯 *TOTAL FINAL: $${finalTotal.toLocaleString()} CUP*\n\n`;
    
    orderText += `📍 *ZONA DE ENTREGA:*\n`;
    orderText += `${deliveryZone.replace(' > ', ' → ')}\n`;
    orderText += `💰 Costo de entrega: $${deliveryCost.toLocaleString()} CUP\n\n`;
    
    orderText += `⏰ *Fecha:* ${new Date().toLocaleString('es-ES')}\n`;
    orderText += `🌟 *¡Gracias por elegir TV a la Carta!*`;

    return { orderText, orderId };
  };

  const handleGenerateOrder = () => {
    if (!isFormValid) {
      alert('Por favor complete todos los campos requeridos antes de generar la orden.');
      return;
    }
    
    const { orderText } = generateOrderText();
    setGeneratedOrder(orderText);
    setOrderGenerated(true);
  };

  const handleCopyOrder = async () => {
    try {
      await navigator.clipboard.writeText(generatedOrder);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (deliveryZone === 'Por favor seleccionar su Barrio/Zona') {
      alert('Por favor selecciona un barrio específico para la entrega.');
      return;
    }

    setIsProcessing(true);

    try {
      const { orderId } = generateOrderText();
      const { cashTotal, transferTotal } = calculateTotals();
      
      const transferFee = transferTotal - items.filter(item => item.paymentType === 'transfer').reduce((sum, item) => {
        const basePrice = item.type === 'movie' ? CURRENT_PRICING.moviePrice : (item.selectedSeasons?.length || 1) * CURRENT_PRICING.seriesPrice;
        return sum + basePrice;
      }, 0);

      const orderData: OrderData = {
        orderId,
        customerInfo,
        deliveryZone,
        deliveryCost,
        items,
        subtotal: total,
        transferFee,
        total: finalTotal,
        cashTotal,
        transferTotal
      };

      await onCheckout(orderData);
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header con información de configuración actual */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Finalizar Pedido</h2>
                <p className="text-sm opacity-90">Complete sus datos para procesar el pedido</p>
                <p className="text-xs opacity-75">
                  Precios actuales: Película $${CURRENT_PRICING.moviePrice} CUP | Serie $${CURRENT_PRICING.seriesPrice} CUP/temp | Transferencia +${CURRENT_PRICING.transferFeePercentage}%
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
          <div className="p-4 sm:p-6">
            {/* Resumen del pedido con configuración actual */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 mb-6 border border-blue-200">
              <div className="flex items-center mb-4">
                <Calculator className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Resumen del Pedido</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                      $${total.toLocaleString()} CUP
                    </div>
                    <div className="text-sm text-gray-600">Subtotal Contenido</div>
                    <div className="text-xs text-gray-500 mt-1">${items.length} elementos</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                      $${deliveryCost.toLocaleString()} CUP
                    </div>
                    <div className="text-sm text-gray-600">Costo de Entrega</div>
                    <div className="text-xs text-gray-500 mt-1">
                      ${selectedZone?.name || 'Seleccionar zona'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 border-2 border-green-300">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">Total Final:</span>
                  <span className="text-2xl sm:text-3xl font-bold text-green-600">
                    $${finalTotal.toLocaleString()} CUP
                  </span>
                </div>
              </div>
            </div>

            {/* Resto de la implementación del checkout con configuración actual aplicada */}
            <div className="text-center p-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-lg font-bold text-green-900 mb-4">
                  CheckoutModal con Configuración Actual Aplicada
                </h4>
                <p className="text-sm text-green-700 mb-2">
                  ✅ Precios sincronizados: Película $${CURRENT_PRICING.moviePrice} CUP, Serie $${CURRENT_PRICING.seriesPrice} CUP/temp
                </p>
                <p className="text-sm text-green-700 mb-2">
                  ✅ Recargo transferencia: ${CURRENT_PRICING.transferFeePercentage}%
                </p>
                <p className="text-sm text-green-700 mb-2">
                  ✅ Zonas de entrega: ${CURRENT_DELIVERY_ZONES.length} zonas activas
                </p>
                <p className="text-xs text-gray-600 mt-4">
                  Exportado el: ${timestamp}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}