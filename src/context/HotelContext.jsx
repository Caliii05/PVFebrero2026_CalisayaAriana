import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const HotelContext = createContext();

const initialRooms = [
  { codigo: '101', tipo: 'Simple', servicios: 'WiFi, TV', descripcion: 'Habitación económica vista interna', costo: 3500, estado: 'Disponible' },
  { codigo: '201', tipo: 'Doble', servicios: 'WiFi, TV, Aire', descripcion: 'Cama matrimonial vista al mar', costo: 6000, estado: 'Disponible' },
  { codigo: '301', tipo: 'Triple', servicios: 'WiFi, Frigobar', descripcion: 'Tres camas individuales', costo: 8500, estado: 'Disponible' },
  { codigo: '401', tipo: 'Premium', servicios: 'Jacuzzi, All inclusive', descripcion: 'Suite de lujo', costo: 15000, estado: 'Disponible' },
];

export const HotelProvider = ({ children }) => {
  const [habitaciones, setHabitaciones] = useLocalStorage('hotel_rooms', initialRooms);
  const [reservas, setReservas] = useLocalStorage('hotel_reservas', []);

  const crearReserva = (habitacion, dniPasajero, dias) => {
    const nuevaReserva = {
      codigo: uuidv4(),
      fechaReserva: new Date().toLocaleDateString(),
      cantidadDias: parseInt(dias),
      dniPasajero,
      codigoHabitacion: habitacion.codigo,
      costoTotal: habitacion.costo * dias
    };

    setReservas([...(reservas || []), nuevaReserva]);
    
    setHabitaciones(habitaciones.map(h => 
      h.codigo === habitacion.codigo ? { ...h, estado: 'Ocupada' } : h
    ));

    return nuevaReserva;
  };

  // NUEVA FUNCIÓN PARA LIBERAR HABITACIONES
  const resetearReservas = () => {
    setHabitaciones(initialRooms); // Volvemos al estado inicial (todas disponibles)
    setReservas([]); // Borramos la lista de reservas
    // Como usamos useLocalStorage, esto se actualiza automáticamente en el navegador
  };

  return (
    // Agregamos resetearReservas al value
    <HotelContext.Provider value={{ habitaciones, reservas, crearReserva, resetearReservas }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  return context;
};