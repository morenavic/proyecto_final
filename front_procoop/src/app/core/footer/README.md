# FooterComponent

## Propósito del componente

El componente `Footer` representa el pie de página global de la aplicación.  
Su función es mostrar información institucional de la empresa y accesos a redes sociales, manteniéndose visible de forma fija en toda la navegación.

Es un componente **puramente presentacional**, sin lógica de negocio ni interacción compleja.

---

## Responsabilidades principales

- Mostrar el nombre institucional de la empresa.
- Renderizar el año actual de forma dinámica.
- Proveer enlaces externos a redes sociales oficiales.
- Mantener una estructura simple y reutilizable a nivel global.

---

## Flujo de funcionamiento

- Al instanciarse el componente, se calcula el año actual una única vez.
- El template consume ese valor para mostrarlo en el texto institucional.
- Los enlaces a redes sociales se renderizan como links externos y se abren en una nueva pestaña.
- El componente no responde a eventos ni modifica estado durante su ciclo de vida.

---

## Inputs / Outputs

Este componente **no define inputs ni outputs**.

Toda la información que muestra es estática o calculada internamente.

---

## Dependencias importantes

- Bootstrap Icons (para los íconos de redes sociales).
- Los estilos del footer están encapsulados en su archivo SCSS para mantener aislamiento visual.

No depende de servicios, rutas ni otros componentes.

---

## Decisiones técnicas relevantes

- El año se calcula dinámicamente para evitar hardcodeo y mantenimiento manual.
- El valor del año se define como `readonly` al no cambiar durante la ejecución.
- Los enlaces externos incluyen `noopener` y `noreferrer` como medida básica de seguridad.
- No se implementan tests unitarios debido a la ausencia de lógica de negocio o comportamiento dinámico.

---

## Consideraciones adicionales

- El componente está pensado para ser global y reutilizable.
- No contiene lógica condicional ni dependencias externas complejas.
- Cualquier cambio funcional (por ejemplo, redes dinámicas o tracking) debería evaluarse antes de agregar lógica adicional o tests.
