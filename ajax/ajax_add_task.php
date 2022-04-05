<?php
if($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST["todo_section"]) && !empty($_POST["parent_section"])) {
	require_once "../utilities.php";
	require_once "../json_maid.php";

	$maid = new JSONMaid("../todo.json");

	$target = $maid->get_record($_POST["parent_section"]);
	$new_record = [];

	foreach($target as $index => $task) {
		$new_record[] = $task;
	}

	set_timezone(TIMEZONE_ROME);

	$new_record[] = "[" . get_date() . " " . get_time() . "] " . $_POST["todo_section"];

	echo $maid->update_record($_POST["parent_section"], $new_record) ? "success" : "failure";
}
?>