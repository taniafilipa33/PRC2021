<template>
  <ConsultaPubs :idr="$route.params.idPub" mensagem="Teste" />
</template>

<script>
import ConsultaPubs from "@/components/ConsultaPubs.vue";

export default {
  components: {
    ConsultaPubs,
  },
};
</script>
