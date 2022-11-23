<template>
  <!-- NOTE MODAL -->
  <!-- Name and image, should be fine -->
  <div class="modal fade" :id="'dndClassModal' + dndClass.slug" tabindex="-1"
    aria-labelledby="DndClassDetailsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg h-80">
      <div class="modal-content text-visible bg-warning"
        :style="dndClass.coverImg ? {backgroundImage: `url(${dndClass.coverImg})`} : ''">

        <div class="modal-header bg-transparent-modal">
          <h1 class="modal-title fs-5" id="DndClassDetailsModalLabel">
            {{ dndClass?.name }}
          </h1>
        </div>




        <!-- Class details -->
        <div class="modal-body bg-transparent-modal scrollable" v-if="dndClass">
          <div class="flex-wrap mb-3">

            <!-- Hit points -->
            <div>
              <h4 class="statistics">Hit Points</h4>
              <p>Hit dice: {{dndClass.hit_dice}}</p>
              <p>HP at first: {{dndClass.hp_at_1st_level}}</p>
              <p>HP at higher levels: {{dndClass.hp_at_higher_levels}}</p>
            </div>
            <br>

            <!-- Proficiencies -->
            <br>
            <div>
              <h4 class="statistics">Proficiencies</h4>
              <p>Armor: {{dndClass.prof_armor}}</p>
              <p>Weapons: {{dndClass.prof_weapons}}</p>
              <p>Tools: {{dndClass.prof_tools}}</p>
              <p>Saving Throws: {{dndClass.prof_saving_throws}}</p>
              <p>Skills: {{dndClass.prof_skills}}</p>
            </div>
            <br>


            <!-- Equipment -->
            <br>
            <div>
              <h4 class="statistics">Equipment</h4>
              <Markdown class="" :source="dndClass.equipment" />
            </div>
            <br>


            <!-- Description -->
            <br>
            <div>
              <h6 class="statistics">Description</h6>
              <Markdown class="class-details" :source="dndClass.desc" />
            </div>
            <br>
          </div>
        </div>


        <div class="modal-body bg-transparent-modal" v-else>
          <p>Sorry, there is no dndClass data available :(</p>
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
import { DndClass } from "../../models/DndClass.js";
import Markdown from 'vue3-markdown-it'

export default {
  props: {
    dndClass: { type: DndClass, required: true },
  },
  setup() {
    return {}
  },
  components: { Markdown }
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

.h-80 {
  max-height: 80vh;
}

.scrollable {
  max-height: 60vh;
  overflow-y: auto;
}
</style>