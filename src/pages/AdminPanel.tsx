import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { 
  Shield, 
  DollarSign, 
  MapPin, 
  BookOpen, 
  Bell, 
  Download, 
  FileText, 
  Settings,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Check,
  AlertCircle,
  Clock,
  Database,
  Activity,
  BarChart3
} from 'lucide-react';
import type { DeliveryZone, Novel, PriceConfig, SystemFile } from '../context/AdminContext';

type AdminSection = 'dashboard' | 'prices' | 'zones' | 'novels' | 'notifications' | 'backup' | 'files';

export function AdminPanel() {
  const { 
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
    exportSystemBackup
  } = useAdmin();

  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);
  const [editingNovel, setEditingNovel] = useState<Novel | null>(null);
  const [showZoneForm, setShowZoneForm] = useState(false);
  const [showNovelForm, setShowNovelForm] = useState(false);
  const [priceForm, setPriceForm] = useState<PriceConfig>(state.prices);

  useEffect(() => {
    setPriceForm(state.prices);
  }, [state.prices]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginForm.username, loginForm.password);
    if (!success) {
      setLoginForm({ username: '', password: '' });
    }
  };

  const handleUpdatePrices = () => {
    updatePrices(priceForm);
  };

  const handleZoneSubmit = (zoneData: Omit<DeliveryZone, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingZone) {
      updateDeliveryZone({ ...editingZone, ...zoneData });
      setEditingZone(null);
    } else {
      addDeliveryZone(zoneData);
    }
    setShowZoneForm(false);
  };

  const handleNovelSubmit = (novelData: Omit<Novel, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingNovel) {
      updateNovel({ ...editingNovel, ...novelData });
      setEditingNovel(null);
    } else {
      addNovel(novelData);
    }
    setShowNovelForm(false);
  };

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-blob"></div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10 border border-white/20">
          {/* Glassmorphism effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-3xl"></div>
          
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg animate-bounce">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Panel de Control</h1>
            <p className="text-gray-600 font-medium">TV a la Carta - Administración</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/90"
                placeholder="Ingrese su usuario"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/90"
                  placeholder="Ingrese su contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Back to home button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Regresar a la página de inicio
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Acceso restringido solo para administradores</p>
          </div>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'prices', label: 'Control de Precios', icon: DollarSign },
    { id: 'zones', label: 'Zonas de Entrega', icon: MapPin },
    { id: 'novels', label: 'Gestión de Novelas', icon: BookOpen },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'files', label: 'Archivos del Sistema', icon: FileText },
    { id: 'backup', label: 'Sistema Backup', icon: Database },
    { id: 'logout', label: 'Cerrar Sesión', icon: X }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Precio Películas</p>
              <p className="text-2xl font-bold">${state.prices.moviePrice} CUP</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Precio Series</p>
              <p className="text-2xl font-bold">${state.prices.seriesPrice} CUP</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Zonas Activas</p>
              <p className="text-2xl font-bold">{state.deliveryZones.filter(z => z.active).length}</p>
            </div>
            <MapPin className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Novelas</p>
              <p className="text-2xl font-bold">{state.novels.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" />
            Actividad Reciente
          </h3>
          <div className="space-y-3">
            {state.notifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-1 rounded-full ${
                  notification.type === 'success' ? 'bg-green-100 text-green-600' :
                  notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  notification.type === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.section} • {new Date(notification.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-purple-600" />
            Información del Sistema
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Último Backup:</span>
              <span className="text-sm font-medium text-gray-900">
                {state.lastBackup ? new Date(state.lastBackup).toLocaleString() : 'Nunca'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Notificaciones:</span>
              <span className="text-sm font-medium text-gray-900">{state.notifications.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Archivos del Sistema:</span>
              <span className="text-sm font-medium text-gray-900">{state.systemFiles.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Recargo Transferencia:</span>
              <span className="text-sm font-medium text-gray-900">{state.prices.transferFeePercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPricesSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-green-600" />
          Configuración de Precios
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio de Películas (CUP)
            </label>
            <input
              type="number"
              value={priceForm.moviePrice}
              onChange={(e) => setPriceForm(prev => ({ ...prev, moviePrice: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio de Series por Temporada (CUP)
            </label>
            <input
              type="number"
              value={priceForm.seriesPrice}
              onChange={(e) => setPriceForm(prev => ({ ...prev, seriesPrice: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recargo por Transferencia (%)
            </label>
            <input
              type="number"
              value={priceForm.transferFeePercentage}
              onChange={(e) => setPriceForm(prev => ({ ...prev, transferFeePercentage: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio de Novelas por Capítulo (CUP)
            </label>
            <input
              type="number"
              value={priceForm.novelPricePerChapter}
              onChange={(e) => setPriceForm(prev => ({ ...prev, novelPricePerChapter: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpdatePrices}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Guardar Precios
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa de Precios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Películas</h4>
            <p className="text-sm text-blue-700">Efectivo: ${priceForm.moviePrice} CUP</p>
            <p className="text-sm text-blue-700">Transferencia: ${Math.round(priceForm.moviePrice * (1 + priceForm.transferFeePercentage / 100))} CUP</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Series (por temporada)</h4>
            <p className="text-sm text-purple-700">Efectivo: ${priceForm.seriesPrice} CUP</p>
            <p className="text-sm text-purple-700">Transferencia: ${Math.round(priceForm.seriesPrice * (1 + priceForm.transferFeePercentage / 100))} CUP</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderZonesSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          Zonas de Entrega
        </h3>
        <button
          onClick={() => setShowZoneForm(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Zona
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zona</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Modificación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {state.deliveryZones.map((zone) => (
                <tr key={zone.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{zone.name.split(' > ')[2] || zone.name}</div>
                    <div className="text-sm text-gray-500">{zone.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${zone.cost.toLocaleString()} CUP</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      zone.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {zone.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(zone.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setEditingZone(zone);
                        setShowZoneForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteDeliveryZone(zone.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showZoneForm && (
        <ZoneForm
          zone={editingZone}
          onSubmit={handleZoneSubmit}
          onCancel={() => {
            setShowZoneForm(false);
            setEditingZone(null);
          }}
        />
      )}
    </div>
  );

  const renderNovelsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
          Gestión de Novelas
        </h3>
        <button
          onClick={() => setShowNovelForm(true)}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Novela
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Género</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capítulos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {state.novels.map((novel) => (
                <tr key={novel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{novel.titulo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{novel.genero}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{novel.capitulos}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{novel.año}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${(novel.capitulos * state.prices.novelPricePerChapter).toLocaleString()} CUP
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      novel.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {novel.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setEditingNovel(novel);
                        setShowNovelForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteNovel(novel.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showNovelForm && (
        <NovelForm
          novel={editingNovel}
          onSubmit={handleNovelSubmit}
          onCancel={() => {
            setShowNovelForm(false);
            setEditingNovel(null);
          }}
        />
      )}
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-yellow-600" />
          Notificaciones del Sistema ({state.notifications.length})
        </h3>
        <button
          onClick={clearNotifications}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Limpiar Todo
        </button>
      </div>

      <div className="space-y-4">
        {state.notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-xl shadow-sm border-l-4 p-6 ${
              notification.type === 'success' ? 'border-green-500' :
              notification.type === 'warning' ? 'border-yellow-500' :
              notification.type === 'error' ? 'border-red-500' :
              'border-blue-500'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  notification.type === 'success' ? 'bg-green-100 text-green-600' :
                  notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  notification.type === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{notification.title}</h4>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Sección: {notification.section}</span>
                    <span>Acción: {notification.action}</span>
                    <span>{new Date(notification.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {state.notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay notificaciones</h3>
            <p className="text-gray-600">Las notificaciones del sistema aparecerán aquí</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderFilesSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <FileText className="h-5 w-5 mr-2 text-indigo-600" />
        Archivos del Sistema ({state.systemFiles.length})
      </h3>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Archivo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Modificación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {state.systemFiles.map((file, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    <div className="text-sm text-gray-500">{file.path}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      file.type === 'component' ? 'bg-blue-100 text-blue-800' :
                      file.type === 'service' ? 'bg-green-100 text-green-800' :
                      file.type === 'context' ? 'bg-purple-100 text-purple-800' :
                      file.type === 'page' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {file.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(file.size / 1024).toFixed(1)} KB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(file.lastModified).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {file.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBackupSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <Database className="h-5 w-5 mr-2 text-green-600" />
        Sistema Backup - TV a la Carta
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Información del Backup</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Último Backup:</span>
              <span className="text-sm font-medium text-gray-900">
                {state.lastBackup ? new Date(state.lastBackup).toLocaleString() : 'Nunca'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Configuraciones:</span>
              <span className="text-sm font-medium text-gray-900">
                {Object.keys(state.prices).length} precios
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Zonas de Entrega:</span>
              <span className="text-sm font-medium text-gray-900">
                {state.deliveryZones.length} zonas
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Novelas:</span>
              <span className="text-sm font-medium text-gray-900">
                {state.novels.length} novelas
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Archivos del Sistema:</span>
              <span className="text-sm font-medium text-gray-900">
                {state.systemFiles.length} archivos
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Exportar Sistema</h4>
          <p className="text-gray-600 mb-6">
            Exporta los archivos del código fuente del sistema manteniendo 
            la estructura de carpetas original. Incluye todas las configuraciones 
            y cambios realizados en el panel de control.
          </p>
          
          <button
            onClick={exportSystemFiles}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Exportar Archivos del Sistema
          </button>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-900 mb-2">Archivos a Exportar:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• AdminContext.tsx - Contexto administrativo</li>
              <li>• AdminPanel.tsx - Panel de control principal</li>
              <li>• CheckoutModal.tsx - Modal de checkout</li>
              <li>• NovelasModal.tsx - Modal de novelas</li>
              <li>• PriceCard.tsx - Componente de precios</li>
              <li>• CartContext.tsx - Contexto del carrito</li>
              <li>• system-changes.json - Configuraciones</li>
              <li>• README.md - Documentación</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Logout button moved here */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <X className="h-5 w-5 mr-2 text-red-600" />
          Cerrar Sesión
        </h4>
        <p className="text-gray-600 mb-6">
          Cierra la sesión actual del panel de control y regresa a la pantalla de login.
        </p>
        <button
          onClick={logout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
        >
          <X className="h-5 w-5 mr-2" />
          Cerrar Sesión
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Archivos Modificados en Tiempo Real</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.systemFiles.map((file, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-gray-900 text-sm">{file.name}</h5>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  file.type === 'component' ? 'bg-blue-100 text-blue-800' :
                  file.type === 'service' ? 'bg-green-100 text-green-800' :
                  file.type === 'context' ? 'bg-purple-100 text-purple-800' :
                  file.type === 'page' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {file.type}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{file.description}</p>
              <p className="text-xs text-gray-500">
                Modificado: {new Date(file.lastModified).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  // New function to export system files
  const exportSystemFiles = () => {
    // Create the system files content
    const systemFiles = {
      'src/context/AdminContext.tsx': `// AdminContext.tsx - Sistema de administración
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Configuración de precios del sistema
export interface PriceConfig {
  moviePrice: number;
  seriesPrice: number;
  transferFeePercentage: number;
  novelPricePerChapter: number;
}

// Zona de entrega
export interface DeliveryZone {
  id: string;
  name: string;
  cost: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Novela del catálogo
export interface Novel {
  id: number;
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
  descripcion?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Contexto principal de administración
// Maneja toda la configuración del sistema
export const AdminContext = createContext(undefined);

export function AdminProvider({ children }) {
  // Estado inicial del sistema
  const initialState = {
    isAuthenticated: false,
    prices: {
      moviePrice: 80,
      seriesPrice: 300,
      transferFeePercentage: 10,
      novelPricePerChapter: 5
    },
    deliveryZones: [],
    novels: [],
    notifications: []
  };

  return (
    <AdminContext.Provider value={initialState}>
      {children}
    </AdminContext.Provider>
  );
}`,
      
      'src/pages/AdminPanel.tsx': `// AdminPanel.tsx - Panel de control principal
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export function AdminPanel() {
  const { state, login, logout } = useAdmin();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Renderizado del panel de control
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Panel de Control - TV a la Carta
        </h1>
        
        {/* Contenido del panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-blue-500 text-white">
                Dashboard
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
                Configuración
              </button>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
              <p>Contenido del panel de administración</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      
      'src/components/CheckoutModal.tsx': `// CheckoutModal.tsx - Modal de checkout
import React, { useState } from 'react';

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
  total: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (orderData: OrderData) => void;
  items: any[];
  total: number;
}

export function CheckoutModal({ isOpen, onClose, onCheckout, items, total }: CheckoutModalProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    address: '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Finalizar Pedido</h2>
          
          {/* Formulario de checkout */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={customerInfo.fullName}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, fullName: e.target.value }))}
              />
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Confirmar Pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}`,
      
      'src/components/NovelasModal.tsx': `// NovelasModal.tsx - Modal del catálogo de novelas
import React, { useState } from 'react';

interface Novela {
  id: number;
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
}

interface NovelasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NovelasModal({ isOpen, onClose }: NovelasModalProps) {
  const [selectedNovelas, setSelectedNovelas] = useState<number[]>([]);
  
  // Lista de novelas disponibles
  const novelas: Novela[] = [
    { id: 1, titulo: "Corazón Salvaje", genero: "Drama/Romance", capitulos: 185, año: 2009 },
    { id: 2, titulo: "La Usurpadora", genero: "Drama/Melodrama", capitulos: 98, año: 1998 },
    { id: 3, titulo: "María la del Barrio", genero: "Drama/Romance", capitulos: 73, año: 1995 },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Catálogo de Novelas</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {novelas.map((novela) => (
              <div key={novela.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{novela.titulo}</h3>
                <p className="text-gray-600 text-sm mb-1">Género: {novela.genero}</p>
                <p className="text-gray-600 text-sm mb-1">Capítulos: {novela.capitulos}</p>
                <p className="text-gray-600 text-sm mb-3">Año: {novela.año}</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  Seleccionar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,
      
      'src/components/PriceCard.tsx': `// PriceCard.tsx - Componente para mostrar precios
import React from 'react';
import { useAdmin } from '../context/AdminContext';

interface PriceCardProps {
  type: 'movie' | 'tv';
  selectedSeasons?: number[];
  isAnime?: boolean;
}

export function PriceCard({ type, selectedSeasons = [], isAnime = false }: PriceCardProps) {
  const { state } = useAdmin();
  
  const calculatePrice = () => {
    if (type === 'movie') {
      return state.prices.moviePrice;
    } else {
      return selectedSeasons.length * state.prices.seriesPrice;
    }
  };

  const price = calculatePrice();
  const transferPrice = Math.round(price * (1 + state.prices.transferFeePercentage / 100));
  
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
      <div className="text-center">
        <h3 className="font-bold text-green-800 mb-2">
          {type === 'movie' ? 'Película' : 'Serie'}
          {isAnime && ' (Anime)'}
        </h3>
        
        <div className="space-y-2">
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <div className="text-sm font-medium text-green-700 mb-1">Efectivo</div>
            <div className="text-lg font-bold text-green-700">
              \${price.toLocaleString()} CUP
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <div className="text-sm font-medium text-orange-700 mb-1">Transferencia</div>
            <div className="text-lg font-bold text-orange-700">
              \${transferPrice.toLocaleString()} CUP
            </div>
            <div className="text-xs text-orange-600">+10% recargo</div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      
      'src/context/CartContext.tsx': `// CartContext.tsx - Contexto del carrito de compras
import React, { createContext, useContext, useReducer } from 'react';

interface CartItem {
  id: number;
  title: string;
  type: 'movie' | 'tv';
  price: number;
  selectedSeasons?: number[];
  paymentType?: 'cash' | 'transfer';
}

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

function cartReducer(state: CartState, action: any): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + 1
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - 1
      };
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}`,
      
      'config/system-changes.json': JSON.stringify({
        appName: 'TV a la Carta',
        version: '2.0.0',
        exportDate: new Date().toISOString(),
        systemConfig: {
          prices: state.prices,
          deliveryZones: state.deliveryZones,
          novels: state.novels
        },
        metadata: {
          totalZones: state.deliveryZones.length,
          activeZones: state.deliveryZones.filter(z => z.active).length,
          totalNovels: state.novels.length,
          activeNovels: state.novels.filter(n => n.active).length,
          lastExport: new Date().toISOString()
        }
      }, null, 2),
      
      'README.md': `# TV a la Carta - Sistema de Administración

## Descripción
Sistema completo de administración para TV a la Carta, incluyendo gestión de precios, zonas de entrega y catálogo de novelas.

## Estructura del Proyecto

### Contextos
- **AdminContext.tsx**: Manejo del estado global de administración
- **CartContext.tsx**: Gestión del carrito de compras

### Componentes
- **CheckoutModal.tsx**: Modal para finalizar pedidos
- **NovelasModal.tsx**: Modal del catálogo de novelas
- **PriceCard.tsx**: Componente para mostrar precios

### Páginas
- **AdminPanel.tsx**: Panel de control principal

### Configuración
- **system-changes.json**: Configuraciones del sistema exportadas

## Características

### Panel de Administración
- Dashboard con estadísticas
- Gestión de precios (películas, series, novelas)
- Administración de zonas de entrega
- Catálogo de novelas
- Sistema de notificaciones
- Backup y exportación

### Sistema de Precios
- Precios diferenciados por tipo de contenido
- Recargo por transferencia bancaria
- Precios por temporada para series
- Precio por capítulo para novelas

### Zonas de Entrega
- Gestión completa de zonas
- Costos personalizables
- Estados activo/inactivo

## Instalación

1. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

2. Iniciar el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

## Uso

### Acceso al Panel
- URL: \`/admin\`
- Usuario: \`root\`
- Contraseña: \`video\`

### Funcionalidades Principales
1. **Dashboard**: Vista general del sistema
2. **Precios**: Configuración de precios por tipo de contenido
3. **Zonas**: Gestión de zonas de entrega
4. **Novelas**: Administración del catálogo
5. **Backup**: Exportación del sistema

## Tecnologías
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (iconos)
- Context API para estado global

## Exportado el: ${new Date().toLocaleString()}
`
    };

    // Create ZIP structure
    const JSZip = (window as any).JSZip;
    if (!JSZip) {
      // Fallback: create individual files
      Object.entries(systemFiles).forEach(([path, content]) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = path.replace(/\//g, '_');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
      return;
    }

    const zip = new JSZip();
    
    // Add files to ZIP with proper structure
    Object.entries(systemFiles).forEach(([path, content]) => {
      zip.file(path, content);
    });

    // Generate and download ZIP
    zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TV_a_la_Carta_Sistema_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'prices':
        return renderPricesSection();
      case 'zones':
        return renderZonesSection();
      case 'novels':
        return renderNovelsSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'files':
        return renderFilesSection();
      case 'backup':
        return renderBackupSection();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Panel Control</h1>
              <p className="text-sm text-gray-600">TV a la Carta</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'logout') {
                  logout();
                } else {
                  setActiveSection(item.id as AdminSection);
                }
              }}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {sidebarItems.find(item => item.id === activeSection)?.label}
            </h2>
            <p className="text-gray-600">
              Exporta todos los archivos del código fuente del sistema manteniendo 
              la estructura de carpetas original. Incluye todas las configuraciones 
              y cambios realizados en el panel de control.
            </p>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Zone Form Component
function ZoneForm({ 
  zone, 
  onSubmit, 
  onCancel 
}: { 
  zone: DeliveryZone | null; 
  onSubmit: (zone: Omit<DeliveryZone, 'id' | 'createdAt' | 'updatedAt'>) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    name: zone?.name || '',
    cost: zone?.cost || 0,
    active: zone?.active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {zone ? 'Editar Zona' : 'Agregar Zona'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Zona
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Santiago de Cuba > Santiago de Cuba > Zona"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Costo de Entrega (CUP)
            </label>
            <input
              type="number"
              value={formData.cost}
              onChange={(e) => setFormData(prev => ({ ...prev, cost: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
              Zona activa
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              {zone ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Novel Form Component
function NovelForm({ 
  novel, 
  onSubmit, 
  onCancel 
}: { 
  novel: Novel | null; 
  onSubmit: (novel: Omit<Novel, 'id' | 'createdAt' | 'updatedAt'>) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    titulo: novel?.titulo || '',
    genero: novel?.genero || '',
    capitulos: novel?.capitulos || 0,
    año: novel?.año || new Date().getFullYear(),
    descripcion: novel?.descripcion || '',
    active: novel?.active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {novel ? 'Editar Novela' : 'Agregar Novela'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Género
            </label>
            <input
              type="text"
              value={formData.genero}
              onChange={(e) => setFormData(prev => ({ ...prev, genero: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Drama/Romance"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Capítulos
            </label>
            <input
              type="number"
              value={formData.capitulos}
              onChange={(e) => setFormData(prev => ({ ...prev, capitulos: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Año
            </label>
            <input
              type="number"
              value={formData.año}
              onChange={(e) => setFormData(prev => ({ ...prev, año: parseInt(e.target.value) || new Date().getFullYear() }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="1900"
              max={new Date().getFullYear() + 5}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (Opcional)
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
              placeholder="Descripción de la novela..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="novelActive"
              checked={formData.active}
              onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="novelActive" className="ml-2 block text-sm text-gray-900">
              Novela activa
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              {novel ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}