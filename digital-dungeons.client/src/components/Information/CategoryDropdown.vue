<template>
  <div class="component">
    <div class="dropdown-center">
      <button class="btn-visible back dropdown-toggle text-visible m-2 fs-4" type="button" data-bs-toggle="dropdown"
        aria-expanded="false">{{ category ? (category === 'magicitems' ? 'MAGIC ITEMS' :
            category.toUpperCase()) :
            "Select Category"
        }}</button>
      <ul class="dropdown-menu bg-secondary no-select p-3 text-center">
        <li class="dropdown-item rounded" @click="changeCategory('monsters')">
          <h4>
            Monsters
          </h4>
        </li>
        <li class="dropdown-item rounded" @click="changeCategory('spells')">
          <h4>
            Spells
          </h4>
        </li>
        <li class="dropdown-item rounded" @click="changeCategory('races')">
          <h4>
            Races
          </h4>
        </li>
        <li class="dropdown-item rounded" @click="changeCategory('classes')">
          <h4>
            Classes
          </h4>
        </li>
        <li class="dropdown-item rounded" @click="changeCategory('magicitems')">
          <h4>
            Magic Items
          </h4>
        </li>
        <li class="dropdown-item rounded" @click="changeCategory('weapons')">
          <h4>
            Weapons
          </h4>
        </li>
        <li class="dropdown-item rounded" @click="changeCategory('armor')">
          <h4>
            Armor
          </h4>
        </li>
        <!-- FIXME add these searches -->
        <!-- <li class="dropdown-item" @click="changeCategory('')">
                Campaigns
              </li>
              <li class="dropdown-item" @click="changeCategory('')">
                Encounters
              </li> -->
      </ul>
    </div>
  </div>
</template>




<script>
import { AppState } from '../../AppState.js'
import { informationService } from '../../services/InformationService.js'
import Pop from '../../utils/Pop.js'

export default {
  props: {
    category: { type: String, required: true }
  },
  setup() {
    return {
      async changeCategory(category) {
        try {
          informationService.setActiveCategory(category)
          await informationService.getApiInfo(category)
        }
        catch (error) {
          AppState.activeCategory = null
          Pop.error(error.message, "[changeCategory]")
        }
      }
    }
  }
}
</script>





<style lang="scss" scoped>
h4 {
  color: rgb(199, 219, 228) !important;
  text-shadow: 1px 1px rgba(23, 22, 22, 0.644), 0px 0px 5px rgba(14, 104, 195, 0.888);
}
</style>