<?php
if($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST["parent_section"])) {
	require_once "../utilities.php";
	require_once "../json_maid.php";

	$maid = new JSONMaid("../todo.json");

	echo $maid->put_record($_POST["parent_section"], [
		"priority" => (!@empty($_POST["priority"]) && intval($_POST["priority"]) >= 0 ? intval($_POST["priority"]) : 1),
		"tasks" => []
	]) ? "success" : "failure";
}
?>