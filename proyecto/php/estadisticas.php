<?php
include 'db.php';

// Función para obtener estadísticas de un equipo
function obtenerEstadisticasEquipo($equipo_id) {
    global $pdo;
    $sql = "SELECT * FROM partidos WHERE equipo_local = ? OR equipo_visitante = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$equipo_id, $equipo_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Función para obtener estadísticas de un jugador
function obtenerEstadisticasJugador($jugador_id) {
    global $pdo;
    // Asegúrate de tener una tabla que relacione jugadores con partidos si es necesario
    $sql = "SELECT * FROM partidos WHERE equipo_local IN (SELECT equipo_id FROM jugadores WHERE id = ?) 
            OR equipo_visitante IN (SELECT equipo_id FROM jugadores WHERE id = ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$jugador_id, $jugador_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
