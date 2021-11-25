package com.misiontic2022.grupo5.tiendagenerica.spring.data.mongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.misiontic2022.grupo5.tiendagenerica.spring.data.mongodb.model.Cliente;

import java.util.List;


public interface ClienteRepository extends MongoRepository<Cliente, String> {

     List<Cliente> findByNombrecliente(String nombrecliente);
     List<Cliente> findByCedulacliente(Integer cedulacliente);

}