<template>
  <!-- DISPLAY CARD -->
  <div class="weapon-card text-center text-visible selectable elevation-2 animate__animated animate__fadeIn"
    title="See Weapon Details" data-bs-toggle="modal" :data-bs-target="'#weaponModal' + weapon.slug" @click=""
    :style="weapon.coverImg ? { backgroundImage: `url(${weapon.coverImg})` } : ''">

    <div class="muted-layer bg-transparent ">
      <span>{{ weapon.name }}</span>
    </div>
  </div>
</template>





<script>
import { Weapon } from "../../models/Weapon.js";

export default {
  props: {
    weapon: { type: Weapon, required: true },
  },
  setup(props) {
    return {};
  },
};
</script>






<style lang="scss" scoped>
.weapon-card {
  background-color: black;
  background-color: rgba(0, 0, 0, 0.6);
  height: 12rem;
  width: 10rem;
  border-radius: 0.5rem;
  background-position: center;
  background-size: cover;
  transition: 150ms linear;
}

.weapon-card:hover {
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