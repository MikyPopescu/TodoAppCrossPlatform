import Vue from "vue";
import { uid } from "quasar";

const state = {
  tasks: {
    ID1: {
      name: "Go shopping",
      completed: false,
      dueDate: "15/06/2020",
      dueTime: "18:30"
    },
    ID2: {
      name: "Get the trash",
      completed: false,
      dueDate: "30/06/2020",
      dueTime: "12:30"
    },
    ID3: {
      name: "Eat an apple",
      completed: false,
      dueDate: "15/05/2020",
      dueTime: "16:30"
    }
  },
  search: ""
};

const mutations = {
  updateTask(state, payload) {
    // console.log("payload (from mutation):", payload);
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    // console.log("id: ", id);
    // delete state.tasks[id];
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  setSearch(state, value) {
    state.search = value;
  }
};

const actions = {
  updateTask({ commit }, payload) {
    // console.log("update task action");
    // console.log("payload: ", payload);
    commit("updateTask", payload);
  },
  deleteTask({ commit }, id) {
    commit("deleteTask", id);
  },
  addTask({ commit }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    };
    commit("addTask", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  }
};

const getters = {
  tasksTodo: state => {
    let tasks = {};
    Object.keys(state.tasks).forEach(function(key) {
      let task = state.tasks[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: state => {
    let tasks = {};
    Object.keys(state.tasks).forEach(function(key) {
      let task = state.tasks[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
