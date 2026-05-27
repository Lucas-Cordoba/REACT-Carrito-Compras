import { useMemo } from 'react' //El hook useMemo de React te permite almacenar en caché el resultado de un cálculo complejo entre cada renderizado


//antes del componente van las librerias
export default function Header({ cart , removeFromCarrito, increaseQuantity, decreaseQuantity, clearCarrito }) {

    //State Derivado es un estado que se calcula a partir de otro estado, no se modifica directamente, se calcula a partir de otro estado
    const isEmpty = useMemo( () => cart.length === 0, [cart]) //Solo se ejecuta cuando el carrito cambia de valor
    //se declara una variable que es una funcion que devuelve un booleano, si el carrito esta vacio devuelve true y si no devuelve false, se puede usar para mostrar un mensaje o una tabla dependiendo de si el carrito esta vacio o no 
    //Este codigo no se ejecuta hasta que no cambien ciertas partes en el codigo, el useMemo dice que no cambie algo en la app hasta que no cambie algo que yo te voy a decir que es
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]); //se declara una variable que es una funcion que devuelve el total del carrito, se utiliza el metodo reduce para sumar el precio de cada guitarra multiplicado por su cantidad, el segundo parametro del reduce es el valor inicial del total que es 0
    return (
        //Fragment <Fragment> </Fragment>sirve para retornar varios elementos osea se retorna el Fragment como si fuera un solo elemento se importa asi import { Fragment } from "react"; y no haces muchos div de forma innnecesaria o se puede usar esto <> </>
        //antes del return van las variables, state o funciones
        //dentro del return van las vistas o el HTML
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {/* No puedo tener if pero si un ternario en los templates( (o plantilla) es un modelo o esquema prediseñado que sirve como base para crear algo nuevo) de React */}
                                {isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(guitar => ( //Con esto itero en cada elemento del carrito y lo muestro en la tabla, cada vez que se agregue algo al carrito
                                                    <tr key={guitar.id}>
                                                         {/*Es para que React pueda identificar cada elemento unico de la lista */}
                                                        <td>
                                                            <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                        </td>
                                                        <td>{guitar.name}</td>
                                                        <td className="fw-bold">
                                                            ${guitar.price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(guitar.id)}
                                                            >
                                                                -
                                                            </button>
                                                            {guitar.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(guitar.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCarrito(guitar.id)} //Cuando se hace click en el boton se ejecuta la funcion removeFromCarrito que se le paso como prop al componente Header, se le pasa el id de la guitarra 
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal.toFixed(2)}</span></p> {/*toFixed es para mostrar solo dos decimales en el total*/}
                                    </> //pongo un fragment para poder retornar varios elementos sin necesidad de envolverlos en un div, se importa asi import { Fragment } from "react"; y no haces muchos div de forma innnecesaria o se puede usar esto <> </>
                                )}
                                <button 
                                className="btn btn-dark w-100 mt-3 p-2"
                                onClick={clearCarrito}
                                >Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
