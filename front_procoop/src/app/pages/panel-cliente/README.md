# PanelCliente (Módulo Cliente)

## Propósito del módulo

El módulo **Panel Cliente** centraliza todas las funcionalidades disponibles para usuarios autenticados con rol cliente.

Su objetivo es ofrecer una interfaz clara y organizada donde el usuario pueda:

- Consultar información relevante (noticias y eventos)
- Gestionar su cuenta (perfil y contraseña)
- Acceder a documentación disponible

Funciona como el área privada del sistema.

---

## Componentes incluidos

- `PanelClienteHome`
- `PanelClienteCambiarContrasenia`
- `PanelClientePerfil`
- `PanelClienteDocumentos`

---

## Responsabilidades principales

- Agrupar funcionalidades del usuario autenticado
- Mantener consistencia visual y estructural entre pantallas
- Gestionar estados de UI simples (toggle, filtros, formularios)
- Separar claramente cada responsabilidad en subcomponentes

---

## Flujo de funcionamiento

1. El usuario accede al sistema mediante login.
2. Si posee rol **cliente**, accede al panel cliente.
3. Desde el panel puede navegar a:

   ### Home
   - Visualiza noticias y eventos
   - Puede expandir contenido con “ver más / ver menos”

   ### Mi perfil
   - Consulta información personal
   - Accede a cambio de contraseña

   ### Cambiar contraseña
   - Completa formulario con validaciones
   - Se ejecuta lógica en `AuthService`
   - Redirección al home tras guardar

   ### Documentos
   - Visualiza listado de documentos
   - Filtra por tipo (manual / guía)
   - Busca por nombre
   - Expande listado con “ver más”

---

## Dependencias importantes

- `AuthService`
  - Manejo de sesión y cambio de contraseña

- `Router`
  - Navegación entre pantallas del panel

- `ReactiveFormsModule`
  - Formularios en cambio de contraseña

- `FormsModule`
  - Búsqueda en documentos

---

## Decisiones técnicas relevantes

- **Componentes standalone**
  - Simplifica estructura y evita módulos innecesarios

- **Estado manejado localmente**
  - Uso de variables simples (`boolean`, `string`, `number`)
  - Evita complejidad prematura

- **UX basada en simplicidad**
  - Uso de toggles en lugar de paginación compleja
  - Filtros directos en frontend

- **Uso de getters**
  - Mantiene templates limpios
  - Centraliza lógica de filtrado y visualización

- **Separación por responsabilidad**
  - Cada pantalla tiene un propósito claro
  - Evita componentes monolíticos

- **Diseño consistente**
  - Cards, grids y layouts reutilizables
  - Identidad visual uniforme en todo el panel

---

## Consideraciones futuras (backend)

- Reemplazar datos mock por datos provenientes de API
- Centralizar lógica en servicios:
  - `UsuarioService`
  - `NoticiasService`
  - `DocumentosService`
- Implementar manejo de estados:
  - loading
  - error
  - empty state
- Incorporar paginación real en:
  - noticias
  - documentos
- Validaciones robustas en backend (especialmente contraseña)
- Manejo de archivos reales en documentos (URLs de descarga)
- Posible uso de guards por rol y autenticación
- Integración con autenticación basada en tokens (JWT)

---

## Notas adicionales

El módulo está diseñado para ser **escalable**, permitiendo:

- Agregar nuevas secciones sin afectar las existentes
- Migrar fácilmente a backend real sin refactor estructural
- Mantener una experiencia de usuario simple y consistente
