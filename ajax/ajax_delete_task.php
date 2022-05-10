<?php
if($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST["parent_section"]) && !empty($_POST["todo_section"])) {
	require_once "../utilities.php";
	require_once "../json_maid.php";

	$maid = new JSONMaid("../todo.json");

	$target = $maid->get_record($_POST["parent_section"]);
	$new_record = [
		"priority" => $target["priority"],
		"tasks" => []
	];

	$_POST["todo_section"] = preg_replace("/\s+\(edited\)\s+/", "  (edited)  ", $_POST["todo_section"]);

	foreach($target["tasks"] as $task) {
		$task = preg_replace("/\s+\(edited\)\s+/", "  (edited)  ", $task);

		if($task === $_POST["todo_section"]) {
			continue;
		}

		array_push($new_record["tasks"], $task);
	}

	echo $maid->update_record($_POST["parent_section"], $new_record) ? "success" : "failure";
}
?>