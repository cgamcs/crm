(function(){
    let DB
    const formulario = document.querySelector('#formulario')

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB()

        formulario.addEventListener('submit', validarCliente)
    })

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 1)

        abrirConexion.onerror = function() {
            console.log('Hubo un error')
        }

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result
        }
    }

    function validarCliente(e) {
        e.preventDefault()

        // Leer los inputs
        const nombre = document.querySelector('#nombre').value
        const email = document.querySelector('#email').value
        const telefono = document.querySelector('#telefono').value
        const empresa = document.querySelector('#empresa').value

        if(nombre === '' || email === '' || telefono === '' || empresa === '') {
            alerta('Todos los campos son obligatorios', 'error')

            return
        }
    }

    function alerta(mensaje, tipo) {
        const alerta = document.querySelector('.alerta')

        if(!alerta) {
            const divMensaje = document.createElement('DIV')
            divMensaje.classList.add('px-4', 'py-3', 'rounded-lg', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'font-bold', 'text-white', 'alerta')
    
            if(tipo === 'error') {
                divMensaje.classList.add('bg-red-600')
            } else {
                divMensaje.classList.add('bg-green-600')
            }
    
            divMensaje.textContent = mensaje
    
            formulario.appendChild(divMensaje)
    
            setTimeout(() => {
                divMensaje.remove()
            }, 3000);
        }
    }
})()