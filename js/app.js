// * VARIABLES
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
const objPresupuestp = {};


// * EVENTOS
// * Cuando el documento esta listo
document.addEventListener('DOMContentLoaded', () => {
  // Despues de 1segundo sollicitamos el presupuesto
  setTimeout(() => {
    solicitarPresupuesto();
  }, 500);
});



// * FUNCIONES
// * Solicita un presupuesto
const solicitarPresupuesto = () => {
  let presupuestoUsuario;

  do {
    presupuestoUsuario = Number(prompt('Ingrese un presupuesto'));

    // Miestras el presupuesto no sea el indicado seguir solicitnadolo
  } while (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0);

};