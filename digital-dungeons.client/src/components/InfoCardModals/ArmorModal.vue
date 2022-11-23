<template>
  <!-- MODAL -->
  <div class="modal fade" :id="'armorModal' + armor.slug" tabindex="-1" aria-labelledby="ArmorDetailsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">

      <!-- background image -->
      <div class="modal-content text-visible bg-warning"
        :style="armor.coverImg ? { backgroundImage: `url(${armor.coverImg})` } : ''">
        <div class="modal-header bg-transparent-modal">
          <div class="d-flex justify-content-between align-items-center w-100 px-3">
            <h1 class="modal-title fs-5 m-0" id="ArmorDetailsModalLabel">{{ armor?.name }}</h1>
            <p class="m-0">Value: {{ armor?.cost }}</p>
          </div>

          <!-- <button type="button" class="btn-visible text-visible" data-bs-dismiss="modal" aria-label="Close">
              X
            </button> -->
        </div>


        <div class="modal-body bg-transparent-modal d-flex flex-column align-items-center justify-content-around"
          v-if="armor">
          <div
            class=" flex-grow-1 d-flex flex-column flex-wrap align-items-center justify-content-around gap-3 mb-3 fs-5">
            <div class="text-center">
              <h3 class="statistics">Category</h3>
              <p>{{ armor.category }}</p>
            </div>

            <div class="text-center">
              <h3 class="statistics">Armor Class</h3>
              <p>{{ armor.ac_string }}</p>
            </div>
          </div>


          <div class="flex-grow-1 d-flex flex-wrap flex-column align-items-center justify-content-around gap-3 fs-5">
            <div class="text-center">
              <h3 class="statistics" v-if="armor.strength_requirement">Strength Required</h3>
              <p>{{ armor.strength_requirement }}</p>
            </div>

            <div class="text-center">
              <p v-if="armor.stealth_disadvantage">Stealth Disadvantage</p>
              <!-- <p>{{ armor.stealth_disadvantage}}</p> -->
            </div>
          </div>
        </div>



        <div class="modal-body bg-transparent-modal" v-else>
          <p>Sorry, there is no armor data available :(</p>
        </div>
        <div class="modal-footer bg-transparent-modal">
          <button type="button" class="btn-visible text-visible" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import { Armor } from "../../models/Armor.js";

export default {
  props: {
    armor: { type: Armor, required: true },
  },
  setup() {
    return {}
  }
}
</script>





<style lang="scss" scoped>
.modal-content {
  background-position: center;
  background-size: cover;
}

.bg-transparent-modal {
  background-color: rgba(10, 10, 10, 0.664) !important;
}

.statistics {
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-content {
  height: 70vh;
}

h6 {
  color: var(--info);
}
</style>