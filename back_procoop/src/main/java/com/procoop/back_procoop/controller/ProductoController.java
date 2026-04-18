package com.procoop.back_procoop.controller;

import com.procoop.back_procoop.dto.ProductoRequestDTO;
import com.procoop.back_procoop.model.Producto;
import com.procoop.back_procoop.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Controlador de productos
 */
@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    /**
     * Endpoint para crear producto
     */
    @PostMapping(consumes = "multipart/form-data")
    public Producto crearProducto(
            @RequestParam("titulo") String titulo,
            @RequestParam("subtitulo") String subtitulo,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("infoExtra") String infoExtra,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen
    ) throws IOException {

        return productoService.guardarProducto(
                titulo,
                subtitulo,
                descripcion,
                infoExtra,
                imagen
        );
    }
}