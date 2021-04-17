<template>
  <div class="w3-container">
    <h3>Publicações:</h3>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>Título</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in pubs" v-bind:key="p.titulo" @click="goRepo(p.titulo)">
          <td>{{ p.titulo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Pubs",

  data() {
    return {
      pubs: null,
    };
  },

  created: function () {
    axios
      .get("/nj-server/pubs")
      .then((res) => {
        this.pubs = res.data;
        console.log(this.pubs);
      })
      .catch((e) => console.log("ERROR in get pubs:" + e));
  },

  methods: {
    goRepo: function (nome) {
      this.$router.push("/pubs/" + nome);
    },
  },
};
</script>
<style>
h3 {
  margin-bottom: 5%;
}
</style>