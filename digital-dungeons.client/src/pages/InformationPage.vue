<template>
  <div class="information-page">
    <div class="container-fluid">
      <div class="row">
        <!-- Information card modals -->
        <SpellModal v-if="category == 'spells'" v-for="s in spells" :key="s.slug" :spell="s" />
        <ArmorModal v-if="category == 'armor'" v-for="a in armor" :key="a.slug" :armor="a" />
        <ClassModal v-if="category == 'classes'" v-for="c in classes" :key="c.slug" :dndClass="c" />
        <MonsterModal v-if="category == 'monsters'" v-for="m in monsters" :key="m.slug" :monster="m" />
        <RaceModal v-if="category == 'races'" v-for="r in races" :key="r.slug" :race="r" />
        <WeaponModal v-if="category == 'weapons'" v-for="w in weapons" :key="w.slug" :weapon="w" />
        <MagicItemModal v-if="category == 'magicitems'" v-for="mi in magicitems" :key="mi.slug" :magicitem="mi" />

        <!-- Buttons -->
        <div class="col-4 text-center upup d-flex flex-column justify-content-between">

          <div>
            <CategoryDropdown :category="category" />
          </div>

          <div>
            <div class="text-center p-2 py-2 elevation-2 m-2 mb-4 card glass selectable">
              <a href="https://www.dndbeyond.com/sources/basic-rules" target="_blank">
                <h3 class="text-info no-select"><i class="mdi mdi-book"></i> RULES</h3>
              </a>
            </div>
            <div class="text-center p-2 py-2 elevation-2 m-2 mb-5 card glass selectable">
              <a href="https://www.masterthedungeon.com/game-mechanics-and-dnd/" target="_blank">
                <h3 class="text-info no-select"><i class="mdi mdi-book-open-variant"></i> GAME MECHANICS</h3>
              </a>
            </div>
          </div>

        </div>
        <div class="col-8 bg-transparent">
          <div class="box">
            <!-- Search Functionality -->
            <SearchPagination />



            <!-- Information Cards -->
            <div class="elem2 scrollable p-3 d-flex flex-wrap gap-5 align-content-start">
              <MonsterCard v-if="category == 'monsters'" v-for="m in monsters" :key="m.slug" :monster="m" />

              <SpellCard v-if="category == 'spells'" v-for="s in spells" :key="s.slug" :spell="s" />

              <RaceCard v-if="category == 'races'" v-for="r in races" :key="r.slug" :race="r" />

              <ClassCard v-if="category == 'classes'" v-for="c in classes" :key="c.slug" :dndClass="c" />

              <MagicItemCard v-if="category == 'magicitems'" v-for="m in magicitems" :key="m.slug" :magicitem="m" />

              <WeaponCard v-if="category == 'weapons'" v-for="w in weapons" :key="w.slug" :weapon="w" />

              <ArmorCard v-if="category == 'armor'" v-for="a in armor" :key="a.slug" :armor="a" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState"
import { ref } from "vue";
import SearchPagination from "../components/SearchPagination.vue";
import CategoryDropdown from "../components/Information/CategoryDropdown.vue";

import MonsterCard from "../components/InformationCards/MonsterCard.vue";
import SpellCard from "../components/InformationCards/SpellCard.vue";
import RaceCard from "../components/InformationCards/RaceCard.vue";
import ClassCard from "../components/InformationCards/ClassCard.vue";
import MagicItemCard from "../components/InformationCards/MagicItemCard.vue";
import WeaponCard from "../components/InformationCards/WeaponCard.vue";
import ArmorCard from "../components/InformationCards/ArmorCard.vue";

import SpellModal from "../components/InfoCardModals/SpellModal.vue";
import ArmorModal from "../components/InfoCardModals/ArmorModal.vue";
import ClassModal from "../components/InfoCardModals/ClassModal.vue";
import MonsterModal from "../components/InfoCardModals/MonsterModal.vue";
import RaceModal from "../components/InfoCardModals/RaceModal.vue";
import WeaponModal from "../components/InfoCardModals/WeaponModal.vue";
import MagicItemModal from "../components/InfoCardModals/MagicItemModal.vue";

export default {
  setup() {
    const editable = ref("")
    return {
      editable,
      monsters: computed(() => AppState.monsters),
      spells: computed(() => AppState.spells),
      races: computed(() => AppState.races),
      classes: computed(() => AppState.classes),
      magicitems: computed(() => AppState.magicitems),
      weapons: computed(() => AppState.weapons),
      armor: computed(() => AppState.armor),
      category: computed(() => AppState.activeCategory),
    };
  },

  components: {
    MonsterCard,
    SpellCard,
    SearchPagination,
    CategoryDropdown,
    RaceCard,
    ClassCard,
    MagicItemCard,
    WeaponCard,
    ArmorCard,
    SpellModal,
    ArmorModal,
    ClassModal,
    MonsterModal,
    RaceModal,
    WeaponModal,
    MagicItemModal
  }
};
</script>






<style lang="scss" scoped>
.information-page {
  height: 100vh;
}

button {
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 2rem;
}

.bg-transparent {
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(7px);
}

.box {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.elem2 {
  flex-grow: 1;
}

.scrollable {
  overflow-y: auto;
}

.upup {
  margin-top: 18vh;
}

.glass {
  border: solid rgba(120, 115, 115, 0.576);
  background-color: rgba(18, 17, 17, 0.764);

  :hover {
    opacity: 0.6;
  }
}

.text-woah {
  color: rgb(96, 190, 234) !important;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.644), 0px 0px 5px rgba(18, 34, 50, 0.678);
}
</style>