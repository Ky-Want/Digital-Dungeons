<template>
  <div class="component"></div>
  <div class="modal fade" id="CreateEncounterModal" tabindex="-1" aria-labelledby="CreateEncounterModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-danger text-light elevation-1">
        <div class="modal-header">
          <h5 class="modal-title" id="CreateEncounterModalLabel">
            New Encounter
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body ">
          <form action="submit" class="" @submit.prevent="addEncounter()">
            <div class="card-body  text-start">
              <div class="form-floating mb-3">
                <input type="text" class="form-control bg-secondary text-white" v-model="editable.name" required
                  name="name" placeholder="Name:" maxlength="50" />
                <label for="name">Name:</label>
              </div>
              <div class="form-floating mb-3">
                <input type="url" class="form-control bg-secondary text-white" v-model="editable.coverImg"
                  name="coverImg" placeholder="Cover Image:" maxlength="10000" />
                <label for="coverImg">Cover Image:</label>
              </div>
              <div class="form-floating">
                <textarea type="text" class="form-control textarea-height bg-secondary text-white"
                  v-model="editable.desc" name="description" style="resize: none" placeholder="Description:"
                  maxlength="500"></textarea>
                <label for="description">Description:</label>
              </div>
              <div class="text-end">
                <span>{{ editable.desc ? editable.desc.length : 0 }}</span>
                <span>/ 500</span>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                Create An Encounter!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { encountersService } from "../services/EncountersService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute();
    let editable = ref({});
    return {
      editable,
      async addEncounter() {
        try {
          let encounter = editable.value;
          encounter.campaignId = route.params.campaignId;
          await encountersService.addEncounterToCampaign(encounter);
          editable.value = {};
        } catch (error) {
          Pop.error(error);
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.textarea-height {
  height: 10.8rem;
}
</style>
