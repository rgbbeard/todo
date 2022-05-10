<?php
if($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST["todo_section"]) && !empty($_POST["parent_section"])) {
	require_once "../utilities.php";
	require_once "../json_maid.php";

	$maid = new JSONMaid("../todo.json");

	$target = $maid->get_record($_POST["parent_section"]);
	$new_record = [
		"priority" => $target["priority"],
		"tasks" => []
	];

	foreach($target["tasks"] as $task) {
		array_push($new_record["tasks"], $task);
	}

	set_timezone(TIMEZONE_ROME);

	array_push($new_record["tasks"], "[" . get_date() . " " . get_time() . "] " . $_POST["todo_section"]);

	echo $maid->update_record($_POST["parent_section"], $new_record) ? "success" : "failure";
}
?>