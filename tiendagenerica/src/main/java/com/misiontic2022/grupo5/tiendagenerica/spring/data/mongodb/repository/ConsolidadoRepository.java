package com.misiontic2022.grupo5.tiendagenerica.spring.data.mongodb.repository;



import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.misiontic2022.grupo5.tiendagenerica.spring.data.mongodb.model.Consolidado;



public interface ConsolidadoRepository  extends MongoRepository<Consolidado, String>{
	
	List<Consolidado> findByCiudad(String ciudad);
}
