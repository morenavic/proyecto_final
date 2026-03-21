import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/*
  Modelo de documento utilizado en frontend.

  ⚠️ Futuro backend:
  - agregar id único
  - posiblemente incluir URL de descarga
*/
interface Documento {
  nombre: string;
  tipo: 'manual' | 'guia';
  descripcion: string;
}

/*
  Componente encargado de la visualización de documentos del cliente.

  Responsabilidades:
  - Manejar búsqueda y filtrado en frontend
  - Controlar paginación simple ("ver más")
  - Exponer listas derivadas para el template
*/
@Component({
  selector: 'app-panel-cliente-documentos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './panel-cliente-documentos.html',
  styleUrl: './panel-cliente-documentos.scss',
})
export class PanelClienteDocumentos {
  /*
    Estado de búsqueda y filtro.

    Decisión:
    - manejo completamente en frontend
    - sin llamadas a servicios por ahora
  */
  busqueda: string = '';
  filtro: 'todos' | 'manual' | 'guia' = 'todos';

  /*
    Límite de documentos visibles.

    Se usa para implementar paginación simple con "Ver más".
  */
  limite = 3;

  /*
    Lista mock de documentos.

    ⚠️ Futuro backend:
    - reemplazar por datos desde API
    - eliminar datos hardcodeados
  */
  documentos: Documento[] = [
    { nombre: 'Manual Gestión', tipo: 'manual', descripcion: 'Guía completa del sistema' },
    { nombre: 'Guía P-Móvil', tipo: 'guia', descripcion: 'Uso de la app móvil' },
    { nombre: 'Manual 3S', tipo: 'manual', descripcion: 'Instalación del sistema' },
    { nombre: 'Guía rápida', tipo: 'guia', descripcion: 'Primeros pasos' },
    { nombre: 'Manual avanzado', tipo: 'manual', descripcion: 'Configuraciones avanzadas' },
    { nombre: 'Guía seguridad', tipo: 'guia', descripcion: 'Buenas prácticas' },
  ];

  /*
    Cambia el filtro activo.

    Decisión:
    - se resetea el límite para mantener coherencia en UX
  */
  setFiltro(tipo: 'todos' | 'manual' | 'guia') {
    this.filtro = tipo;
    this.limite = 3;
  }

  /*
    Aplica filtros:
    - búsqueda por nombre
    - filtro por tipo

    Se usa como getter para mantener el template limpio.
  */
  get documentosFiltrados(): Documento[] {
    return this.documentos.filter((doc) => {
      const coincideBusqueda = doc.nombre.toLowerCase().includes(this.busqueda.toLowerCase());

      const coincideFiltro = this.filtro === 'todos' || doc.tipo === this.filtro;

      return coincideBusqueda && coincideFiltro;
    });
  }

  /*
    Lista final que se renderiza en pantalla.

    Decisión:
    - aplicar slice para paginación simple
  */
  get documentosVisibles(): Documento[] {
    return this.documentosFiltrados.slice(0, this.limite);
  }

  /*
    Indica si hay más documentos para mostrar.

    Se usa para controlar el botón "Ver más".
  */
  get hayMasDocumentos(): boolean {
    return this.documentosFiltrados.length > this.limite;
  }

  /*
    Incrementa la cantidad de documentos visibles.

    Decisión:
    - incremento fijo (UX simple)

    ⚠️ Futuro backend:
    - reemplazar por paginación real (page / size)
  */
  verMas() {
    this.limite += 3;
  }
}
