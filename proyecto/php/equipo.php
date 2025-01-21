<?php
include 'db.php';

// Función para insertar un equipo
function insertarEquipo($nombre, $ciudad, $entrenador, $estadio) {
    global $pdo;
    $sql = "INSERT INTO equipos (nombre, ciudad, entrenador, estadio) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nombre, $ciudad, $entrenador, $estadio]);
}

// Función para obtener todos los equipos
function obtenerEquipos() {
    global $pdo;
    $sql = "SELECT * FROM equipos";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Función para eliminar un equipo
function eliminarEquipo($id) {
    global $pdo;
    $sql = "DELETE FROM equipos WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
}

// Función para editar un equipo
function editarEquipo($id, $nombre, $ciudad, $entrenador, $estadio) {
    global $pdo;
    $sql = "UPDATE equipos SET nombre = ?, ciudad = ?, entrenador = ?, estadio = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nombre, $ciudad, $entrenador, $estadio, $id]);
}
?>
