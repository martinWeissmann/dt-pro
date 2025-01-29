let partidos = [];
let partidosGanados = 0;
let partidosPerdidos = 0;
let partidosEmpatados = 0;

document.getElementById('partido-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fecha = document.getElementById('fecha').value;
    const equipoLocal = document.getElementById('equipoLocal').value;
    const equipoVisitante = document.getElementById('equipoVisitante').value;
    const resultado = document.getElementById('resultado').value;

    // Agregar partido al arreglo
    partidos.push({ fecha, equipoLocal, equipoVisitante, resultado });
    actualizarEstadisticas(resultado);

    // Mostrar partido en la tabla
    agregarPartidoATabla({ fecha, equipoLocal, equipoVisitante, resultado });
    cerrarFormulario();
});

function mostrarFormulario() {
    document.getElementById('formulario').style.display = 'block';
}

function cerrarFormulario() {
    document.getElementById('formulario').style.display = 'none';
}

function agregarPartidoATabla(partido) {
    const tbody = document.getElementById('partidos-list');
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${partidos.length}</td>
        <td>${partido.fecha}</td>
        <td>${partido.equipoLocal}</td>
        <td>${partido.equipoVisitante}</td>
        <td>${partido.resultado}</td>
        <td><button onclick="eliminarPartido(${partidos.length - 1})">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
}

function eliminarPartido(index) {
    // Eliminar partido del arreglo y actualizar la tabla
    partidos.splice(index, 1);
    partidosGanados = partidos.filter(p => p.resultado === 'Victoria').length;
    partidosPerdidos = partidos.filter(p => p.resultado === 'Derrota').length;
    partidosEmpatados = partidos.filter(p => p.resultado === 'Empate').length;

    // Refrescar tabla
    actualizarTabla();
    actualizarEstadisticas();
}

function actualizarTabla() {
    const tbody = document.getElementById('partidos-list');
    tbody.innerHTML = '';
    partidos.forEach((partido, index) => {
        agregarPartidoATabla(partido);
    });
}

function actualizarEstadisticas(resultado = '') {
    if (resultado === 'Victoria') {
        partidosGanados++;
    } else if (resultado === 'Derrota') {
        partidosPerdidos++;
    } else if (resultado === 'Empate') {
        partidosEmpatados++;
    }

    document.getElementById('partidos-ganados').innerText = partidosGanados;
    document.getElementById('partidos-perdidos').innerText = partidosPerdidos;
    document.getElementById('partidos-empatados').innerText = partidosEmpatados;
}
