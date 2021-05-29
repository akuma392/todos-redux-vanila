let input = document.querySelector('#text');
let root = document.querySelector('ul');
let All = document.querySelector('.All');
let Completed = document.querySelector('.Completed');
let Active = document.querySelector('.Active');
let Clear = document.querySelector('.Clear');
let item = document.querySelector('.item');
let intialValue = {
  todos: [{ todo: 'learn react', isDone: false }],
};

let store = Redux.createStore(reducer);
let todos = store.getState().todos;
// let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

function reducer(state = intialValue, action) {
  const updatedTodos = state.todos;
  switch (action.type) {
    case 'addTodos':
      let value = action.event.target.value;
      if (action.event.keyCode === 13 && action.event.target.value !== '') {
        updatedTodos.push({
          todo: value,
          isDone: false,
        });
        action.event.target.value = '';
      }

      return { ...state, todos: updatedTodos };
    case 'deleteTodo':
      // let id = action.event.target.dataset.id;
      updatedTodos.splice(action.id, 1);
      return { ...state, todos: updatedTodos };
    case 'toggleTodo':
      // let id = event.target.dataset.id;
      updatedTodos[action.id].isDone = !updatedTodos[action.id].isDone;
      return { ...state, todos: updatedTodos };
    case 'activeTodo':
      let activeTodos = [...updatedTodos].filter((e) => !e.isDone);
      console.log(activeTodos, updatedTodos);
      return { ...state, todos: activeTodos };

    case 'completedTodo':
      let completed = [...updatedTodos].filter((e) => e.isDone);
      console.log(completed, updatedTodos);
      return { ...state, todos: completed };
    case 'allTodos':
      return { ...state };
    default:
      return state;
  }
}

function handleToggle(event) {
  store.dispatch({
    type: 'toggleTodo',
    event: event,
    id: event.target.dataset.id,
  });
}
function deleteTodo(event) {
  store.dispatch({
    type: 'deleteTodo',
    event: event,
    id: event.target.dataset.id,
  });
}
function handleEvent(event) {
  store.dispatch({
    type: 'addTodos',
    event: event,
  });
}
store.subscribe(() => {
  let data = store.getState();
  createUI(data.todos);
});

function createUI(data = todos, rootElm = root) {
  rootElm.innerHTML = '';
  data.forEach((elm, index) => {
    let li = document.createElement('li');
    let inp = document.createElement('input');
    inp.type = 'checkbox';
    inp.checked = elm.isDone;
    inp.setAttribute('data-id', index);
    inp.addEventListener('input', handleToggle);

    let p = document.createElement('p');
    p.innerText = elm.todo;
    if (elm.isDone == true) {
      p.classList.add('checked');
    }
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerText = 'X';
    span.innerText = 'X';
    span.setAttribute('data-id', index);

    span.addEventListener('click', deleteTodo);

    div.append(span);

    li.append(inp, p, div);
    root.append(li);

    // item.innerText = `${allTodos.filter((e) => !e.isDone).length} items left`;
  });
}
createUI();
input.addEventListener('keyup', handleEvent);
Completed.addEventListener('click', () => {
  store.dispatch({
    type: 'completedTodo',
  });
});
Active.addEventListener('click', () => {
  store.dispatch({
    type: 'activeTodo',
  });
});
All.addEventListener('click', () => {
  store.dispatch({
    type: 'allTodos',
  });
});

// function handleEvent(event) {
//   console.log(event.keyCode);
//   let value = event.target.value;
//   if (event.keyCode === 13 && event.target.value !== '') {
//     allTodos.push({
//       todo: value,
//       isDone: false,
//     });
//     createUI(allTodos, root);
//     event.target.value = '';
//   }
//   localStorage.setItem('todos', JSON.stringify(allTodos));
// }

// function deleteTodo(event) {
//   let id = event.target.dataset.id;

//   allTodos.splice(id, 1);
//   localStorage.setItem('todos', JSON.stringify(allTodos));
//   createUI(allTodos, root);
// }

// function handleToggle(event) {
//   let id = event.target.dataset.id;
//   allTodos[id].isDone = !allTodos[id].isDone;

//   localStorage.setItem('todos', JSON.stringify(allTodos));

//   createUI(allTodos, root);
// }

// function handleCompleted(event) {
//   let completed = allTodos.filter((e) => e.isDone);
//   createUI(completed);
// }
// function handleActive() {
//   let active = allTodos.filter((e) => !e.isDone);
//   createUI(active);
// }
// function handleALl() {
//   createUI();
// }

// function createUI(data = allTodos, rootElm = root) {
//   rootElm.innerHTML = '';
//   data.forEach((elm, index) => {
//     let li = document.createElement('li');
//     let inp = document.createElement('input');
//     inp.type = 'checkbox';
//     inp.checked = elm.isDone;
//     inp.setAttribute('data-id', index);
//     inp.addEventListener('input', handleToggle);

//     let p = document.createElement('p');
//     p.innerText = elm.todo;
//     if (elm.isDone == true) {
//       p.classList.add('checked');
//     }
//     let div = document.createElement('div');
//     let span = document.createElement('span');
//     span.innerText = 'X';
//     span.innerText = 'X';
//     span.setAttribute('data-id', index);

//     span.addEventListener('click', deleteTodo);

//     div.append(span);

//     li.append(inp, p, div);
//     root.append(li);

//     item.innerText = `${allTodos.filter((e) => !e.isDone).length} items left`;
//   });
// }
