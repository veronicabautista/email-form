//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();

function eventListeners(){
  //Cuando arranca la app
  document.addEventListener('DOMContentLoaded', iniciarAPP);

  //Campos del formulario
  email.addEventListener('blur', validarFormulario);
  asunto.addEventListener('blur', validarFormulario);
  mensaje.addEventListener('blur', validarFormulario);

  //Reiniciar formulario
  btnReset.addEventListener('click', resetearFormulario);

  //Enviar email
  formulario.addEventListener('submit', enviarEmail);
}



//Funciones

function iniciarAPP() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}


//Valida el formulario
function validarFormulario(e){
  if(e.target.value.length > 0){
    //Elimina los errores
    const error = document.querySelector('p.error');   
    error.remove(); 

    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
  }else{
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');
    mostrarError('Todos los campos son obligatorios');
  }

  if(e.target.type === 'email'){

    if (er.test(e.target.value)){
      const error = document.querySelector('p .error');
      error.remove();

      e.target.classList.remove('border', 'border-red-500');
      e.target.classList.add('border', 'border-green-500');
    }else {
      e.target.classList.remove('border', 'border-green-500');
      e.target.classList.add('border', 'border-red-500');
      mostrarError('El email no es válido');
    }
  }

  if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
  }
}


function mostrarError(mensaje){
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

  const errores = document.querySelectorAll('.error');

  if (errores.length === 0){
    formulario.appendChild(mensajeError);
  }
}

function enviarEmail(e){
  e.preventDefault();

  //Mostrar el spinner
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex';

  //despues de 3 segundos ocultamos el spinner
  setTimeout(() => {
    spinner.style.display = 'none';

    //Mensaje envío correcto
    const parrafo = document.createElement('p');
    parrafo.textContent = 'El mensaje se envió correctamente';
    parrafo.classList.add('text-center', 'my-10', 'p-3', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

    formulario.insertBefore(parrafo, spinner);

    setTimeout( () => {
      parrafo.remove();

      resetearFormulario();
    }, 5000);
  }, 3000);
}

//Resetear el formulario
function resetearFormulario(){
  formulario.reset();

  iniciarAPP();
}
