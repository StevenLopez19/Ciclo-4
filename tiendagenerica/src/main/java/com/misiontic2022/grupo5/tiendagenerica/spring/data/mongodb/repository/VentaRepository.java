package com.misiontic2022.grupo5.tiendagenerica.spring.data.mongodb.repository;



import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.misiontic2022.grupo5.tiendagenerica.spring.data.mongodb.model.Venta;



public interface VentaRepository extends MongoRepository<Venta, String> {

	List<Venta> findByCodigoventa(Long codigoventa);
	List<Venta> findByCedulacliente(Long cedulacliente);
	
	
	void deleteByCodigoventa(Long codigoventa);
	void deleteByCedulacliente(Long cedulacliente);
	
}