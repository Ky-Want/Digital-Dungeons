<template>
  <div class="container-fluid">
    <div class="row AETitle" v-if="activeEncounter">
      <div class="col-md-4 d-flex justify-content-between align-items-center">
        <router-link :to="{ name: 'CampaignDetails', params: { campaignId: route.params.campaignId }} ">
          <span>Go Back</span>
        </router-link>
      </div>
      <div class="col-md-4 d-flex justify-content-center align-items-center">
        <span class="text-primary fs-3">{{ activeEncounter?.name }}</span>
      </div>
      <div class="col-md-4 d-flex justify-content-between align-items-center" v-if="activeEncounter?.creatorId === account?.id">
        <button class="text-primary btn" data-bs-toggle="modal"
          :data-bs-target="'#encounterModal' + activeEncounter?.id">
          Edit Encounter
        </button>
        <button class="btn text-primary" data-bs-toggle="modal" data-bs-target="#addCharacterModal">
          Add Character
        </button>
        <button class="btn text-primary" @click.stop="rollInitiatives()">
          Roll Initiatives
        </button>
      </div>
    </div>
    <section class="row content">
      <div class="col-12 img-col d-flex">
        <img :src="activeEncounter?.coverImg" alt="" class="img-fluid encounterImage rounded" />
        <p class="p-5 text-primary">{{ activeEncounter?.desc }}</p>
      </div>
      <div class="col-md-4 bg-transparent monster-col box">
        <SearchPagination />
        <div class="elem2 scrollable">
          <MonsterDetailsModal v-for="m in monsters" :key="m.slug" :monster="m" />
        </div>
      </div>
      <div class="col-md-8 monster-col">
        <div class="d-flex flex-wrap gap-3 pt-3 scrollable h-100 align-content-start">
          <ActiveEncounterMonsters v-for="m in activeMonsters" :key="m.id" :monster="m" />
        </div>
      </div>
    </section>

    <div v-if="activeEncounter">
      <EditEncounterDetailsModal :encounter="activeEncounter" />
    </div>

    <CreateEncounterModal />
    <CreateCharacterModal />
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { encountersService } from "../services/EncountersService.js";
import { informationService } from "../services/InformationService.js";
import { monstersService } from "../services/MonstersService.js";
import CreateEncounterModal from "../components/CreateEncounterModal.vue";
import EditEncounterDetailsModal from "../components/EditEncounterDetailsModal.vue";
import Pop from "../utils/Pop.js";
import EncounterCard from "../components/EncounterCard.vue";
import MonsterCard from "../components/InformationCards/MonsterCard.vue";
import MonsterDetailsModal from "../components/MonsterDetailsModal.vue";
import AccountPage from "./AccountPage.vue";
import ActiveEncounterMonsters from "../components/ActiveEncounterMonsters.vue";
import SearchPagination from "../components/SearchPagination.vue";
import CreateCharacterModal from "../components/CreateCharacterModal.vue";

export default {
  setup() {
    const route = useRoute();

    async function getEncounterById() {
      try {
        await encountersService.getEncounterById(
          route.params.campaignId,
          route.params.encounterId
        );
      } catch (error) {
        Pop.error(error);
      }
    }

    async function getApiMonsters() {
      try {
        informationService.setActiveCategory("monsters");
        await informationService.getApiInfo("monsters");
      } catch (error) {
        Pop.error(error, ["gettingMonsters"]);
      }
    }

    async function getMonstersByEncounterId() {
      try {
        await monstersService.getMonstersByEncounterId(
          route.params.encounterId
        );
      } catch (error) {
        Pop.error(error);
      }
    }

    onMounted(() => {
      getEncounterById();
      getApiMonsters();
      getMonstersByEncounterId();
    });

    onBeforeRouteLeave(() => {
      AppState.monsters = []
      AppState.activeCategory = null
    })

    return {
      route,
      campaigns: computed(() => AppState.campaigns),
      account: computed(() => AppState.account),
      encounter: computed(() => AppState.encounters),
      activeEncounter: computed(() => AppState.activeEncounter),
      activeCampaign: computed(() => AppState.activeCampaign),
      monsters: computed(() => AppState.monsters),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      category: computed(() => AppState.activeCategory),
      activeMonsters: computed(() =>
        AppState.activeEncounterMonsters.sort(
          (a, b) => b.initiative - a.initiative
        )
      ),

      async rollInitiatives() {
        try {
          await monstersService.rollInitiatives(route.params.encounterId);
        } catch (error) {
          Pop.error(error);
        }
      },
      async addCharacter() {
        try {
          await monstersService.addCharacter(req.body);
        } catch (error) {
          Pop.error(error);
        }
      },
    };
  },

  components: {
    CreateEncounterModal,
    EncounterCard,
    MonsterCard,
    MonsterDetailsModal,
    AccountPage,
    ActiveEncounterMonsters,
    SearchPagination,
    EditEncounterDetailsModal,
    CreateCharacterModal
  },
};
</script>

<style lang="scss" scoped>
.AETitle {
  background-color: rgba(105, 19, 102, 0.505);
  border-top: 6px solid;
  border-bottom: 6px solid;
  border-color: rgba(119, 19, 125, 0.749);
  font-family: "Morpheus";
  src: local("Morphues") url(./fonts/MORPHEUS.TTF) format("truetype");
  height: 7vh;
}

.encounterImage {
  height: 100%;
  padding-left: 4rem;
  padding-top: 1rem;
}

.content {
  height: 93vh;
}

.img-col {
  height: 30vh;
}

.monster-col {
  height: 63vh;
}

.box {
  display: flex;
  flex-direction: column;
}

.elem2 {
  flex-grow: 1;
}

.scrollable {
  overflow-y: auto;
}

.h-100 {
  height: 100%;
}
</style>
