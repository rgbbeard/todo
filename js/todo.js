SystemFn(function() {
	let
		main = document.body.children[0],
		btn_task = _(".add-task"),
		btn_todo = _("#add_todo"),
		btn_del_todo = _(".delete-todo"),
		btn_del_task = _(".delete-task");

	btn_del_todo.forEach(btn => {
		btn.onclick = function() {
			let todo_name = btn.parentNode.children[0].textContent.trim();

			let r = new Request({
				method: "POST",
				url: "ajax/ajax_delete_todo.php",
				data: {
					parent_section: todo_name
				},
				done: function(r) {
					if(r["code"] == 200 && r["return"] === "success") {
						window.location.href = "";
					}
				}
			});
		};
	});

	btn_del_task.forEach(btn => {
		btn.onclick = function() {
			let
				todo_name = btn.parentNode.parentNode.parentNode.children[0].textContent.trim(),
				task_name = btn.parentNode.children[0].textContent.trim();

			let r = new Request({
				method: "POST",
				url: "ajax/ajax_delete_task.php",
				data: {
					parent_section: todo_name,
					todo_section: task_name
				},
				done: function(r) {
					if(r["code"] == 200 && r["return"] === "success") {
						window.location.href = "";
					}
				}
			});
		};
	});

	btn_task.forEach(btn => {
		btn.onclick = function() {
			let 
				section = this.dataset.section, 
				parent = this.parentNode, 
				tasks = parent.querySelector("ul"), 
				new_inputs_len = tasks.querySelectorAll(".input-group").length,
				new_input_id = `input-${new_inputs_len + 1}`;

			let group = new E({
				type: "li",
				class: ["task"],
				children: [
					new E({
						type: "div",
						class: ["input-group"],
						children: [
							new E({
								type: "input",
								id: [new_input_id],
								name: [`${section}[]`],
								placeholder: "task",
								attributes: {
									"type": "text",
									"required": "true"
								}
							}),
							new E({
								type: "label",
								for: new_input_id,
								text: "Inserisci una descrizione per la task"
							}),
							new E({
								type: "hr",
								attributes: {
									"ignore": "true"
								}
							}),
							new E({
								type: "a",
								class: ["btn-ripple", "success"],
								text: "Aggiungi",
								click: function() {
									let parent_section = _("#" + new_input_id).parentNode.parentNode.parentNode.parentNode.children[0].textContent.trim();
				
									let r = new Request({
										method: "POST",
										url: "ajax/ajax_add_task.php",
										data: {
											todo_section: _("#" + new_input_id).value.trim(),
											parent_section: parent_section
										},
										done: function(r) {
											if(r["code"] == 200 && r["return"] === "success") {
												window.location.href = "";
											}
										}
									});
								}
							}),
							new E({
								type: "a",
								class: ["btn-ripple", "error"],
								text: "Annulla",
								click: function() {
									let
										p = this.parentNode,
										c = p.parentNode;
									c.removeChild(p);
								}
							})
						]
					})
				]
			});

			tasks.appendChild(group);
		};
	});

	btn_todo.onclick = function() {
		let 
			new_sections_len = _(".section").length
			new_section_id = `section-${new_sections_len + 1}`;

		let section = new E({
			type: "li",
			class: ["section"],
			id: [new_section_id],
			children: [
				new E({
					type: "div",
					class: ["input-group"],
					children: [
						new E({
							type: "input",
							name: "section[]",
							id: [`${new_section_id}-input`],
							placeholder: "todo name"
						}),
						new E({
							type: "label",
							for: `${new_section_id}-input`,
							text: "Scrivi il nome del todo"
						})
					]
				}),
				new E({
					type: "a",
					class: ["btn-ripple", "success"],
					text: "Aggiungi",
					click: function() {
						let todo_name = _(`#${new_section_id}-input`).value.trim();

						let r = new Request({
							method: "POST",
							url: "ajax/ajax_add_todo.php",
							data: {
								parent_section: todo_name.toUpperCase()
							},
							done: function(r) {
								if(r["code"] == 200 && r["return"] === "success") {
									window.location.href = "";
								}	
							}
						});
					}
				}),
				new E({
					type: "a",
					class: ["btn-ripple", "error"],
					text: "Annulla",
					click: function() {
						let
							p = this.parentNode,
							c = p.parentNode;
						c.removeChild(p);
					}
				})
			]
		});

		main.appendChild(section);
	};
});