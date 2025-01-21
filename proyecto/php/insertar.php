<?php
include 'partido.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fecha = $_POST['fecha'];
    $equipo_local = $_POST['equipo_local'];
    $equipo_visitante = $_POST['equipo_visitante'];
    $goles_local = $_POST['goles_local'];
    $goles_visitante = $_POST['goles_visitante'];

    insertarPartido($fecha, $equipo_local, $equipo_visitante, $goles_local, $goles_visitante);
    header('Location: partidos.html'); // Redirige después de la inserción
}
?>
