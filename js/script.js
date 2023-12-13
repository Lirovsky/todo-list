// Seleção de elementos

// formulário inicial onde adiciona tarefas
const todoForm = document.querySelector("#todo-form");
// campo de entrada onde digita as tarefas
const todoInput = document.querySelector("#todo-input");
// campo onde irão aparecer as tarefas
const todoList = document.querySelector("#todo-list");
// formulário onde edita as tarefas
const editForm = document.querySelector("#edit-form");
// campo de entrada onde edita as tarefas
const editInput = document.querySelector("#edit-input");
// botão de cancelar edição
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

// menu de filtro
const filterBtn = document.querySelector(".filter-todo");

let oldInputValue; //salva o valor anterior da tarefa (antes de ser editada)

// FUNÇÕES
// Cria a tarefa
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text; //o texto recebido do submit
  todo.appendChild(todoTitle); //bota dentro do todo

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
  todo.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-todo");
  removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  todo.appendChild(removeBtn);

  todoList.appendChild(todo); //bota a task na lista
  todoInput.value = ""; //limpa o valor no campo de digitação
  todoInput.focus(); //autofocus no input
}

//Esconde o formulario de add, esconde a lista de tarefas e mostra o formulario de edição
const toggleForms = () => {
  editForm.classList.toggle("hide"); //esconde o formulário de edição
  todoForm.classList.toggle("hide"); //esconde o formulário de criação
  todoList.classList.toggle("hide"); //esconde as tarefas
}

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo"); //seleciona todas tarefas
  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if(todoTitle.innerText === oldInputValue)
      todoTitle.innerText = text;
  })
}

// Filtra as tarefas
const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo"); //seleciona todas tarefas

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));
      break;

    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    default:
      break;
  }
};

// EVENTOS

// Salvar o nome em LS
window.addEventListener('load', () => {
  // pega o valor inserido no input
	const nameInput = document.querySelector('#name');
	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})
})

// evento de salvar o valor atribuido no input
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); //não vai enviar formulário ao clicar no botão
    const inputValue = todoInput.value; //pega o que foi digitado no campo
    if(inputValue)
        saveTodo(inputValue); //chama a função de salvar
})

// Add as tarefas, remove e edita
document.addEventListener("click", (e) => { //seleciona o documento inteiro
    const targetEl = e.target; //pega o elemento que foi clicado
    const parentEl = targetEl.closest("div"); //os botões afetam o elemento pai, então isso seleciona a div que contem os botões
    let todoTitle; //variavel temporário de titulo

    // altera o nome da tarefa ao editar
    if(parentEl && parentEl.querySelector("h3"))
        todoTitle = parentEl.querySelector("h3").innerText;
    
    if(targetEl.classList.contains("finish-todo"))
        parentEl.classList.toggle("done"); //se tem a classe ele tira, se não tem ele adiciona
    
    if(targetEl.classList.contains("remove-todo"))
        parentEl.remove();

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle; //input de edição já vem preenchido
        oldInputValue = todoTitle; //substitui valor antigo pelo novo
    }

})

// Botão de cancelar edição
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault(); //não envia formulário (é um botão)
    toggleForms(); //chama a função o que acaba revertendo tudo e voltando pro normal
})

// botão de editar tarefa
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;
    if(editInputValue)
      updateTodo(editInputValue) //Altera o valor

    toggleForms();
})

// filtro
filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value; //pega o valor atual 
  
    filterTodos(filterValue); //baseado no valor executa coisas diferentes
  });

