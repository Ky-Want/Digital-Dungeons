<template>
  <!-- DISPLAY CARD -->
  <div class="spell-card text-center text-visible selectable elevation-2 animate__animated animate__fadeIn"
    title="See Spell Details" data-bs-toggle="modal" :data-bs-target="'#spellModal' + spell.slug" @click=""
    :style="spell.schoolImg ? { backgroundImage: `url(${spell.schoolImg})` } : ''">

    <div class="muted-layer bg-transparent text-visible">
      <span>{{ spell.name }}</span>
    </div>
  </div>
</template>




<script>
import { Spell } from '../../models/Spell.js';

export default {
  props: {
    spell: { type: Spell, required: true }
  },
  setup(props) {
    return {

    };
  },
};
</script>




<style lang="scss" scoped>
.text-visible {
  color: rgb(225, 0, 255) !important;
}

.text-visible:hover {
  color: rgb(225, 0, 255) !important;
}

.spell-card {
  background-color: black;
  background-color: rgba(0, 0, 0, 0.6);
  height: 12rem;
  width: 10rem;
  border-radius: 0.5rem;
  background-position: center;
  background-size: cover;
  transition: 150ms linear;
}

.spell-card:hover {
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