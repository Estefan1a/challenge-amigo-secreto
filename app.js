// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let insertarAmigo = [];
let listaAmigosSorteados = []; 
desactivarBotonSortear();


//FUNCIÓN PARA AGREGAR NOMBRES
function agregarAmigo(){
    let amigo;
    amigo=document.getElementById('amigo').value;
    
    if (validarNombres(amigo)){
        insertarAmigo.push(amigo);
        //agregarElementoLista('#listaAmigos',`<li>${amigo}</li>`);
        agregarElementoLista('#listaAmigos',`<li>${amigo} <button class="btn-eliminar" onclick="eliminarAmigo('${amigo}')">X</button></li>`);
        limpiarCaja();
    }

    if (insertarAmigo.length >= 2){
        activarBotonSortear();
    }
}

//FUNCIÓN QUE MUESTRA EL AMIGO SORTEADO
function sortearAmigo(){
    let amigoSorteado = generarAmigoSorteado();
    let ganador = insertarAmigo[amigoSorteado];
    
    if (amigoSorteado === null) {
        agregarElementoTexto('#resultado','');
        return;
    } else{
        agregarElementoTexto('#resultado', `🎉 Ganó ${ganador}! 🎊`);
        confetti({
            /*particleCount: 100,  // Cantidad de partículas
            spread: 70,  // Expansión del confeti
            origin: { y: 0.6 } // Punto de inicio (más arriba o más abajo)*/
            particleCount: 200,  // Más partículas
            spread: 100,  // Se expande más
            startVelocity: 40, // Velocidad inicial
            scalar: 1.2, // Tamaño de las partículas
            colors: ['#410445', '#FF2DF1', '#F6DC43','#A5158C'], // Colores personalizados
            origin: { y: 0.6 } // Punto de inicio
        });
    }
    
}

//FUNCION PARA GENERAR UN NUMERO ALEATORIO PARA EL SORTEO
function generarAmigoSorteado (){
    let maximosAmigos = insertarAmigo.length;
    let generarSorteo = Math.floor(Math.random()*maximosAmigos);
     
    if (listaAmigosSorteados.length >= maximosAmigos){
            agregarElementoTexto('h2','Ya se sortearon todos los números posibles');
            desactivarBotonSortear();
            return null;
            //DESACTIVAR BOTÓN SORTEAR AMIGO
    } else{
        //SI EL NUMERO GENERADO ESTÁ INCLUIDO EN LA LISTA 
        if (listaAmigosSorteados.includes(generarSorteo)){
            return generarAmigoSorteado();
        } else {
            listaAmigosSorteados.push(generarSorteo);
            return generarSorteo;
        }
    } 
}

function validarNombres(nombre){
    // Expresión regular para permitir solo letras (mayúsculas y minúsculas)
    let regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}$/;

    if (!regex.test(nombre)) {
        alert("Por favor ingrese un nombre válido");
        limpiarCaja();        
        return false;
    }
    
    let nombreLower = nombre.toLowerCase(); // Convertir a minúsculas para comparar

    if (insertarAmigo.some(n => n.toLowerCase() === nombreLower)) {
        alert("Este nombre ya ha sido agregado.");
        limpiarCaja();
        return false;
    }
    return true;
}

// FUNCION PARA ELIMINAR NOMBRE
function eliminarAmigo(nombre){
     // Preguntar si está seguro de eliminar el nombre
     if (confirm(`¿Estás seguro de que quieres eliminar "${nombre}"?`)) {
        // Eliminar el nombre de la lista
        insertarAmigo = insertarAmigo.filter(item => item !== nombre);

        // Eliminar el nombre de la lista HTML
        const listaAmigos = document.getElementById('listaAmigos');
        const items = listaAmigos.getElementsByTagName('li');
        
        for (let i = 0; i < items.length; i++) {
            if (items[i].textContent.includes(nombre)) {
                listaAmigos.removeChild(items[i]);
                break;
            }
        }
    }

    if (insertarAmigo.length < 2) {
        desactivarBotonSortear();  // Llamar la función para desactivar el botón
    }

}

//FUNCIÓN PARA AGREGAR LOS NOMBRES A LA PANTALLA
function agregarElementoLista(elemento, lista){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML += lista;
    return;
}

//FUNCIÓN PARA AGREGAR TEXTO A UN ELEMENTO
function agregarElementoTexto(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//FUNCIÓN PARA LIMPIER EL ELEMENTO DE LA CAJA (IMPUT)
function limpiarCaja(){
    document.querySelector('#amigo').value = '';
}

function reiniciarSorteo(){
    desactivarBotonSortear();
    agregarElementoTexto('#resultado','');
    agregarElementoTexto('#listaAmigos', '');
    agregarElementoTexto('h2','Digite el nombre de sus amigos');
    insertarAmigo = [];
    listaAmigosSorteados = [];
}

function desactivarBotonSortear() {
    document.querySelector('#btnsortear').disabled = true;  // Desactiva el botón de sortear
}

function activarBotonSortear() {
    document.querySelector('#btnsortear').removeAttribute('disabled'); 
}

