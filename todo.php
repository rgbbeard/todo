<?php
require_once "utilities.php";
require_once "json_maid.php";
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<link href="css/lib.css" rel="stylesheet">
		<link href="css/buttons.css" rel="stylesheet">
		<script src="js/prototype.js"></script>
		<script src="js/utilities.js"></script>
		<script src="js/html.js"></script>
		<script src="js/render.js"></script>
		<style>
			* {
				box-sizing: border-box;
				font-size: 13px;
				font-family: "Calibri", sans-serif;
			}

			li {
				list-style-type: none;
				padding: 10px;
			}

			li:hover {
				background-color: #aaa6;
			}

			.section {
				font-size: 16px;
			}

			.section>b {
				height: 30px;
				line-height: 60px;
			}

			.section>b,
			.section .btn-ripple {
				vertical-align: middle;
			}

			.section>b:nth-child(1) {
				display: inline-block;
				margin-bottom: 10px;
			}

			.section .btn-ripple {
				margin-top: 20px;
			}

			.section:hover {
			}
		</style>
	</head>
	<body>
		<?php
		$maid = new JSONMaid("todo.json");
		$sections = $maid->get_records();

		if(count($sections) === 0) {
			echo "<p>Non sono ancora stati inseriti todo</p>";
		}

		echo "<ul>";

		foreach($sections as $section => $tasks) {
			echo "<li class=\"section\"><b>$section</b>
				<a class=\"btn-ripple error delete-todo\">Elimina</a>
				<ul>";

				foreach($tasks as $task) {
					preg_match("/(\d{1,2}[\-|\/]\d{1,2}[\-|\/]\d{4}) (:?\d{2}){3}/", $task, $matches);

					if(!empty($matches)) {
						$task = str_replace($matches[0], "<b>" . $matches[0] . "</b>", $task);
					}

					echo "<li class=\"task\">
						<p>$task</p>
						<a class=\"btn-ripple error delete-task\">Elimina</a>
					</li>";
				}

			echo "</ul>
				<a class=\"add-task btn-ripple info\" data-section=\"$section\">Aggiungi task per <b>$section</b></a>
			</li>";

		}

		echo "</ul>";
		?>
		<a id="add_todo" class="btn-ripple secondary">Aggiungi todo</a>
	</body>
</html>
<script src="js/todo.js"></script>