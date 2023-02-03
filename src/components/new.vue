<template>
    <div class="new-add-button">
      <!-- Modal trigger button -->
  
      <button @click="openModal = true"><i class="fa-solid fa-plus"></i></button>
  
      <!-- Modal content -->
      <div v-if="openModal" class="modal-background">
        <div class="modal-content">
          <h2>Add Task</h2>
          <form @submit.prevent="addTodo">
            <div class="form-field">
              <label>Text:</label>
              <input type="text" v-model="text" />
            </div>
            <div class="form-field">
              <label>Priority:</label>
              <select v-model="priority">
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
            <div class="form-field">
              <label>Date:</label>
              <input type="date" v-model="date" />
            </div>
            <div class="form-actions">
              <button @click="addTodo">Save</button>
              <button @click="openModal = false">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        openModal: false,
        text: "",
        priority: "low",
        date: "",
      };
    },
    methods: {
      addTodo() {
    const task = {
      id: Math.random(),
      text: this.text,
      done: false,
      priority: this.priority,
      date: this.date,
    };
    this.$store.commit("addTodo", task);
    this.$store.commit("updateTodo", task);
    this.openModal = false;
    this.text = "";
    this.priority = "low";
    this.date = "";
  },
  
    },
  };
  </script>
  
  <style scoped>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 500px;
  }
  
  .form-field {
    margin-bottom: 20px;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: rgb(250, 250, 250);
    color: white;
    cursor: pointer;
    margin-left: 20px;
  }
  .new-add-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5%;
  }
  
  .new-add-button button {
    border: 3px solid #c6c6c6;
    border-radius: 4px;
    color: black;
  }
  .add-form {
    margin-bottom: 40px;
  }
  
  .form-control {
    margin: 20px 0;
  }
  
  .form-control label {
    display: block;
  }
  
  .form-control input {
    width: 100%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
  }
  
  .form-control-check {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .form-control-check label {
    flex: 1;
  }
  .fa-plus {
    color: #c6c6c6;
  }
  .form-control-check input {
    flex: 2;
    height: 20px;
  }
  </style>
