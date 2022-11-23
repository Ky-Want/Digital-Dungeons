<template>
  <!-- NOTE MODAL -->
  <div class="modal fade" :id="'magicitemModal' + magicitem.slug" tabindex="-1"
    aria-labelledby="MagicitemDetailsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content text-visible bg-warning"
        :style="magicitem.coverImg ? {backgroundImage: `url(${magicitem.coverImg})`} : ''">


        <!-- Name + rarity -->
        <div class="modal-header bg-transparent-modal">
          <div class="d-flex justify-content-between align-items-center w-100 px-3 gap-3">
            <h3 class="modal-title m-0" id="MagicitemDetailsModalLabel">{{ magicitem?.name }}</h3>
            <p class="m-0">{{magicitem?.rarity}}</p>
          </div>
        </div>

        <!-- Description -->
        <div class="modal-body bg-transparent-modal d-flex align-items-center flex-wrap scrollable" v-if="magicitem">
          <div class="text-center w-100 pb-2">
            <h5>{{magicitem.requires_attunement.toUpperCase()}}</h5>
          </div>
          <Markdown :source="magicitem.desc" />
        </div>

        <div class="modal-body bg-transparent-modal" v-else>
          <p>Sorry, there is no magicitem data available :(</p>
        </div>
        <div class="modal-footer d-flex justify-content-between align-items-center gap-3 px-3 bg-transparent-modal">
          <p class="m-0">{{magicitem.type}}</p>
          <button type="button" class="btn-visible text-visible" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
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
  setup() {
    return {}
  },
  components: { Markdown }

}

</script>


<style lang="scss" scoped>
.modal-body {
  max-height: 60vh;
}

.modal-content {
  background-position: center;
  background-size: cover;
}

.bg-transparent-modal {
  background-color: rgba(10, 10, 10, 0.75) !important;
}

.scrollable {
  overflow-y: auto;
}

.modal-xl {
  width: 50vw !important;
}
</style>