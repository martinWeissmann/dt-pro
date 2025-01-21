<?php
include 'db.php';

// Función para insertar un jugador
function insertarJugador($nombre, $equipo_id, $posicion, $fecha_nacimiento) {
    global $pdo;
    $sql = "INSERT INTO jugadores (nombre, equipo_id, posicion, fecha_nacimiento) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nombre, $equipo_id, $posicion, $fecha_nacimiento]);
}

// Función para obtener todos los jugadores
function obtenerJugadores() {
    global $pdo;
    $sql = "SELECT * FROM jugadores";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Función para eliminar un jugador
function eliminarJugador($id) {
    global $pdo;
    $sql = "DELETE FROM jugadores WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
}

// Función para editar un jugador
function editarJugador($id, $nombre, $equipo_id, $posicion, $fecha_nacimiento) {
    global $pdo;
    $sql = "UPDATE jugadores SET nombre = ?, equipo_id = ?, posicion = ?, fecha_nacimiento = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nombre, $equipo_id, $posicion, $fecha_nacimiento, $id]);
}
?>
