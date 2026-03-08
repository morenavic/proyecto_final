# Panel Admin

## Propósito del componente

El **Panel Admin** permite gestionar el contenido administrativo del sistema.  
Incluye funcionalidades para **visualizar, crear, editar y eliminar registros** de distintas entidades desde una interfaz unificada.

Las entidades gestionadas actualmente son:

- Novedades
- Productos
- Servicios
- Clientes
- Documentos

El módulo está compuesto por:

- `PanelAdminHome`
- `PanelAdminGestion`
- `PanelAdminAbm`
- `PanelAdminDataService`

---

# Responsabilidades principales

El panel administra el ciclo completo de gestión de registros:

- Mostrar listados de cada entidad
- Permitir crear nuevos registros
- Editar registros existentes
- Eliminar o inactivar registros
- Centralizar el acceso a datos mediante un servicio

---

# Flujo de funcionamiento

1. **PanelAdminHome**  
   Actúa como punto de entrada al panel administrativo y permite navegar a las distintas gestiones.

2. **PanelAdminGestion**  
   Muestra los registros de una entidad en una tabla.  
   El tipo de entidad se obtiene desde la ruta (`tipo`).  
   Desde esta pantalla se pueden ejecutar acciones como editar, eliminar o descargar.

3. **PanelAdminAbm**  
   Gestiona el alta y modificación de registros.  
   El formulario se construye dinámicamente según la configuración de la entidad.

4. **PanelAdminDataService**  
   Centraliza las operaciones de datos utilizadas por los componentes del panel.

---

# Inputs / Outputs

Los componentes no utilizan `@Input` ni `@Output`.  
El comportamiento se controla mediante **parámetros de ruta** (`tipo` e `id`).

---

# Dependencias importantes

- `PanelAdminDataService` para operaciones CRUD
- Router para navegación entre pantallas del panel

---

# Decisiones técnicas relevantes

- Los componentes son **genéricos y reutilizables**.
- La estructura de tablas y formularios se define mediante **configuración**.
- Esto permite administrar múltiples entidades sin duplicar componentes.

---

# Consideraciones para backend futuro

Actualmente los datos se manejan en memoria dentro de `PanelAdminDataService`.

Cuando se implemente el backend:

- Las operaciones CRUD se reemplazarán por llamadas HTTP.
- El envío de documentos deberá utilizar **FormData**.
- Los componentes no requieren cambios estructurales, ya que la persistencia está desacoplada en el servicio.
