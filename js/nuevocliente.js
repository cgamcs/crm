(function(){
    const formulario = document.querySelector('#formulario')

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB()

        formulario.addEventListener('submit', validarCliente)
    })

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
        console.log(DB)

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
})()