<?php
if($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST["parent_section"]) && !empty($_POST["todo_section"])) {
	require_once "../utilities.php";
	require_once "../json_maid.php";

	$maid = new JSONMaid("../todo.json");

	$target = $maid->get_record($_POST["parent_section"]);
	$new_record = [];

	foreach($target as $index => $task) {
		if($task === $_POST["todo_section"]) {
			continue;
		}

		$new_record[] = $task;
	}

	echo $maid->update_record($_POST["parent_section"], $new_record) ? "success" : "failure";
}
?>