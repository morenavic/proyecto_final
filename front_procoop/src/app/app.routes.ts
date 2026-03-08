import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Empresa } from './pages/empresa/empresa';
import { ProductosListado } from './pages/productos/productos-listado/productos-listado';
import { ProductosDetalle } from './pages/productos/productos-detalle/productos-detalle';
import { Servicios } from './pages/servicios/servicios';
import { Contacto } from './pages/contacto/contacto';
import { Acceso } from './pages/acceso/acceso';
import { RecuperarContrasenia } from './pages/recuperar-contrasenia/recuperar-contrasenia';
import { ActivarCuenta } from './pages/activar-cuenta/activar-cuenta';
import { PanelClienteHome } from './pages/panel-cliente/panel-cliente-home/panel-cliente-home';
import { PanelClienteNoticias } from './pages/panel-cliente/panel-cliente-noticias/panel-cliente-noticias';
import { PanelClienteCambiarContrasenia } from './pages/panel-cliente/panel-cliente-cambiar-contrasenia/panel-cliente-cambiar-contrasenia';
import { PanelClienteMiPerfil } from './pages/panel-cliente/panel-cliente-mi-perfil/panel-cliente-mi-perfil';
import { PanelClienteDocumentos } from './pages/panel-cliente/panel-cliente-documentos/panel-cliente-documentos';
import { PanelAdminHome } from './pages/panel-admin/panel-admin-home/panel-admin-home';
import { authGuard } from './guards/auth.guard';
import { rolGuard } from './guards/rol.guard';
import { PanelAdminGestion } from './pages/panel-admin/panel-admin-gestion/panel-admin-gestion';
import { PanelAdminAbm } from './pages/panel-admin/panel-admin-abm/panel-admin-abm';

/*
  Definición centralizada de las rutas de la aplicación.

  La estructura separa claramente:
  - rutas públicas
  - rutas de panel cliente
  - rutas de panel administrador

  El acceso a paneles está protegido mediante guards
  de autenticación y autorización por rol.
*/
export const routes: Routes = [
  /* ============================
     Rutas públicas
     ============================ */
  { path: '', component: Inicio },
  { path: 'empresa', component: Empresa },
  { path: 'productos-listado', component: ProductosListado },

  /*
    Ruta dinámica para el detalle de un producto.
    Se accede mediante el ID del producto seleccionado.
  */
  { path: 'productos/:id', component: ProductosDetalle },

  { path: 'servicios', component: Servicios },
  { path: 'contacto', component: Contacto },
  { path: 'acceso', component: Acceso },
  { path: 'recuperar-contrasenia', component: RecuperarContrasenia },
  { path: 'activar-cuenta', component: ActivarCuenta },

  /* ============================
     PANEL CLIENTE
     ============================ */
  /*
    Todas las rutas del panel cliente:
    - requieren sesión activa
    - requieren rol 'cliente'
  */
  {
    path: 'panel-cliente-home',
    component: PanelClienteHome,
    canActivate: [authGuard, rolGuard],
    data: { rol: 'cliente' },
  },
  {
    path: 'panel-cliente-noticias',
    component: PanelClienteNoticias,
    canActivate: [authGuard, rolGuard],
    data: { rol: 'cliente' },
  },
  {
    path: 'panel-cliente-cambiar-contrasenia',
    component: PanelClienteCambiarContrasenia,
    canActivate: [authGuard, rolGuard],
    data: { rol: 'cliente' },
  },
  {
    path: 'panel-cliente-mi-perfil',
    component: PanelClienteMiPerfil,
    canActivate: [authGuard, rolGuard],
    data: { rol: 'cliente' },
  },
  {
    path: 'panel-cliente-documentos',
    component: PanelClienteDocumentos,
    canActivate: [authGuard, rolGuard],
    data: { rol: 'cliente' },
  },

  /* ============================
   PANEL ADMINISTRADOR
   ============================ */

  {
    path: 'panel-admin-home',
    component: PanelAdminHome,
    canActivate: [authGuard, rolGuard],
    data: { rol: 'admin' },
  },

  /* ============================
   GESTIÓN (GENÉRICA)
   ============================ */

  {
    path: 'panel-admin-gestion/:tipo',
    component: PanelAdminGestion,
    canActivate: [authGuard, rolGuard],
    data: { rol: 'admin' },
  },

  /* ============================
   ABM (GENÉRICO)
   ============================ */

  {
    path: 'panel-admin-abm/:tipo',
    component: PanelAdminAbm,
    canActivate: [authGuard, rolGuard],
    data: { rol: 'admin' },
  },

  {
    path: 'panel-admin-abm/:tipo/:id',
    component: PanelAdminAbm,
    canActivate: [authGuard, rolGuard],
    data: { rol: 'admin' },
  },
  /*
    Cualquier ruta no definida redirige al inicio.
    Evita pantallas en blanco o errores de navegación.
  */
  { path: '**', redirectTo: '' },
];

/*
  Configuración adicional del router.
  Mejora la experiencia de navegación restaurando
  la posición del scroll al cambiar de ruta.
*/
export const routeConfig = {
  scrollPositionRestoration: 'top',
};
