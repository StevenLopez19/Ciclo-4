package com.misiontic2022.grupo5.tiendagenerica.spring.data.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "productos")
public class Producto {

	@Id
	private String id;

	private Long codigoproducto;
	private String nombreproducto;
	private Long nitproveedor;
	private Double preciocompra;
	private Double ivacompra;
	private Double precioventa;

	public Producto() {

	}

	public Producto(Long codigoproducto, String nombreproducto, Long nitproveedor, Double preciocompra,
			Double ivacompra, Double precioventa) {
		super();
		this.codigoproducto = codigoproducto;
		this.nombreproducto = nombreproducto;
		this.nitproveedor = nitproveedor;
		this.preciocompra = preciocompra;
		this.ivacompra = ivacompra;
		this.precioventa = precioventa;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Long getCodigoproducto() {
		return codigoproducto;
	}

	public void setCodigoproducto(Long codigoproducto) {
		this.codigoproducto = codigoproducto;
	}

	public Double getIvacompra() {
		return ivacompra;
	}

	public void setIvacompra(Double ivacompra) {
		this.ivacompra = ivacompra;
	}

	public Long getNitproveedor() {
		return nitproveedor;
	}

	public void setNitproveedor(Long nitproveedor) {
		this.nitproveedor = nitproveedor;
	}

	public String getNombreproducto() {
		return nombreproducto;
	}

	public void setNombreproducto(String nombreproducto) {
		this.nombreproducto = nombreproducto;
	}

	public Double getPreciocompra() {
		return preciocompra;
	}

	public void setPreciocompra(Double preciocompra) {
		this.preciocompra = preciocompra;
	}

	public Double getPrecioventa() {
		return precioventa;
	}

	public void setPrecioventa(Double precioventa) {
		this.precioventa = precioventa;
	}

}
