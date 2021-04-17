<template>
  <div class="w3-container">
    <h3 class="w3-header w3-blue">Publicação {{ idr }}</h3>
    <table class="w3-table-all">
      <tr v-for="(triplo, i) in dados" :key="i">
        <th>{{ triplo.p }}</th>
        <td>{{ triplo.o }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Pub",

  props: ["idr", "mensagem"],

  data() {
    return {
      dados: null,
    };
  },

  created: function () {
    axios
      .get(
        "http://localhost:8080/nj-server/pubs/" +
          this.idr +
          "?query=select%20%2A%20where%20%7B%20%3Fs%20%3Fp%20%3Fo%20%7D%20limit%20100&infer=true"
      )
      .then((res) => {
        this.dados = res.data;
        console.log(res);
      });
  },
};
</script>
<style>
h3 {
  margin-bottom: 5%;
}
</style>