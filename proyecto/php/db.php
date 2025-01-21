<?php
$host = 'localhost';
$dbname = 'dt_pro';  // Nombre de la base de datos
$username = 'root';  // Usuario de la base de datos
$password = '';      // Contraseña de la base de datos

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
