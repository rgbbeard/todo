<?php
require_once "utilities.php";
require_once "json_maid.php";

$priorities = ["Bassa", "Normale", "Molto alta", "Massima"];
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Todo manager</title>
		<link href="css/lib.css" rel="stylesheet">
		<link href="css/buttons.css" rel="stylesheet">
		<link href="css/main.css" rel="stylesheet">
		<script src="js/prototype.js"></script>
		<script src="js/utilities.js"></script>
		<script src="js/html.js"></script>
		<script src="js/render.js"></script>
	</head>
	<body>
		<?php
		$maid = new JSONMaid("todo.json");
		$sections = $maid->get_records();

		if($maid->records_count() === 0) {
			echo "<p>Non sono ancora stati inseriti todo</p>";
		} else {
			echo "<div id=\"search-bar-container\">
				<div class=\"input-group\">
					<input type=\"text\" id=\"search-bar\" placeholder=\"ricerca\">
					<label for=\"search-bar\">Ricerca un todo</label>
				</div>
			</div>
			<p>Hai " . count($sections) . " todo da fare</p>
			<ul>";

			foreach($sections as $section => $specs) {
				$tasks = $specs["tasks"];
				$tasksn = count($tasks);
				$priority = $specs["priority"];
				$priority_class = "normal-priority";

				switch(intval($priority)) {
					case 0:
						$priority_class = "low-priority";
						break;
					case 1:
						$priority_class = "normal-priority";
						break;
					case 2:
						$priority_class = "high-priority";
						break;
					case 3:
						$priority_class = "max-priority";
						break;
				}

				echo "<li class=\"section $priority_class\">
					<b>$section</b>
					<a class=\"btn-ripple error delete-todo\">Elimina</a>
					<a class=\"btn-ripple warning edit-todo\">Modifica</a>
					<p>$tasksn " . ($tasksn > 1 || $tasksn === 0 ? "tasks" : "task") . "</p>
					<ul>";

					$index = 0;
					foreach($tasks as $task) {
						# Highlight date and time
						preg_match("/(\d{1,2}[\-|\/]\d{1,2}[\-|\/]\d{4}) (:?\d{2}){3}/", $task, $matches);

						if(!empty($matches)) {
							$task = str_replace($matches[0], "<b><i>" . $matches[0] . "</i></b>", $task);
						}

						echo "<li class=\"task\">
							<p data-index=\"$index\">$task</p>
							<a class=\"btn-ripple error delete-task\">Elimina</a>
							<a class=\"btn-ripple warning edit-task\">Modifica</a>
							<a class=\"btn-ripple success update-task\" hidden>Aggiorna</a>
						</li>";

						$index++;
					}

				echo "</ul>
					<a class=\"add-task btn-ripple\" data-section=\"$section\">Aggiungi task per <b>$section</b></a>
				</li>";

			}

			echo "</ul>";
		}
		?>
		<a id="add_todo" class="btn-ripple">Aggiungi todo</a>
	</body>
</html>
<script src="js/todo.js"></script>
