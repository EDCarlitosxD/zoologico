import { Evento } from "./Horario";
import { IRecorrido } from "./Recorridos";

export interface IReserva {
  id?: number; // Corresponde a $table->id()
  id_usuario: number; // Corresponde a $table->unsignedBigInteger('id_usuario')
  cantidad?: number; // Corresponde a $table->integer('cantidad_personas')->nullable()
  id_horario_recorrido: number; // Corresponde a $table->unsignedBigInteger('id_horario_recorrido')
  id_recorrido? : number,
  estado?: boolean; // Corresponde a $table->boolean("estado")->default(1)
  createdAt?: Date; // Corresponde a $table->timestamps()
  updatedAt?: Date; // Corresponde a $table->timestamps()
}


export interface IReservaInformacion {
  reserva: IReserva;
  horario: Evento;
  tour: IRecorrido;
}


export interface IReservaDashboard {
  precio_total: string;       // Precio total de la reserva
  fecha: string;              // Fecha de la reserva en formato "YYYY-MM-DD"
  cantidad: number;           // Cantidad de personas en la reserva
  horario_inicio: string;     // Hora de inicio del recorrido en formato "HH:mm:ss"
  horario_fin: string;     // Hora de inicio del recorrido en formato "HH:mm:ss"
  titulo: string;             // Título del recorrido
  nombre_completo: string;    // Nombre completo del guía
}
