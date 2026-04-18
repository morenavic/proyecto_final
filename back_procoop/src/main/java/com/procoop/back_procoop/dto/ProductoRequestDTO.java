package com.procoop.back_procoop.dto;

import org.springframework.web.multipart.MultipartFile;

/**
 * DTO para recibir datos del frontend al crear un producto
 */
public class ProductoRequestDTO {

    private String titulo;
    private String subtitulo;
    private String descripcion;
    private String infoExtra;

    // imagen enviada desde el frontend
    private MultipartFile imagen;

    // getters y setters

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getSubtitulo() { return subtitulo; }
    public void setSubtitulo(String subtitulo) { this.subtitulo = subtitulo; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getInfoExtra() { return infoExtra; }
    public void setInfoExtra(String infoExtra) { this.infoExtra = infoExtra; }

    public MultipartFile getImagen() { return imagen; }
    public void setImagen(MultipartFile imagen) { this.imagen = imagen; }
}