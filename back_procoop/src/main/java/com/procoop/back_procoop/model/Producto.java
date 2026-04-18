package com.procoop.back_procoop.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Clase Producto
 * Representa un producto/servicio que se muestra en el frontend.
 * Se utiliza en el panel de administración para gestionar contenido.
 */
@Entity
@Table(name = "productos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Producto {

    /**
     * ID único del producto
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Slug del producto (identificador para URLs)
     * Ej: "3s"
     */
    private String slug;

    /**
     * Título principal (lo que ve el usuario)
     */
    private String titulo;

    /**
     * Subtítulo del producto
     */
    private String subtitulo;

    /**
     * Descripción principal
     */
    @Column(columnDefinition = "TEXT")
    private String descripcion;

    /**
     * Información adicional
     */
    @Column(columnDefinition = "TEXT")
    private String infoExtra;

    /**
     * Ruta de la imagen
     */
    private String imagen;

    public void setTitulo(String titulo) {
    }

    public void setSubtitulo(String subtitulo) {
    }

    public void setDescripcion(String descripcion) {
    }

    public void setInfoExtra(String infoExtra) {
    }

    public void setSlug(String slug) {
    }

    public void setImagen(String s) {
    }
}