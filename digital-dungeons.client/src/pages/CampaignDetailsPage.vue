<template>
  <div class="p-3">
    <div v-if="campaign" class="h00 elevated rounded">
      <div class="text-light h00 glass">
        <section class="row justify-content-between align-content-center">
          <div class="col-md-2 text-center d-flex align-items-center">
            <button v-if="campaign.creatorId == account.id" class="btn btn-primary-outline text-visible"
              data-bs-toggle="modal" :data-bs-target="'#campaignModalEdit' + campaign?.id">
              Edit Campaign
            </button>
          </div>
          <div class="col-5 bg-dark p-2 text-center">
            <div class="bg-secondary text-white rounded">
              <h2 class="morphfont">{{ campaign.name }}</h2>
            </div>
          </div>


          <!-- NOTE Cant input DM's Name because creator of campaign is not populated on campaign -->
          <div class="col-3 bg-dark p-2 pt-3">
            <div class="bg-secondary p-1 rounded">
              {{ campaign.creator.name }}
            </div>
          </div>


          <!-- ADD ENCOUNTER -->
          <div class="col-2 pt-2 rounded">
            <button v-if="campaign.creatorId == account.id" class="btn btn-danger" type="button" data-bs-toggle="modal"
              data-bs-target="#CreateEncounterModal">
              Create Encounter
            </button>
          </div>
          <!-- BUTTONS - IDEAL
          LEAVE BUTTON
          <div>
            <button></button>
          </div>
          JOIN BUTTON
          <div class="col-2">
          <button></button>
          </div> -->
        </section>
        <section class="row">
          <div class="col-6 ps-5">
            <img :src="campaign.coverImg" alt="" class="img-fluid campaignImg rounded ps-3 py-4" />
            <div class="bg-dark p-2 rounded">
              <div class="bg-secondary p-1 rounded">
                <p>{{ campaign.desc }}</p>
              </div>
            </div>
          </div>


          <div class="col-6">
            <div class="bg-dark p-2">
              <div class="bg-secondary p-1">
                <h4 class="border-bottom border-3 border-danger text-danger" v-if="completedEncounters.length > 0">
                  Completed Encounters
                </h4>
                <EncounterCard v-for="e in completedEncounters" :encounter="e" :key="e?.id" :campaign="campaign" />
                <h4 class="border-bottom border-3 border-danger text-danger">
                  Encounters
                </h4>
                <EncounterCard v-for="e in uncompletedEncounters" :encounter="e" :key="e?.id" :campaign="campaign" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>


  <!-- MODAL COMPONENT -->
  <CreateEncounterModal />
  <EditCampaignDetailsModal :campaign="campaign" />
</template>







<script>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { campaignsService } from "../services/CampaignsService.js";
import Pop from "../utils/Pop.js";
import CreateEncounterModal from "../components/CreateEncounterModal.vue";
import EncounterCard from "../components/EncounterCard.vue";
import { encountersService } from "../services/EncountersService.js";
import EditCampaignDetailsModal from "../components/EditCampaignDetailsModal.vue";
export default {
  setup() {
    const route = useRoute();
    async function getCampaignById() {
      try {
        await campaignsService.getCampaignById(route.params.campaignId);
      } catch (error) {
        Pop.error(error);
      }
    }
    async function getEncountersByCampaignId() {
      try {
        await encountersService.getEncountersByCampaignId(
          route.params.campaignId
        );
        // console.log("Getting Encounters");
      } catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      getCampaignById();
      getEncountersByCampaignId();
    });
    return {
      campaign: computed(() => AppState.activeCampaign),
      account: computed(() => AppState.account),
      completedEncounters: computed(() =>
        AppState.encounters.filter((encounters) => encounters.isCompleted)
      ),
      uncompletedEncounters: computed(() =>
        AppState.encounters.filter((encounters) => !encounters.isCompleted)
      ),
    };
  },
  components: { CreateEncounterModal, EncounterCard, EditCampaignDetailsModal },
};
</script>







<style lang="scss" scoped>
.morphfont {
  font-family: "Morpheus";
  src: local("Morphues") url(./fonts/MORPHEUS.TTF) format("truetype");
}

.campaignImg {
  min-width: 100%;
}
</style>
