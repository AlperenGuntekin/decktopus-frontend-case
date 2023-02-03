<template>
  <div class="container">
    <ul class="todos-list">
      <li class="todo-item" v-for="todo in filteredTodos" :key="todo.id">
        <div class="row">
          <div class="todos-list-checkbox col-md-1">
            <input class="form-check-input" type="checkbox" v-model="todo.done" @change="markItDone(todo)"
              :disabled="todo.isMarkingDone" />
          </div>
          <div class="todos-list-info col-md-8" style="display: flex; flex-direction: column">
            <span class="todo-content" :class="{ done: todo.done, editing: todo.editing }">
              <input v-if="todo.editing" type="text" v-model="todo.text" @blur="updateTodo(todo)"
                @keyup.enter="updateTodo(todo)" />
              <span v-else @click="editTodo(todo)">{{ todo.text }}</span>
            </span>
            <span class="date">{{ todo.date }}</span>
          </div>
          
          <div class="todos-list-crud col-md-2">
            <span class="del-todo" @click="deleteTodo(todo)"><i class="fa-solid fa-trash-can"></i></span>
            <span class="priority" @click.stop="selectedTodo = todo" v-if="selectedTodo !== todo">
              <i v-if="todo.priority === 'high'" class="fa-solid fa-flag"></i>
              <i v-else-if="todo.priority === 'medium'" class="fa-solid fa-bars"></i>
              <i v-else class="fa-chevron-up"></i> {{ todo.priority }}
            </span>
            <div v-if="selectedTodo === todo">
              <select v-model="selectedTodo.priority">
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
              </select>
              <button @click="savePriorityChange">Save</button>
            </div>
          </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import navbar from "./navbar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    navbar,
  },
  name: "Todos",
  data() {
    return {
      filteredTodos: this.$store.state.todos,
      showPriorities: false,
      selectedTodo: null,
      selectedFilter: "All",
      selectedPriority: 'all',
      selectedDate: 'newToOld',
      selectedStatus: 'all',
    };
  },
  methods: {
    openPriorityModal(todo) {
      this.selectedTodo = todo;
    },
    closePriorityModal() {
      this.selectedTodo = null;
    },
    savePriorityChange() {
      this.closePriorityModal();
    },
    changePriority(todo, priority) {
      todo.priority = priority;
      this.$store.commit('updateTodo', todo);
    },
    updateTodo(state, updatedTodo) {
      state.todos = state.todos.map(todo => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    },
    markItDone(todo) {
      if (!todo.hasOwnProperty("done")) {
        todo.done = false;
      }
      this.$store.commit("markItDone", todo);
    },
    editTodo(todo) {
      todo.editing = true;
    },
    changePriority(priority) {
      this.$emit("change", priority);
    },
    updateTodo(todo) {
      todo.editing = false;
    },
    deleteTodo(todo) {
      this.$store.commit("deleteTodo", todo.id);
    },
    filteredTodos(todo) {
      this.$store.commit("filteredTodos", todos)
    }
  },
  computed: {
    ...mapGetters(["filteredTodos"]),
  },
};
</script>
<style lang="sass" scoped>

.todos-list-checkbox 
  margin-left: -8%
  display: flex
  align-items: center
  

.form-check-input[type=checkbox] 
    border-radius: 0.25em
    width: 25px
    height: 25px

.date
  font-style: normal
  font-weight: 400
  font-size: 14px
  line-height: 19px
  color: #C6C6C6

.todo-item
  border-bottom: 2px solid #C6C6C6
.todos-list-crud
  margin-left: 8%
  display: flex
  align-items: center
.form-check-input:checked
  background-color: #C6C6C6
  border-color: #C6C6C6

.container
  width: 100%
  margin: 0 auto

.todos-list
  list-style: none
  text-align: left

.todo-item
  padding: 10px
  cursor: pointer

.todo-content
  font-size: 20px
  line-height: 1.5
  transition: font-weight .5s ease-in-out
  &:hover
    font-weight: bold

.del-todo
  color: #ed8060
  font-size: 14px
  float: right
  &:hover
    color: #C6C6C6
    font-weight: normal

.priority
  float: right
  margin-left: 30px
  

.del-todo[data-v-d81acb09] 
    color: #c6c6c6
    font-size: 22px
    float: right

.done
  &:hover
    font-weight: normal

    .priority
      padding-left: 10px
      color: blue
</style>