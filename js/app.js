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