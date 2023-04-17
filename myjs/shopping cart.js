document.addEventListener('DOMContentLoaded', () => {

    const baseDeDatos = [
        {
            id: 1,
            nombre: 'HP TG01-2086ns Ryzen 7 5700G-RTX 33060-16GB RAM-1TB SSD-Windows 11',
            precio: 899.99,
            imagen: 'products/d1.png'
        },
        {
            id: 2,
            nombre: 'Lenovo Legion T5-26IAB7 i7-RTX3070-16GB-1TB SSD-FREEDOS',
            precio: 1699.99,
            imagen: 'products/d2.png'
        },
        {
            id: 3,
            nombre: 'BenQ Mobiuz EX270 27"-IPS-Full HD',
            precio: 373.99,
            imagen: 'products/d3.png'
        },
        {
            id: 4,
            nombre: 'GIGABYTE G27F2-IPS FHD 27"',
            precio: 204.99,
            imagen: 'products/d4.png'
        },
        {
            id: 5,
            nombre: 'HyperX Stinger Core Headset',
            precio: 39.99,
            imagen: 'products/d5.png'
        },
        {
            id: 6,
            nombre: 'HyperX Alloy Core RGB Keyboard',
            precio: 39.99,
            imagen: 'products/d6.png'
        }

    ];

    let carrito = [];
    const divisa = '€';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('products','col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('p','card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
            
        });
    }
    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
    }
    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
       DOMtotal.textContent = calcularTotal();
    }
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
    }
    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
    }
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    renderizarProductos();
    renderizarCarrito();
  });