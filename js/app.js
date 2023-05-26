// * VARIABLES
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
let presupuesto;


// * CLASES
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = presupuesto;
    this.restante = presupuesto;
    this.gastos = [];
  }

  // * Agrega un gasto a la lista de gastos
  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];

    this.actualizarRestante();
  }



  // * Actuliza el restante
  actualizarRestante() {
    // Acumulamos los gastos
    const total = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
    this.restante -= total;
  };
};


class UI {

  // * Muestra presupuesto en el html
  mostrarPresupuestoHtml(presupuestoOBJ) {
    const { presupuesto, restante } = presupuestoOBJ;

    const presupuestoHtml = document.querySelector('#total');
    const restanteHtml = document.querySelector('#restante');

    presupuestoHtml.textContent = presupuesto;
    restanteHtml.textContent = restante;
  };


  // * Muestra un mensje en pantalla
  mostrarMensajeHtml(mensaje, extito = true) {
    ui.eliminarMensajeHTML();

    const mensajeHTML = document.createElement('DIV');
    mensajeHTML.textContent = mensaje;
    mensajeHTML.classList.add('text-center', 'alert', 'mensaje');

    (extito)
      ? mensajeHTML.classList.add('alert-success')
      : mensajeHTML.classList.add('alert-danger');

    document.querySelector('.primario').insertBefore(mensajeHTML, formulario);
  }


  // * Elimina el mensaje de pantalla
  eliminarMensajeHTML() {
    const existeMensaje = document.querySelector('.mensaje');

    // Validamos si existe el mensaje y eliminamos
    (existeMensaje) ? existeMensaje.remove() : null;
  };



  // * Muestra la lista de gastos en pantalla
  mostrarListaGastos(gastos) {
    ui.limpiarListadoHtml();

    gastos.forEach(gasto => {
      const { nombre, cantidad, id } = gasto;

      const li = document.createElement('LI');
      const btnBorrar = document.createElement('BUTTON');

      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.dataset.id = id;
      li.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$${cantidad}</span>`;

      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
      btnBorrar.textContent = "Borrar";

      li.appendChild(btnBorrar);

      gastoListado.appendChild(li);
    });
  };



  // * Limpia e listado html
  limpiarListadoHtml() {
    while (gastoListado.firstChild) {
      gastoListado.firstChild.remove();
    }
  };
};

const ui = new UI();

// * EVENTOS
// * Cuando el documento esta listo
document.addEventListener('DOMContentLoaded', () => {
  // Despues de 1segundo sollicitamos el presupuesto
  setTimeout(() => {
    solicitarPresupuesto();
    ui.mostrarPresupuestoHtml(presupuesto);
  }, 1200);

  formulario.addEventListener('submit', agregarGasto);
});



// * FUNCIONES
// * Solicita un presupuesto
const solicitarPresupuesto = () => {
  let presupuestoUsuario;

  do {
    presupuestoUsuario = Number(prompt('Ingrese un presupuesto'));

    presupuesto = new Presupuesto(presupuestoUsuario);

    // Miestras el presupuesto no sea el indicado seguir solicitnadolo
  } while (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0);
};



// * Agrega un gasto
const agregarGasto = (event) => {
  event.preventDefault();

  const nombre = document.querySelector('#gasto').value;
  const cantidad = Number(document.querySelector('#cantidad').value);

  // validamos si alguno contiene vacio
  if ([nombre, cantidad].includes('')) {
    ui.mostrarMensajeHtml('Ambos campos son obligatorios', false);
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.mostrarMensajeHtml('Ingrese una cantidad valida', false);
    return;
  }

  // Si pasa las validaciones eliminamos el mensaje en caso de exitir
  ui.eliminarMensajeHTML();

  // Creamos un gasto
  const gasto = {
    nombre,
    cantidad,
    id: Date.now()
  };

  // Agregamos el gasto a la lista de gastos del presupuesto
  presupuesto.nuevoGasto(gasto);

  // Reseteamos el formulario
  formulario.reset();

  // Mostramos un mensaje de exito
  ui.mostrarMensajeHtml('Gasto agregado correctamente');

  // Eliminamos  el mensaje de exito despues de segundo y medio
  setTimeout(() => {
    ui.eliminarMensajeHTML();
  }, 1500);

  // Mostramos la lista de gastos en pantalla
  const { gastos } = presupuesto;
  ui.mostrarListaGastos(gastos);

};