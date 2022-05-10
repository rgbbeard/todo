<?php
if($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST["parent_section"]) && !empty($_POST["todo_section"])) {
	require_once "../utilities.php";
	require_once "../json_maid.php";

	$maid = new JSONMaid("../todo.json");

	$target = $maid->get_record($_POST["parent_section"]);
	$todo_index = $_POST["todo_index"];
	$todo_section = trim(preg_replace("/\[(\d{1,2}[\-|\/]\d{1,2}[\-|\/]\d{4}) (:?\d{2}){3}\]/", "", $_POST["todo_section"]));
	$todo_section = str_replace("  (edited)  ", "", $todo_section);

	set_timezone(TIMEZONE_ROME);

	$target["tasks"][$todo_index] = "[" . get_date() . " " . get_time() . "]  (<b>edited</b>)  " . $todo_section;

	echo $maid->update_record($_POST["parent_section"], $target) ? "success" : "failure";
}
?>