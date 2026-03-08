import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PanelAdminDataService {
  /**
   * Dataset temporal en memoria utilizado para simular
   * persistencia de datos durante el desarrollo del frontend.
   *
   * Permite avanzar con la lógica del panel admin sin depender
   * de un backend real.
   *
   * En backend real:
   * este almacenamiento desaparecerá y los datos vendrán
   * desde una API mediante HttpClient.
   */
  private data: any = {
    novedades: [
      { id: 1, titulo: 'Mejora en reportes', fecha: '12/08/2025' },
      { id: 2, titulo: 'Nueva versión móvil', fecha: '05/07/2025' },
    ],

    /**
     * Datos simulados para desarrollo de UI.
     * Luego deberán integrarse con los módulos reales
     * de productos y servicios.
     */
    productos: [{ id: 1, titulo: 'Producto Ejemplo', categoria: 'Categoría Ejemplo' }],

    servicios: [{ id: 1, titulo: 'Consultoría Profesional', categoria: 'Profesional' }],

    /**
     * Los clientes incluyen un campo "inactivo"
     * utilizado por el panel de gestión para realizar
     * una inactivación lógica en lugar de eliminación física.
     */
    clientes: [{ id: 1, cooperativa: 'Cooperativa Ejemplo', cuenta: '12345', inactivo: false }],

    documentos: [{ id: 1, nombre: 'manual_gestion.pdf', tipo: 'Manual' }],
  };

  /**
   * Devuelve todos los registros de una entidad.
   *
   * Utilizado principalmente por el componente
   * de gestión para poblar las tablas del panel admin.
   *
   * En backend real:
   * será reemplazado por una llamada GET.
   */
  getAll(tipo: string) {
    return this.data[tipo] ?? [];
  }

  /**
   * Obtiene un registro específico por ID.
   *
   * Utilizado por el componente ABM
   * para cargar datos en modo edición.
   *
   * En backend real:
   * se reemplazará por GET /{id}.
   */
  getById(tipo: string, id: number) {
    return this.data[tipo]?.find((item: any) => item.id === id);
  }

  /**
   * Crea un nuevo registro en memoria.
   *
   * Se genera un ID temporal utilizando Date.now()
   * para simular una clave primaria.
   *
   * En backend real:
   * esta operación será un POST a la API.
   */
  create(tipo: string, newData: any) {
    const newId = Date.now();
    this.data[tipo].push({ id: newId, ...newData });
  }

  /**
   * Actualiza parcialmente un registro existente.
   *
   * Se utiliza spread operator para mantener
   * propiedades existentes y aplicar solo cambios.
   *
   * En backend real:
   * se implementará mediante PUT o PATCH.
   */
  update(tipo: string, id: number, updatedData: any) {
    const index = this.data[tipo].findIndex((i: any) => i.id === id);

    if (index !== -1) {
      this.data[tipo][index] = {
        ...this.data[tipo][index],
        ...updatedData,
      };
    }
  }

  /**
   * Elimina un registro del dataset.
   *
   * Se utiliza filter para generar una nueva colección
   * sin el elemento eliminado.
   *
   * En backend real:
   * esta operación corresponderá a DELETE /{id}.
   */
  delete(tipo: string, id: number) {
    this.data[tipo] = this.data[tipo].filter((i: any) => i.id !== id);
  }
}
