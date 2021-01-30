const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaPlatos = document.querySelector("#lista-platos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // agragar plato al presionar "Agregar al Carrito"
  listaPlatos.addEventListener("click", agregarPlato);

  //   elimina platos del carrito
  carrito.addEventListener("click", eliminarPlato);

  //   vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
  });
}

// funciones
function agregarPlato(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const platoSeleccionado = e.target.parentElement.parentElement;
    leerDatosPlato(platoSeleccionado);
  }
}

// Elimina un plato del carrito
function eliminarPlato(e) {
  if (e.target.classList.contains("borrar-plato")) {
    const platoId = e.target.getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter((plato) => plato.id !== platoId);
    carritoHTML();
  }
}

// lee el contenido del HTML y extrae la información
function leerDatosPlato(plato) {
  const infoPlato = {
    imagen: plato.querySelector("img").src,
    titulo: plato.querySelector("h4").textContent,
    precio: plato.querySelector(".precio span").textContent,
    id: plato.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //   revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((plato) => plato.id === infoPlato.id);
  if (existe) {
    const platos = articulosCarrito.map((plato) => {
      if (plato.id === infoPlato.id) {
        plato.cantidad++;
        return plato;
      } else {
        return plato;
      }
    });
    articulosCarrito = [...platos];
  } else {
    //   agrega elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoPlato];
  }

  carritoHTML();
}

// Muestra el carrito de compras
function carritoHTML() {
  // limpiar el HTML
  limpiarHTML();
  // recorre el carrito y genera el HTML
  articulosCarrito.forEach((plato) => {
    const { imagen, titulo, precio, cantidad, id } = plato;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${imagen}" width="100" />
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-plato" data-id="${id}" > X </a>
        </td>
    `;
    // agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
