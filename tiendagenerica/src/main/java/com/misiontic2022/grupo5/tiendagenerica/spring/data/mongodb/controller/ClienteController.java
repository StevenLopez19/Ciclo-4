package com.misiontic2022.grupo5.tiendagenerica.spring.data.mongodb.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.misiontic2022.grupo5.tiendagenerica.spring.data.mongodb.model.Cliente;
import com.misiontic2022.grupo5.tiendagenerica.spring.data.mongodb.repository.ClienteRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")

public class ClienteController {

	@Autowired
	ClienteRepository clienteRepository;

	@GetMapping("/clientes")
	public ResponseEntity<List<Cliente>> getAllClientes(@RequestParam(required = false) String nombrecliente) {
		try {
			List<Cliente> clientes = new ArrayList<Cliente>();

			if (nombrecliente == null) {
				clienteRepository.findAll().forEach(clientes::add);
			} else {
				clienteRepository.findByNombrecliente(nombrecliente).forEach(clientes::add);
			}

			if (clientes.isEmpty()) {
				// error 204
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			// error 201
			return new ResponseEntity<>(clientes, HttpStatus.OK);
		} catch (Exception e) {
			// error 500
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/getcedulaclientes/{cedulacliente}")
	public ResponseEntity<List<Cliente>> getClientesByCedula(@PathVariable("cedulacliente") Integer cedulacliente) {

		try {
			System.out.println(cedulacliente);
			List<Cliente> clientes = clienteRepository.findByCedulacliente(cedulacliente);

			if (clientes.isEmpty()) {
				// no encontre info
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			// encontre info
			return new ResponseEntity<>(clientes, HttpStatus.OK);
		} catch (Exception e) {
			// error algo paso
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/clientes")
	public ResponseEntity<Cliente> createClientes(@RequestBody Cliente clie) {
		try {
			Cliente _cliente = clienteRepository.save(new Cliente(clie.getCedulacliente(), clie.getNombrecliente(),
					clie.getDireccioncliente(), clie.getTelefonocliente(), clie.getEmailcliente()));
			// si lo cree guardo en 200
			return new ResponseEntity<>(_cliente, HttpStatus.CREATED);
		} catch (Exception e) {
			// sino lo pude crear error 500
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/clientes/{id}")
	public ResponseEntity<Cliente> updateClientes(@PathVariable("id") String id, @RequestBody Cliente clie) {
		Optional<Cliente> clienteData = clienteRepository.findById(id);

		if (clienteData.isPresent()) {
			Cliente _cliente = clienteData.get();
			_cliente.setCedulacliente(clie.getCedulacliente());
			_cliente.setNombrecliente(clie.getNombrecliente());
			_cliente.setDireccioncliente(clie.getDireccioncliente());
			_cliente.setTelefonocliente(clie.getTelefonocliente());
			_cliente.setEmailcliente(clie.getEmailcliente());
			
			return new ResponseEntity<>(clienteRepository.save(_cliente), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<HttpStatus> deleteClientes(@PathVariable("id") String id) {
		try {
			clienteRepository.deleteById(id);
			// si lo borre, retorno 200
			System.out.println(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			// sino lo borre, retorno 500
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/clientes")
	public ResponseEntity<HttpStatus> deleteAllClientes() {
		try {
			clienteRepository.deleteAll();
			// si los borre todos 201
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			// sino los borre todos 500
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getnombreclientes/{nombrecliente}")
	public ResponseEntity<List<Cliente>> findByNombrecliente(@PathVariable("nombrecliente") String nombrecliente) {
		try {
			System.out.println(nombrecliente);
			List<Cliente> clientes = clienteRepository.findByNombrecliente(nombrecliente);

			if (clientes.isEmpty()) {
				// no encontre info
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			// encontre info
			return new ResponseEntity<>(clientes, HttpStatus.OK);
		} catch (Exception e) {
			// error algo paso
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
