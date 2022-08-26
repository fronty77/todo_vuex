import axios from "axios";

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const actions = {
  fetchTodos: async ({ commit }) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    commit("setTodos", response.data);
  },
  addNewTodo: async ({ commit }, title) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );

    commit("newTodo", response.data);
  },
  deleteTodo: async ({ commit }, id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit("removeTodo", id);
  },
  filterTodos: async ({ commit }, event) => {
    const limit = parseInt(
      event.target.options[event.target.selectedIndex].innerText,
      10
    );

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    commit("setTodos", response.data);
  },
  updateTodo: async ({ commit }, updatedTodo) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo}`
    );

    commit("updateLocalTodo", response.data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, newData) => state.todos.unshift(newData),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => id !== todo.id)),
  updateLocalTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);

    if (index > 0) {
      state.todos.splice(index, 1, updatedTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
