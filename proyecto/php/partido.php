<?php
include 'db.php';

// Función para insertar un partido
function insertarPartido($fecha, $equipo_local, $equipo_visitante, $goles_local, $goles_visitante) {
    global $pdo;
    $sql = "INSERT INTO partidos (fecha, equipo_local, equipo_visitante, goles_local, goles_visitante) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$fecha, $equipo_local, $equipo_visitante, $goles_local, $goles_visitante]);
}

// Función para obtener todos los partidos
function obtenerPartidos() {
    global $pdo;
    $sql = "SELECT * FROM partidos";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Función para eliminar un partido
function eliminarPartido($id) {
    global $pdo;
    $sql = "DELETE FROM partidos WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
}

// Función para editar un partido
function editarPartido($id, $fecha, $equipo_local, $equipo_visitante, $goles_local, $goles_visitante) {
    global $pdo;
    $sql = "UPDATE partidos SET fecha = ?, equipo_local = ?, equipo_visitante = ?, goles_local = ?, goles_visitante = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$fecha, $equipo_local, $equipo_visitante, $goles_local, $goles_visitante, $id]);
}
?>
