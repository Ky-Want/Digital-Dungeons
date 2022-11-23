<template>
  <!-- DISPLAY CARD -->
  <div class="magicitem-card text-center text-visible selectable elevation-2 animate__animated animate__fadeIn"
    title="See Magicitem Details" data-bs-toggle="modal" :data-bs-target="'#magicitemModal' + magicitem.slug" @click=""
    :style="magicitem.coverImg ? { backgroundImage: `url(${magicitem.coverImg})` } : ''">

    <div class="muted-layer bg-transparent">
      <span>{{ magicitem.name }}</span>
    </div>
  </div>
</template>

<script>
import { MagicItem } from "../../models/MagicItem.js";
import Markdown from 'vue3-markdown-it'

export default {
  props: {
    magicitem: { type: MagicItem, required: true },
  },
  setup(props) {
    return {};
  },
  components: { Markdown }
};
</script>



<style lang="scss" scoped>
.magicitem-card {
  background-color: black;
  background-color: rgba(0, 0, 0, 0.6);
  height: 12rem;
  width: 10rem;
  border-radius: 0.5rem;
  background-position: center;
  background-size: cover;
  transition: 150ms linear;
}

.magicitem-card:hover {
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
