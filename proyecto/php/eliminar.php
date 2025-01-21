<?php
include 'partido.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    eliminarPartido($id);
    header('Location: partidos.html'); // Redirige después de la eliminación
}
?>
