import { useState } from "react"

export default function Guitar({guitar, addToCarrito}) {


    const { id, name, image , description, price } = guitar
    // const handleClick = (guitar) => {
    //     setCarrito([...carrito, guitar])
    // } primera opcion para agregar al carrito, se crea una nueva copia del carrito y se le agrega la nueva guitarra no tan usada
    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3">${price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={() => addToCarrito(guitar)} // handleClick(guitar)} primera formar con handleClick, si queremos pasarle un parametro a la funcion que se ejecuta en el onClick tenemos que envolverla en una funcion
                    >Agregar al Carrito</button>
                </div>
            </div>
    )



}
