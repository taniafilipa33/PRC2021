<template>
  <ConsultaAuts :idr="$route.params.idAut" mensagem="Teste" />
</template>

<script>
import ConsultaAuts from "@/components/ConsultaAuts.vue";

export default {
  components: {
    ConsultaAuts,
  },
};
</script>
