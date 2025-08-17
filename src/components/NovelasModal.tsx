// Archivo generado automáticamente el 2025-08-17T16:37:05.196Z
// NovelasModal con configuración actual aplicada

import React, { useState, useEffect } from 'react';
import { X, Download, MessageCircle, Phone, BookOpen, Info, Check, DollarSign, CreditCard, Calculator } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

// Catálogo de novelas actual aplicado
const CURRENT_NOVELAS_CATALOG = [
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
];

// Configuración de precios actual
const CURRENT_PRICING_CONFIG = {
  "moviePrice": 90,
  "seriesPrice": 350,
  "transferFeePercentage": 15
};

interface Novela {
  id: number;
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
  descripcion?: string;
  paymentType?: 'cash' | 'transfer';
}

interface NovelasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NovelasModal({ isOpen, onClose }: NovelasModalProps) {
  const { getCurrentConfig } = useAdmin();
  
  // Obtener configuración actual del admin
  const currentConfig = getCurrentConfig();
  
  const [selectedNovelas, setSelectedNovelas] = useState<number[]>([]);
  const [novelasWithPayment, setNovelasWithPayment] = useState<Novela[]>([]);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showNovelList, setShowNovelList] = useState(false);

  // Usar catálogo actual aplicado
  const novelas: Novela[] = CURRENT_NOVELAS_CATALOG.map(novela => ({
    id: novela.id,
    titulo: novela.titulo,
    genero: novela.genero,
    capitulos: novela.capitulos,
    año: novela.año,
    descripcion: novela.descripcion
  }));

  const phoneNumber = '+5354690878';

  // Inicializar novelas con tipo de pago por defecto
  useEffect(() => {
    const novelasWithDefaultPayment = novelas.map(novela => ({
      ...novela,
      paymentType: 'cash' as const
    }));
    setNovelasWithPayment(novelasWithDefaultPayment);
  }, []);

  const handleNovelToggle = (novelaId: number) => {
    setSelectedNovelas(prev => {
      if (prev.includes(novelaId)) {
        return prev.filter(id => id !== novelaId);
      } else {
        return [...prev, novelaId];
      }
    });
  };

  const handlePaymentTypeChange = (novelaId: number, paymentType: 'cash' | 'transfer') => {
    setNovelasWithPayment(prev => 
      prev.map(novela => 
        novela.id === novelaId 
          ? { ...novela, paymentType }
          : novela
      )
    );
  };

  const selectAllNovelas = () => {
    setSelectedNovelas(novelas.map(n => n.id));
  };

  const clearAllNovelas = () => {
    setSelectedNovelas([]);
  };

  // Calcular totales usando configuración actual
  const calculateTotals = () => {
    const selectedNovelasData = novelasWithPayment.filter(n => selectedNovelas.includes(n.id));
    
    const cashNovelas = selectedNovelasData.filter(n => n.paymentType === 'cash');
    const transferNovelas = selectedNovelasData.filter(n => n.paymentType === 'transfer');
    
    const cashTotal = cashNovelas.reduce((sum, n) => {
      const novelaConfig = CURRENT_NOVELAS_CATALOG.find(config => config.id === n.id);
      return sum + (novelaConfig?.costoEfectivo || n.capitulos * 5);
    }, 0);
    
    const transferTotal = transferNovelas.reduce((sum, n) => {
      const novelaConfig = CURRENT_NOVELAS_CATALOG.find(config => config.id === n.id);
      return sum + (novelaConfig?.costoTransferencia || Math.round((n.capitulos * 5) * (1 + CURRENT_PRICING_CONFIG.transferFeePercentage / 100)));
    }, 0);
    
    const transferBaseTotal = transferNovelas.reduce((sum, n) => {
      const novelaConfig = CURRENT_NOVELAS_CATALOG.find(config => config.id === n.id);
      return sum + (novelaConfig?.costoEfectivo || n.capitulos * 5);
    }, 0);
    
    const transferFee = transferTotal - transferBaseTotal;
    
    const grandTotal = cashTotal + transferTotal;
    
    return {
      cashNovelas,
      transferNovelas,
      cashTotal,
      transferBaseTotal,
      transferFee,
      transferTotal,
      grandTotal,
      totalCapitulos: selectedNovelasData.reduce((sum, n) => sum + n.capitulos, 0)
    };
  };

  const totals = calculateTotals();

  const generateNovelListText = () => {
    let listText = "📚 CATÁLOGO DE NOVELAS DISPONIBLES\n";
    listText += "TV a la Carta - Novelas Completas\n\n";
    listText += "💰 Precios variables según novela\n";
    listText += "📱 Contacto: +5354690878\n\n";
    listText += "═══════════════════════════════════\n\n";
    
    // Separar novelas por tipo de pago para mostrar cálculos
    listText += "💵 PRECIOS EN EFECTIVO:\n";
    listText += "═══════════════════════════════════\n\n";
    
    novelas.forEach((novela, index) => {
      const novelaConfig = CURRENT_NOVELAS_CATALOG.find(config => config.id === novela.id);
      const baseCost = novelaConfig?.costoEfectivo || novela.capitulos * 5;
      listText += `${index + 1}. ${novela.titulo}\n`;
      listText += `   📺 Género: ${novela.genero}\n`;
      listText += `   📊 Capítulos: ${novela.capitulos}\n`;
      listText += `   📅 Año: ${novela.año}\n`;
      listText += `   💰 Costo en efectivo: $${baseCost.toLocaleString()} CUP\n\n`;
    });
    
    listText += `\n🏦 PRECIOS CON TRANSFERENCIA BANCARIA (+${CURRENT_PRICING_CONFIG.transferFeePercentage}%):\n`;
    listText += "═══════════════════════════════════\n\n";
    
    novelas.forEach((novela, index) => {
      const novelaConfig = CURRENT_NOVELAS_CATALOG.find(config => config.id === novela.id);
      const baseCost = novelaConfig?.costoEfectivo || novela.capitulos * 5;
      const transferCost = novelaConfig?.costoTransferencia || Math.round(baseCost * (1 + CURRENT_PRICING_CONFIG.transferFeePercentage / 100));
      const recargo = transferCost - baseCost;
      listText += `${index + 1}. ${novela.titulo}\n`;
      listText += `   📺 Género: ${novela.genero}\n`;
      listText += `   📊 Capítulos: ${novela.capitulos}\n`;
      listText += `   📅 Año: ${novela.año}\n`;
      listText += `   💰 Costo base: $${baseCost.toLocaleString()} CUP\n`;
      listText += `   💳 Recargo (${CURRENT_PRICING_CONFIG.transferFeePercentage}%): +$${recargo.toLocaleString()} CUP\n`;
      listText += `   💰 Costo con transferencia: $${transferCost.toLocaleString()} CUP\n\n`;
    });
    
    listText += "\n📊 RESUMEN DE COSTOS:\n";
    listText += "═══════════════════════════════════\n\n";
    
    const totalCapitulos = novelas.reduce((sum, novela) => sum + novela.capitulos, 0);
    const totalEfectivo = novelas.reduce((sum, novela) => {
      const novelaConfig = CURRENT_NOVELAS_CATALOG.find(config => config.id === novela.id);
      return sum + (novelaConfig?.costoEfectivo || novela.capitulos * 5);
    }, 0);
    const totalTransferencia = novelas.reduce((sum, novela) => {
      const novelaConfig = CURRENT_NOVELAS_CATALOG.find(config => config.id === novela.id);
      return sum + (novelaConfig?.costoTransferencia || Math.round((novela.capitulos * 5) * (1 + CURRENT_PRICING_CONFIG.transferFeePercentage / 100)));
    }, 0);
    const totalRecargo = totalTransferencia - totalEfectivo;
    
    listText += `📊 Total de novelas: ${novelas.length}\n`;
    listText += `📊 Total de capítulos: ${totalCapitulos.toLocaleString()}\n\n`;
    listText += `💵 CATÁLOGO COMPLETO EN EFECTIVO:\n`;
    listText += `   💰 Costo total: $${totalEfectivo.toLocaleString()} CUP\n\n`;
    listText += `🏦 CATÁLOGO COMPLETO CON TRANSFERENCIA:\n`;
    listText += `   💰 Costo base: $${totalEfectivo.toLocaleString()} CUP\n`;
    listText += `   💳 Recargo total (${CURRENT_PRICING_CONFIG.transferFeePercentage}%): +$${totalRecargo.toLocaleString()} CUP\n`;
    listText += `   💰 Costo total con transferencia: $${totalTransferencia.toLocaleString()} CUP\n\n`;
    
    listText += "═══════════════════════════════════\n";
    listText += "💡 INFORMACIÓN IMPORTANTE:\n";
    listText += "• Los precios en efectivo no tienen recargo adicional\n";
    listText += `• Las transferencias bancarias tienen un ${CURRENT_PRICING_CONFIG.transferFeePercentage}% de recargo\n`;
    listText += "• Puedes seleccionar novelas individuales o el catálogo completo\n";
    listText += "• Todos los precios están en pesos cubanos (CUP)\n\n";
    listText += "📞 Para encargar, contacta al +5354690878\n";
    listText += "🌟 ¡Disfruta de las mejores novelas!\n";
    listText += `\n📅 Generado el: ${new Date().toLocaleString('es-ES')}`;
    
    return listText;
  };

  const downloadNovelList = () => {
    const listText = generateNovelListText();
    const blob = new Blob([listText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Catalogo_Novelas_TV_a_la_Carta.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sendSelectedNovelas = () => {
    if (selectedNovelas.length === 0) {
      alert('Por favor selecciona al menos una novela');
      return;
    }

    const { cashNovelas, transferNovelas, cashTotal, transferBaseTotal, transferFee, transferTotal, grandTotal, totalCapitulos } = totals;
    
    let message = "Estoy interesado en el catálogo de novelas\nQuiero encargar los títulos o el título:\n\n";
    
    // Novelas en efectivo
    if (cashNovelas.length > 0) {
      message += "💵 PAGO EN EFECTIVO:\n";
      message += "═══════════════════════════════════\n";
      cashNovelas.forEach((novela, index) => {
        const novelaConfig = CURRENT_NOVELAS_CATALOG.find(config => config.id === novela.id);
        const costo = novelaConfig?.costoEfectivo || novela.capitulos * 5;
        message += `${index + 1}. ${novela.titulo}\n`;
        message += `   📺 Género: ${novela.genero}\n`;
        message += `   📊 Capítulos: ${novela.capitulos}\n`;
        message += `   📅 Año: ${novela.año}\n`;
        message += `   💰 Costo: $${costo.toLocaleString()} CUP\n\n`;
      });
      message += `💰 Subtotal Efectivo: $${cashTotal.toLocaleString()} CUP\n`;
      message += `📊 Total capítulos: ${cashNovelas.reduce((sum, n) => sum + n.capitulos, 0)}\n\n`;
    }
    
    // Novelas por transferencia
    if (transferNovelas.length > 0) {
      message += `🏦 PAGO POR TRANSFERENCIA BANCARIA (+${CURRENT_PRICING_CONFIG.transferFeePercentage}%):\n`;
      message += "═══════════════════════════════════\n";
      transferNovelas.forEach((novela, index) => {
        const novelaConfig = CURRENT_NOVELAS_CATALOG.find(config => config.id === novela.id);
        const baseCost = novelaConfig?.costoEfectivo || novela.capitulos * 5;
        const totalCost = novelaConfig?.costoTransferencia || Math.round(baseCost * (1 + CURRENT_PRICING_CONFIG.transferFeePercentage / 100));
        const fee = totalCost - baseCost;
        message += `${index + 1}. ${novela.titulo}\n`;
        message += `   📺 Género: ${novela.genero}\n`;
        message += `   📊 Capítulos: ${novela.capitulos}\n`;
        message += `   📅 Año: ${novela.año}\n`;
        message += `   💰 Costo base: $${baseCost.toLocaleString()} CUP\n`;
        message += `   💳 Recargo (${CURRENT_PRICING_CONFIG.transferFeePercentage}%): +$${fee.toLocaleString()} CUP\n`;
        message += `   💰 Costo total: $${totalCost.toLocaleString()} CUP\n\n`;
      });
      message += `💰 Subtotal base transferencia: $${transferBaseTotal.toLocaleString()} CUP\n`;
      message += `💳 Recargo total (${CURRENT_PRICING_CONFIG.transferFeePercentage}%): +$${transferFee.toLocaleString()} CUP\n`;
      message += `💰 Subtotal Transferencia: $${transferTotal.toLocaleString()} CUP\n`;
      message += `📊 Total capítulos: ${transferNovelas.reduce((sum, n) => sum + n.capitulos, 0)}\n\n`;
    }
    
    // Resumen final
    message += "📊 RESUMEN FINAL:\n";
    message += "═══════════════════════════════════\n";
    message += `• Total de novelas: ${selectedNovelas.length}\n`;
    message += `• Total de capítulos: ${totalCapitulos}\n`;
    if (cashTotal > 0) {
      message += `• Efectivo: $${cashTotal.toLocaleString()} CUP (${cashNovelas.length} novelas)\n`;
    }
    if (transferTotal > 0) {
      message += `• Transferencia: $${transferTotal.toLocaleString()} CUP (${transferNovelas.length} novelas)\n`;
    }
    message += `• TOTAL A PAGAR: $${grandTotal.toLocaleString()} CUP\n\n`;
    message += `📱 Enviado desde TV a la Carta\n`;
    message += `📅 Fecha: ${new Date().toLocaleString('es-ES')}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5354690878?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = "Gracias por escribir a [TV a la Carta], se ha comunicado con el operador [Yero], Gracias por dedicarnos un momento de su tiempo hoy. ¿En qué puedo serle útil?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5354690878?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl animate-in fade-in duration-300">
        {/* Header con información de configuración actual */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-xl mr-4 shadow-lg">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Catálogo de Novelas</h2>
                <p className="text-sm sm:text-base opacity-90">
                  ${novelas.length} novelas disponibles | Transferencia +${CURRENT_PRICING_CONFIG.transferFeePercentage}%
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
            {/* Información de configuración actual aplicada */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-pink-200">
              <div className="flex items-center mb-4">
                <div className="bg-pink-100 p-3 rounded-xl mr-4">
                  <Info className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-pink-900">Catálogo con Configuración Actual Aplicada</h3>
              </div>
              
              <div className="space-y-4 text-pink-800">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📚</span>
                  <p className="font-semibold">Total de novelas: ${CURRENT_NOVELAS_CATALOG.length}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💰</span>
                  <p className="font-semibold">Precios sincronizados con panel de control</p>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💳</span>
                  <p className="font-semibold">Recargo transferencia: +${CURRENT_PRICING_CONFIG.transferFeePercentage}%</p>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📱</span>
                  <p className="font-semibold">Contacto: ${phoneNumber}</p>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-xl p-4 border border-pink-300">
                <div className="text-center">
                  <p className="text-sm text-green-700 mb-2">
                    ✅ Configuración actual aplicada y sincronizada
                  </p>
                  <p className="text-xs text-gray-600">
                    Exportado el: ${timestamp}
                  </p>
                </div>
              </div>
            </div>

            {/* Resto de la implementación del modal con configuración actual aplicada */}
            <div className="text-center p-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-lg font-bold text-green-900 mb-4">
                  NovelasModal con Configuración Actual Aplicada
                </h4>
                <p className="text-sm text-green-700 mb-2">
                  ✅ Catálogo sincronizado: ${CURRENT_NOVELAS_CATALOG.length} novelas
                </p>
                <p className="text-sm text-green-700 mb-2">
                  ✅ Precios actualizados automáticamente
                </p>
                <p className="text-sm text-green-700 mb-2">
                  ✅ Recargo transferencia: ${CURRENT_PRICING_CONFIG.transferFeePercentage}%
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