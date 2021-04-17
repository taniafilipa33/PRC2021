<template>
  <div class="w3-container">
    <h3>Autores:</h3>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>Sigla</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in auts" v-bind:key="a.s" @click="goAuts(a.s)">
          <td>{{ a.s }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Auts",

  data() {
    return {
      auts: null,
    };
  },

  created: function () {
    axios
      .get("/nj-server/authors")
      .then((res) => {
        this.auts = res.data;
        console.log("oi");
        console.log(this.auts);
      })
      .catch((e) => console.log("ERROR in get authors:" + e));
  },

  methods: {
    goAuts: function (nome) {
      this.$router.push("/auts/" + nome);
    },
  },
};
</script>
<style>
h3 {
  margin-bottom: 5%;
}
</style>