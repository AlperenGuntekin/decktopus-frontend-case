
import { createStore } from "vuex";
const store = createStore({
  state: {
    selectedPriority: "all",
    selectedDate: "newToOld",
    selectedStatus: "all",
    showAddTaskModal: false,
    newTask: {
      title: "",
      priority: "low",
      date: "",
      done: false,
    },
    count: 0,
    todos: [  
      {
        id: 1,
        text: "Fast site speed",
        done: false,
        priority: "low",
        date: new Date("2023-11-08"),
      },
      {
        id: 2,
        text: "SEO friendly URLs",
        done: false,
        priority: "medium",
        date: new Date("2023-10-07"),
      },
      {
        id: 3,
        text: "Good internal links",
        done: true,
        priority: "high",
        date: new Date("2023-11-12"),
      },
      {
        id: 4,
        text: "Structured data",
        done: false,
        priority: "high",
        date: new Date("2022-02-03"),
      },
      {
        id: 5,
        text: "Social media strategy",
        done: false,
        priority: "high",
        date: new Date("2024-10-08"),
      },
    ],
    statuses: [
      { id: 1, value: "all" },
      { id: 2, value: "notDone" },
      { id: 3, value: "done" },
    ],
    selectedPriorityId: 4,
    priorities: [
      { id: 1, value: "low" },
      { id: 2, value: "medium" },
      { id: 3, value: "high" },
      { id: 4, value: "all" },
    ],
    dates: [
      { id: 1, value: "highToLow" },
      { id: 2, value: "lowToHigh" },
      { id: 3, value: "newToOld" },
      { id: 4, value: "oldToNew" },
    ],
    filter: "",
  },
  mutations: {
    SET_SELECTED_STATUS(state, status) {
      state.selectedStatus = status;
    },
    SET_SELECTED_PRIORITY(state, priority) {
      state.selectedPriority = priority;
    },
    SET_SELECTED_DATE(state, date) {
      state.selectedDate = date;
    },
    markItDone: function (state, index) {
      state.todos[index].done = !state.todos[index].done;
    },
    addTodo(state, task) {
      state.todos.push(task);
    },
    updateTodo(state, updatedTodo) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    },
    changePriority: function (state, payload) {
      let todo = state.todos.find((todo) => todo.id === payload.todoId);
      todo.priority = payload.priority;
    },
    deleteTodo(state, todoId) {
      const todoIndex = state.todos.findIndex((todo) => todo.id === todoId);
      state.todos.splice(todoIndex, 1);
    },
    updateTask: (state, payload) => {
      let todo = state.todos.find((todo) => todo.id === payload.id);
      todo.text = payload.text;
    },
    toggleTaskStatus: (state, todoId) => {
      let todo = state.todos.find((todo) => todo.id === todoId);
      todo.done = !todo.done;
    },
    updatePriority(state, payload) {
      let todo = state.todos.find((t) => t.id === payload.id);
      todo.priority = payload.priority;
    },
  },
  getters: {
    todos: (state) => state.todos,
    selectedStatus: (state) => state.selectedStatus,
    selectedPriority: (state) => state.selectedPriority,
    selectedDate: (state) => state.selectedDate,
    statuses: (state) => state.statuses,
    priorities: (state) => state.priorities,
    dates: (state) => state.dates,
    filteredTodos: (state) => {
      let todos = [...state.todos];
      function comparePriority(a, b) {
        const priorities = {
          low: 1,
          medium: 2,
          high: 3
        };
        return priorities[b.priority] - priorities[a.priority];
      }
      // Filter by status
      if (state.selectedStatus !== "all") {
        todos = todos.filter(
          (todo) => todo.done === (state.selectedStatus === "done")
        );
      }
      // Sort by priority
      if (state.selectedPriority !== "all") {
        if (state.selectedPriority == "high") {
          todos = todos.filter(todo => todo.priority === "high");
        }
        else if (state.selectedPriority == "medium") {
          todos = todos.filter(todo => todo.priority === "medium");
        }
        else {
          todos = todos.filter(todo => todo.priority === "low");
        }
      }
      // Sort by date
      if (state.selectedDate === "newToOld") {
        todos = todos.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      } else {
        todos = todos.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
      }
      if (state.selectedDate === "highToLow") {
        todos = todos.sort(comparePriority);
      } else if (state.selectedDate === "lowToHigh") {
        todos = todos.sort((a, b) => comparePriority(b, a));
      }
      return todos;
    },
    thisTodo: (state) => (todoId) => {
      return state.todos.find((todo) => todo.id === todoId);
    },
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    activeTodos: (state) => {
      return state.todos.filter((todo) => !todo.done);
    },
    thisTodo: (state) => (id) => {
      return state.todos.find((todo) => todo.id === id);
    },
  },
  actions: {
    setSelectedStatus({ commit }, status) {
      commit("SET_SELECTED_STATUS", status);
    },
    setSelectedPriority({ commit }, priority) {
      commit("SET_SELECTED_PRIORITY", priority);
    },
    setSelectedDate({ commit }, date) {
      commit("SET_SELECTED_DATE", date);
    },
    changePriority({ commit }, payload) {
      commit("changePriority", payload);
    },
    addTodo({ commit }, todo) {
      commit("addTodo", todo);
    },
    updateTodo({ commit }, updatedTodo) {
      commit("updateTodo", updatedTodo);
    },
    setTodos({ commit }, todos) {
      commit("SET_TODOS", todos);
    },
    changeFilter({ commit }, filter) {
      commit("setFilter", filter);
    },
  },
});
export default store;
