<?php
if($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST["parent_section"])) {
	require_once "../utilities.php";
	require_once "../json_maid.php";

	$maid = new JSONMaid("../todo.json");
	$target = $maid->get_record($_POST["parent_section"]);
	$target["priority"] = intval($_POST["priority"]);

	echo $maid->update_record($_POST["parent_section"], $target) ? "success" : "failure";
}
?>