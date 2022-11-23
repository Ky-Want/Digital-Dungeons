<template>
  <!-- MODAL -->
  <div class="modal fade" :id="'weaponModal' + weapon.slug" tabindex="-1" aria-labelledby="WeaponDetailsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">

      <!-- background image -->
      <div class="modal-content text-visible bg-secondary h-80"
        :style="weapon.coverImg ? { backgroundImage: `url(${weapon.coverImg})` } : ''">


        <!-- weapon value -->
        <div class="modal-header bg-transparent-modal d-flex align-items-center">
          <h1 class="modal-title fs-3 text-info text-shadow" id="WeaponDetailsModalLabel">
            {{ weapon?.name }}
          </h1>
          <div class="d-flex align-items-center">
            <p class="text-info text-shadow me-1 my-auto">Value:</p>
            <p class=" my-auto">{{ weapon?.cost }}</p>
          </div>
        </div>


        <!-- category -->
        <div class="modal-body bg-transparent-modal d-flex flex-column justify-content-around" v-if="weapon">
          <div class="d-flex flex-wrap justify-content-around mb-3">
            <div>
              <h4 class="statistics text-info">Category</h4>
              <p>{{ weapon.category }}</p>
            </div>
            <div>
              <h4 class="statistics text-info">Weight</h4>
              <p>{{ weapon.weight }}</p>
            </div>
          </div>


          <!-- damage -->
          <div>
            <h4 class="statistics text-info">Damage</h4>
            <div class="d-flex justify-content-around">
              <div class="d-flex">
                <p class="text-info me-1">Roll(s) and Die:</p>
                <p>{{ weapon.damage_dice }}</p>
              </div>
              <div class="d-flex">
                <p class="text-info me-1">Type:</p>
                <p>{{ weapon.damage_type }}</p>
              </div>
            </div>
          </div>


          <!-- properties -->
          <div>
            <h4 v-if="weapon.properties" class="statistics text-info">Properties</h4>
            <h4 v-else class=""></h4>
            <div class="d-flex justify-content-around flex-wrap">
              <div class="" v-for="p in weapon.properties">
                <p class="">{{ p }}</p>
              </div>
            </div>
          </div>
        </div>


        <div class="modal-body bg-transparent-modal" v-else>
          <p>Sorry, there is no weapon data available :(</p>
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
import { Weapon } from "../../models/Weapon.js";

export default {
  props: {
    weapon: { type: Weapon, required: true },
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
  background-color: rgba(10, 10, 10, 0.442) !important;
}

.statistics {
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-shadow {
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px rgb(229, 222, 221);
  font-weight: bold;
  letter-spacing: 0.08rem
    /* Second Color  in text-shadow is the blur */
}

.text-info {
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px rgb(229, 222, 221);
  font-weight: bold;
  letter-spacing: 0.08rem
}

.text-light {
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px rgb(229, 222, 221);
  font-weight: bold;
  letter-spacing: 0.08rem
}

.h-80 {
  height: 80vh;
}
</style>