package com.procoop.back_procoop.service;

import com.procoop.back_procoop.dto.ProductoRequestDTO;
import com.procoop.back_procoop.model.Producto;
import com.procoop.back_procoop.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**
 * Lógica de negocio para productos
 */
@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    /**
     * Guarda un producto con imagen
     */
    public Producto guardarProducto(ProductoRequestDTO dto) throws IOException {

        Producto producto = new Producto();

        producto.setTitulo(dto.getTitulo());
        producto.setSubtitulo(dto.getSubtitulo());
        producto.setDescripcion(dto.getDescripcion());
        producto.setInfoExtra(dto.getInfoExtra());

        //generar slug automático
        String slug = generarSlug(dto.getTitulo());
        producto.setSlug(slug);

        //guardar imagen
        if (dto.getImagen() != null && !dto.getImagen().isEmpty()) {

            // ruta absoluta del proyecto
            String uploadDir = System.getProperty("user.dir") + "/uploads/";

            // crear carpeta si no existe
            File carpeta = new File(uploadDir);
            if (!carpeta.exists()) {
                carpeta.mkdirs();
            }

            // nombre único del archivo
            String nombreArchivo = UUID.randomUUID() + "_" + dto.getImagen().getOriginalFilename();

            // archivo destino
            File destino = new File(uploadDir + nombreArchivo);

            // guardar archivo
            dto.getImagen().transferTo(destino);

            // guardar ruta en la base
            producto.setImagen("uploads/" + nombreArchivo);
        }

        return productoRepository.save(producto);
    }

    /**
     * Genera slug a partir del título
     */
    private String generarSlug(String titulo) {
        return titulo.toLowerCase()
                .replaceAll(" ", "-")
                .replaceAll("[^a-z0-9-]", "");
    }

    public Producto guardarProducto(
            String titulo,
            String subtitulo,
            String descripcion,
            String infoExtra,
            MultipartFile imagen
    ) throws IOException {

        Producto producto = new Producto();

        producto.setTitulo(titulo);
        producto.setSubtitulo(subtitulo);
        producto.setDescripcion(descripcion);
        producto.setInfoExtra(infoExtra);

        // slug automático
        String slug = generarSlug(titulo);
        producto.setSlug(slug);

        // guardar imagen
        if (imagen != null && !imagen.isEmpty()) {

            String uploadDir = System.getProperty("user.dir") + "/uploads/";

            File carpeta = new File(uploadDir);
            if (!carpeta.exists()) {
                carpeta.mkdirs();
            }

            String nombreArchivo = UUID.randomUUID() + "_" + imagen.getOriginalFilename();

            File destino = new File(uploadDir + nombreArchivo);

            imagen.transferTo(destino);

            producto.setImagen("uploads/" + nombreArchivo);
        }

        return productoRepository.save(producto);
    }
}