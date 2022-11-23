<template>
  <!-- NOTE MODAL -->
  <div class="modal fade" :id="'raceModal' + race.slug" tabindex="-1" aria-labelledby="RaceDetailsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content text-visible bg-warning"
        :style="race.coverImg ? {backgroundImage: `url(${race.coverImg})`} : ''">

        <div class="modal-header bg-transparent-modal">
          <h3 class="modal-title" id="RaceDetailsModalLabel">
            {{ race?.name }}
          </h3>
        </div>


        <div class="modal-body bg-transparent-modal scrollable" v-if="race">
          <div class="d-flex flex-wrap mb-3">
            <div>
              <!-- <p>{{ race.age}}</p> -->
              <Markdown :source="race.age" />
            </div>
            <div>
              <!-- <p>{{ race.alignment}}</p> -->
              <Markdown :source="race.alignment" />
            </div>
            <div>
              <!-- <p>{{ race.speed_desc}}</p> -->
              <Markdown :source="race.speed_desc" />
            </div>
            <div>
              <!-- <p>{{ race.languages}}</p> -->
              <Markdown :source="race.languages" />
            </div>
            <div>
              <!-- <p>{{ race.vision}}</p> -->
              <Markdown :source="race.vision" />
            </div>
            <div>
              <!-- <p>{{ race.traits}}</p> -->
              <Markdown :source="race.traits" />
            </div>
          </div>
        </div>


        <div class="modal-body bg-transparent-modal" v-else>
          <p>Sorry, there is no race data available :(</p>
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
import { Race } from "../../models/Race.js";
import Markdown from 'vue3-markdown-it'

export default {
  props: {
    race: { type: Race, required: true },
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

.scrollable {
  overflow-y: auto;
  max-height: 70vh;
}
</style>