<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span> <span class="incomplete-box"></span> = Incomplete </span>
      <span> <span class="complete-box"></span> = Complete </span>
    </div>
    <FilterTodos />
    <section class="todos">
      <div
        @dblclick="toggleComplete(todo)"
        v-for="todo in allTodos"
        :key="todo.id"
        class="todo"
        :class="{ 'is-complete': todo.completed }"
      >
        {{ todo.title }}
        <div class="close" @click="deleteTodo(todo.id)">&times;</div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FilterTodos from "./FilterTodos.vue";
export default {
  components: {
    FilterTodos,
  },
  computed: mapGetters(["allTodos"]),
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
    toggleComplete(todo) {
      const updatedTodo = {
        ...todo,
        completed: !todo.completed,
      };

      this.updateTodo(updatedTodo);
    },
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}

.close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 0;
  color: red;
  font-size: 24px;
  padding: 10px;
}

@media (min-width: 500px) {
  .todos {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>