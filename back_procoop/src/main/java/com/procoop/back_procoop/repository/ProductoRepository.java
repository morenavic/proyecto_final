package com.procoop.back_procoop.repository;

import com.procoop.back_procoop.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio de Producto
 *
 * Se encarga del acceso a la base de datos para la entidad Producto.
 * Spring genera automáticamente las consultas básicas.
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

}