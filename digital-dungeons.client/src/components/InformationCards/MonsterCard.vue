<template>
  <!-- DISPLAY CARD -->
  <div class="monster-card text-center text-visible selectable elevation-2" title="See Monster Details"
    data-bs-toggle="modal" :data-bs-target="'#monsterModal' + monster.slug" @click=""
    :style="monster.image ? { backgroundImage: `url(${monster.image})` } : ''">

    <div class="muted-layer bg-transparent">
      <span>{{ monster.name }}</span>
    </div>
  </div>
</template>





<script>
import { Monster } from "../../models/Monster.js";

export default {
  props: {
    monster: { type: Monster, required: true },
  },
  setup() {
    return {};
  },
};
</script>






<style lang="scss" scoped>
.monster-card {
  background-color: black;
  background-color: rgba(0, 0, 0, 0.6);
  height: 12rem;
  width: 10rem;
  border-radius: 0.5rem;
  background-position: center;
  background-size: cover;
  transition: 150ms linear;
}

.monster-card:hover {
  transform: scale(1.1);
}

.bg-transparent {
  background-color: rgba(10, 10, 10, 0.804) !important;
}

.bg-transparent:hover {
  background-color: rgba(10, 10, 10, 0.303) !important;
}

.muted-layer {
  height: 12rem;
  width: 10rem;
  border-radius: 0.5rem;
  display: grid;
  justify-content: center;
  align-content: center;
  padding: 0.5rem;
}
</style>
