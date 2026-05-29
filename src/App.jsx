import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import{ db } from "./data/db.js"



function App() {

const initialCarrrito = () => {
    const localStorageCarrito = localStorage.getItem('carrito') //obtiene el carrito del localStorage, si no existe devuelve null
    return localStorageCarrito ? JSON.parse(localStorageCarrito) : [] //si el carrito existe lo parsea y lo devuelve, si no existe devuelve un array vacio
}
const [data] = useState(db)
const [carrito, setCarrito] = useState(initialCarrrito)
//State de React es Asincrono(No se actualiza inmediatamente sino hasta unos milisegundos despues) es que otras funciones se mandan a llamar como la de localStorage aun cuando el state no se ha modificado
//si fuera sincrono el carrito se modificaria y luego se llamaria a la funcion de localStorage, es cuando simultáneamente o a una velocidad constante vinculada a una frecuencia específica
const MAX_ITEMS = 10
const MIN_ITEMS = 1

useEffect(() => { //es para tener sincronizado nuestro carrito con el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito)) //guarda el carrito en el localStorage
}, [carrito]) //cada vez que el carrito cambie se ejecuta el useEffect, se puede usar para guardar el carrito en el localStorage cada vez que cambie el carrito, o para hacer una peticion a una API cada vez que cambie el carrito, etc.

function addToCarrito(item){

    const itemExists = carrito.findIndex((guitar) => guitar.id === item.id) //pregunta si el item que quiero agregar ya existe en el carrito, si existe no lo agrego y si no existe lo agrego
    //console.log(itemExists) //-1 si no existe, 0 o mayor si existe, en este caso con el setCarrito te devuelve el indice y no el id
    if(itemExists >= 0) { //existe en el carrito+
       if(carrito[itemExists].quantity >= MAX_ITEMS) return //si la cantidad del item es mayor o igual a 10 no hace nada, no se puede agregar mas de 10 items al carrito
        const updatedCarrito = [...carrito] //creo una copia del carrito para no modificar el estado directamente
        updatedCarrito [itemExists].quantity++ //si el item ya existe en el carrito, le sumo 1 a la cantidad
        setCarrito(updatedCarrito) //actualizo el carrito con la nueva cantidad
    } else{
        item.quantity = 1 //agrego una propiedad quantity al item que quiero agregar al carrito
        setCarrito(([...carrito, item])) //usan item para nombrar el elemento
    } //Un poco mas de codigo pero no rompe las reglas de react
   
    //saveLocalStorage() //guarda el carrito en el localStorage cada vez que se agrega un item al carrito, se llama a la funcion saveLocalStorage que guarda el carrito en el localStorage
}
//Inmutabilidad es un concepto importante en React, no se puede modificar el estado directamente, siempre se tiene que crear una nueva copia del estado y modificar esa copia, para eso se utilizan los spread operator o funciones de array como map, filter, etc. 
//doesitmutate.xyz para saber si una funcion muta o no el estado original y te da na explicacion
/*O sino 
const [data , setData] = useState([])
*/


function removeFromCarrito(id){
    setCarrito(prevCart => prevCart.filter(guitar => guitar.id !== id)) //filtra el carrito y devuelve un nuevo array sin el item que quiero eliminar, se utiliza el metodo filter para crear un nuevo array con los elementos que cumplen la condicion, en este caso que el id de la guitarra sea diferente al id que quiero eliminar
}

function increaseQuantity(id) {
    const updatedCarrito = carrito.map( item => {
        if(item.id === id && item.quantity < MAX_ITEMS){
            return {...item,
            quantity: item.quantity + 1}
        }
        return item
    })
    setCarrito(updatedCarrito) //modifica el carrito con la nueva cantidad, updateCarrito es un nuevo array con la cantidad actualizada
}

function decreaseQuantity(id) {
    const updatedCarrito = carrito.map( item => {
        if(item.id === id && item.quantity > MIN_ITEMS){
            return {...item,
            quantity: item.quantity - 1}
        }
        return item
    })
    setCarrito(updatedCarrito) //modifica el carrito con la nueva cantidad, updateCarrito es un nuevo array con la cantidad actualizada
}

function clearCarrito () {
    setCarrito([]) //limpia el carrito, se le asigna un array vacio
} 


 
//     //State resultado de una interaccion en el sitio o aplicacion (Ejemplo obtener listado de cliente, define el estado de nuestra app)
//     const [auth, setAuth] = useState(false) //forma mas simple de usar useState siempre adentro del componente, el set es la funcion que modifica el State
//     const [total, setTotal] = useState(0)
//     const [cart, setCart] = useState([])

//     useEffect(() => {
//         if(auth){
//             console.log('El usuario esta autenticado')
//         }
//     }, [auth]);

//     setTimeout(() =>{
//         setAuth(true) //modifica el auth
//     },3000);
//     /*REGLAS DE HOOK(Permite utilizar diferentes funciones de React en tus componentes, react tiene algunos pero podemos usar los nuetros
//     -Un Hook no se puede registrar en un condicional porque esa condicion en algun momento cambia y vamos a tener menos hook registrados que los que teniamos*
//     -Deben estar antes del return y dentro del componente, no se puede iterar
//     -No puede estar dentro de otra funcion a parte del componente
//     -Siempre debe estar la misma cantidad de HOOK
//     - No puede estar dentro de un condicional, un loop o iteracion foreach o funciones, deben estar en la parte superiror
//     // if(auth){
//     //     const [cart, setCart] = useState([])
//     //     console.log(cart)
//     // }
//     // setTimeout(() =>{
//     //     setAuth(false) //modifica el auth
//     // },3000); despues de 3 segundos cambia 
//     como aca hay dos Hooks pero cuando se cumple la condicion hay otro Hook y ahi explota la pagina despues de 3 segundos

// Hooks

// Crear tus propios Hooks y es la de incorporar State y otros Hooks de React a tu propio codigo para poder reutilizar en otros proyectos
// Permite organizar codigo, el hook se encarga de toda la logica del state mientras que los componentes solo muestra la info.
// Ventaja: 
// - tendremos State, effect, integrar otros hooks y performance 
// - Reutilizable en otros proyectos y facil de escribir

// Son funciones pero Tienen algunas reglas, deben seguir convencion de react use{hook} React escanea por problemas de reglas de los hooks
// El Hook tiene logica y no presentacion
//     */
    
//     /*useEffect siempre toma un callback dentro que dependiendo de como lo declares va a hacer diferentes cosas, bastante versatil
//     import { useEffect } from 'react'  --> Declaramos el hook en la parte superior
    
//     useEffect(() => {
//         console.log('El componente esta listo};
// }, []) //El segundo parametro es un array de dependencias, si esta vacio se ejecuta una sola vez, si tiene algo se ejecuta cada vez que ese algo cambie, si no tiene nada se ejecuta cada vez que el componente se renderiza
    //Use Effect se puede usar si consumo una API tambien para conectarse y traer información
// Buen ejemplo de useEffect es para hacer peticiones a una API, o LocalStorage, Dependiendo del valor que le pasemos hace nada o algo diferente.
// */

///Statements es una instruccion para hacer algo Ej: Variable, Condicional, Loop, Funciones, etc. Errores.
//Expression es algo que produce valor Ej: Ternarios, Array Methods, map que genera un nuevo array
 
/*Props Compartir info entre componentes y se pasa de un componente padre al hijo solamente por medio de props similares a atributos, se pueden pasar arrays, objetos o funciones
Si tenemos un state que se va a pasar por diferentes componentes los mejor es moverlos a un nivel mas arriba como el archivo principal*/

//Eventos CamelCase, en lugar de usar todo minuscula se utiliza onChange en vez de usar onclick se usa onClick, onSubmit, onMouseOver, etc. 
// donde se coloca el nombre de la funcion es un string en React(JSX) se utiliza la funcion entre llaves
return (
    <>
      
    <Header 
  
    cart = {carrito}
    removeFromCarrito={removeFromCarrito}
    increaseQuantity={increaseQuantity}
    decreaseQuantity={decreaseQuantity}
    clearCarrito={clearCarrito}
    
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => (
                <Guitar 
                    key={guitar.id} //prop especial que siempre teneemos que utilizar cuando iteremos en una lista
                    guitar={guitar}
                    // carrito={carrito} se lo paso si lo necesito en el componente hijo, si no lo necesito no se lo paso
                    setCarrito={setCarrito}
                    addToCarrito={addToCarrito}
                />
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
