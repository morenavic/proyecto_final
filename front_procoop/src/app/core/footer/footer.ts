import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  /*
    Año actual expuesto al template.
    Se calcula automáticamente para evitar hardcodeo
    y se marca como readonly porque no cambia durante la ejecución.
  */
  readonly anioActual = new Date().getFullYear();
}
