package com.misiontic2022.grupo5.tiendagenerica.spring.data.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clientes")
public class Cliente {

	@Id
	private String id;
	private Integer cedulacliente;
	private String nombrecliente;
	private String direccioncliente;
	private String telefonocliente;
	private String emailcliente;

	public Integer getCedulacliente() {
		return cedulacliente;
	}

	public void setCedulacliente(Integer cedulacliente) {
		this.cedulacliente = cedulacliente;
	}

	public String getDireccioncliente() {
		return direccioncliente;
	}

	public void setDireccioncliente(String direccioncliente) {
		this.direccioncliente = direccioncliente;
	}

	public String getEmailcliente() {
		return emailcliente;
	}

	public void setEmailcliente(String emailcliente) {
		this.emailcliente = emailcliente;
	}

	public String getNombrecliente() {
		return nombrecliente;
	}

	public void setNombrecliente(String nombrecliente) {
		this.nombrecliente = nombrecliente;
	}

	public String getTelefonocliente() {
		return telefonocliente;
	}

	public void setTelefonocliente(String telefonocliente) {
		this.telefonocliente = telefonocliente;
	}

	public Cliente(Integer cedulacliente, String nombrecliente, String direccioncliente, String telefonocliente,
			String emailcliente) {
		super();
		this.cedulacliente = cedulacliente;
		this.nombrecliente = nombrecliente;
		this.direccioncliente = direccioncliente;
		this.telefonocliente = telefonocliente;
		this.emailcliente = emailcliente;
		
		
	}

}
