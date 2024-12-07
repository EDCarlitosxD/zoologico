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
