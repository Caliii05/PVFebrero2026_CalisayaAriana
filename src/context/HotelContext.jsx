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

  // AGREGAMOS nombre, apellido y nacionalidad como parámetros
  const crearReserva = (habitacion, dniPasajero, dias, nombre, apellido, nacionalidad) => {
    const nuevaReserva = {
      codigo: uuidv4(), // Este es el ID de la reserva
      fechaReserva: new Date().toLocaleDateString(),
      cantidadDias: parseInt(dias),
      dniPasajero: dniPasajero,
      // GUARDAMOS LOS DATOS FALTANTES AQUÍ:
      nombrePasajero: nombre,
      apellidoPasajero: apellido,
      nacionalidadPasajero: nacionalidad,
      codigoHabitacion: habitacion.codigo,
      costoTotal: habitacion.costo * dias
    };

    setReservas([...(reservas || []), nuevaReserva]);
    
    setHabitaciones(habitaciones.map(h => 
      h.codigo === habitacion.codigo ? { ...h, estado: 'Ocupada' } : h
    ));

    return nuevaReserva;
  };

  const resetearReservas = () => {
    setHabitaciones(initialRooms);
    setReservas([]);
  };

  return (
    <HotelContext.Provider value={{ habitaciones, reservas, crearReserva, resetearReservas }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => useContext(HotelContext);