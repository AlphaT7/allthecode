<?php
$conn = new PDO('sqlite:db/testdb.sqlite3');
$sql = "SELECT * FROM test";
$handle = $conn->prepare($sql);
//$handle->bindParam('pid', $pid, PDO::PARAM_STR);
$handle->execute();
$query_results = $handle->fetchAll(PDO::FETCH_BOTH);
echo json_encode($query_results);
$handle->closeCursor();
