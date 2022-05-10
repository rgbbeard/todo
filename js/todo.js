SystemFn(function() {
	let
		search_bar = _("#search-bar-container input[type='text']")[0],
		main = document.body.children[1],
		todos = _(".section>b"),
		btn_task = _(".add-task"),
		btn_todo = _("#add_todo"),
		btn_del_todo = _(".delete-todo"),
		btn_del_task = _(".delete-task"),
		btn_edit_todo = _(".edit-todo"),
		btn_edit_task = _(".edit-task"),
		btn_update_task = _(".update-task");

	function prioritySelector(id) {
		return new E({
			type: "div",
			class: ["input-group", "select"],
			children: [
				new E({
					type: "label",
					for: "select-" + id,
					text: "Livello di priorità"
				}),
				new E({
					type: "select",
					id: ["select-" + id],
					children: [
						new E({
							type: "option",
							value: "0",
							text: "Bassa"
						}),
						new E({
							type: "option",
							value: "1",
							text: "Normale"
						}),
						new E({
							type: "option",
							value: "2",
							text: "Molto alta"
						}),
						new E({
							type: "option",
							value: "3",
							text: "Massima"
						})
					]
				})
			]
		});
	}

	search_bar.on("keyup", function() {
		let research = this.value.toLowerCase().trim();

		todos.forEach(t => {
			let name = t.txt().toLowerCase().trim(), parent = t.parentNode;

			if(!name.includes(research)) {
				if(!parent.hasAttribute("hidden")) {
					parent.setAttribute("hidden", "");
				}
			} else {
				if(parent.hasAttribute("hidden")) {
					parent.removeAttribute("hidden");
				}
			}
		});
	});

	btn_del_todo.forEach(btn => {
		btn.on("click", function() {
			let todo_name = btn.parentNode.children[0].txt().trim();

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
		});
	});

	btn_del_task.forEach(btn => {
		btn.on("click", function() {
			let
				todo_name = btn.parentNode.parentNode.parentNode.children[0].txt().trim(),
				task_name = btn.parentNode.children[0].txt().trim();

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
		});
	});

	btn_edit_task.forEach(btn => {
		btn.on("click", function() {
			let task = btn.parentNode.children[0], btn_update = this.nextElementSibling;

			if(!this.hasAttribute("can-update")) {
				this.setAttribute("can-update", "true");
				this.txt("Annulla");
				task.setAttribute("contenteditable", "true");
				btn_update.removeAttribute("hidden");
			} else {
				this.removeAttribute("can-update");
				this.txt("Modifica");
				task.removeAttribute("contenteditable");
				btn_update.setAttribute("hidden", "true");
			}
		});
	});

	btn_edit_todo.forEach(btn => {
		let
			edit_mode = false,
			parent = btn.parentNode,
			todo = parent.children[0],
			todo_name = todo.txt().trim(),
			id = todo_name.split("-")[1];

		let u = new E({
			type: "div",
			children: [
				prioritySelector(id),
			]
		});

		let btn_update = new E({
			type: "a",
			class: ["btn-ripple", "success"],
			text: "Aggiorna",
			click: function() {
				let priority = this.parentNode.querySelector(".input-group.select select").value.trim();

				let r = new Request({
					method: "POST",
					url: "ajax/ajax_update_todo.php",
					data: {
						parent_section: todo_name,
						priority: priority
					},
					done: function(r) {
						if(r["code"] == 200 && r["return"] === "success") {
							window.location.href = "";
						}
					}
				});
			}
		});

		btn.on("click", function() {
			if(edit_mode) {
				edit_mode = false;
				this.txt("Modifica");
				parent.removeChildren(u, btn_update);
			} else {
				edit_mode = true;
				this.txt("Annulla");
				this.insertAfter(u, btn_update);
			}
		});
	});

	btn_update_task.forEach(btn => {
		btn.on("click", function() {
			let 
				task = btn.parentNode.children[0],
				todo_name = btn.parentNode.parentNode.parentNode.children[0].txt().trim();

			let r = new Request({
				method: "POST",
				url: "ajax/ajax_update_task.php",
				data: {
					parent_section: todo_name,
					todo_index: task.dataset.index,
					todo_section: task.txt().trim()
				},
				done: function(r) {
					if(r["code"] == 200 && r["return"] === "success") {
						window.location.href = "";
					}
				}
			});			
		});
	});

	btn_task.forEach(btn => {
		btn.on("click", function() {
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
									let parent_section = _("#" + new_input_id).parentNode.parentNode.parentNode.parentNode.children[0].txt().trim();
				
									let r = new Request({
										method: "POST",
										url: "ajax/ajax_add_task.php",
										data: {
											todo_section: _("#" + new_input_id).value.trim(),
											parent_section: parent_section
										},
										done: function(r) {
											console.log(r["return"]);

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
										c = p.parentNode,
										u = c.parentNode;
									u.removeChild(c);
								}
							})
						]
					})
				]
			});

			tasks.appendChild(group);
		});
	});

	btn_todo.on("click", function() {
		window.scrollTo(0, 0);

		let 
			new_sections_len = _(".section").length
			new_section_id = `section-${new_sections_len + 1}`;

		let section = new E({
			type: "li",
			class: ["section"],
			id: [new_section_id],
			children: [
				prioritySelector(new_section_id),
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
						let
							todo_name = _(`#${new_section_id}-input`).value.trim(),
							priority = _(`#select-${new_section_id}`).value.int();

						let r = new Request({
							method: "POST",
							url: "ajax/ajax_add_todo.php",
							data: {
								parent_section: todo_name.toUpperCase(),
								priority: priority
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
	});
});