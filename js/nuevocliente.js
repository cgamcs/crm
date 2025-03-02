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
            console.log('Se conecto correctamente')
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

        // Crear un objeto con la informacion
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        crearNuevoCliente(cliente)
    }

    function crearNuevoCliente(cliente) {
        if (!DB) {
            console.log('La base de datos no está conectada');
            return;
        }

        const transaction = DB.transaction(['crm'], 'readwrite')

        const objectStore = transaction.objectStore('crm')

        objectStore.add(cliente)

        transaction.onerror = function() {
            alerta('Hubo un error al agregar el cliente', 'error')
        }

        transaction.oncomplete = function() {
            alerta('Cliente agregado correctamente')

            setTimeout(() => {
                window.location.href = 'index.html'
            }, 1000);
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