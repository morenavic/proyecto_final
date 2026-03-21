import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Documento {
  nombre: string;
  tipo: 'manual' | 'guia';
  descripcion: string;
}

@Component({
  selector: 'app-panel-cliente-documentos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './panel-cliente-documentos.html',
  styleUrl: './panel-cliente-documentos.scss',
})
export class PanelClienteDocumentos {
  busqueda: string = '';
  filtro: 'todos' | 'manual' | 'guia' = 'todos';

  limite = 3;

  documentos: Documento[] = [
    { nombre: 'Manual Gestión', tipo: 'manual', descripcion: 'Guía completa del sistema' },
    { nombre: 'Guía P-Móvil', tipo: 'guia', descripcion: 'Uso de la app móvil' },
    { nombre: 'Manual 3S', tipo: 'manual', descripcion: 'Instalación del sistema' },
    { nombre: 'Guía rápida', tipo: 'guia', descripcion: 'Primeros pasos' },
    { nombre: 'Manual avanzado', tipo: 'manual', descripcion: 'Configuraciones avanzadas' },
    { nombre: 'Guía seguridad', tipo: 'guia', descripcion: 'Buenas prácticas' },
  ];

  setFiltro(tipo: 'todos' | 'manual' | 'guia') {
    this.filtro = tipo;
    this.limite = 3; // reset
  }

  get documentosFiltrados(): Documento[] {
    return this.documentos.filter((doc) => {
      const coincideBusqueda = doc.nombre.toLowerCase().includes(this.busqueda.toLowerCase());

      const coincideFiltro = this.filtro === 'todos' || doc.tipo === this.filtro;

      return coincideBusqueda && coincideFiltro;
    });
  }

  get documentosVisibles(): Documento[] {
    return this.documentosFiltrados.slice(0, this.limite);
  }

  get hayMasDocumentos(): boolean {
    return this.documentosFiltrados.length > this.limite;
  }

  verMas() {
    this.limite += 3;
  }
}
