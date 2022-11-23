<template>
  <div class="component">
    <div class="modal fade" :id="'campaignModalEdit' + campaign?.id" tabindex="-1" aria-labelledby="campaignModalEdit"
      aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content bg-body text-white">
          <div class="modal-header">
            <h5 class="modal-title" id="campaignModalEdit">
              Edit {{ campaign?.name }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click="resetForm()"></button>
          </div>
          <div class="modal-body">
            <form action="submit" class=" " @submit.prevent="editCampaign(campaign.id)">
              <div class="card-body text-start">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control bg-primary text-white" v-model="editable.name" required
                    name="name" placeholder="Name:" maxlength="50" />
                  <label for="name">Name:</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="url" class="form-control bg-primary text-white" v-model="editable.coverImg"
                    name="coverImg" placeholder="Cover Image:" maxlength="10000" />
                  <label for="coverImg">Cover Image:</label>
                </div>
                <div class="form-floating">
                  <textarea type="text" class="form-control textarea-height bg-primary text-white"
                    v-model="editable.desc" name="description" style="resize: none" placeholder="Description:"
                    maxlength="1000"></textarea>
                  <label for="description">Description:</label>
                </div>
                <div class="text-end">
                  <span>{{ editable.desc ? editable.desc.length : 0 }}</span>
                  <span>/ 1000</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn bg-secondary" data-bs-dismiss="modal" @click="resetForm()">
                  Close
                </button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                  Edit this Campaign!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { campaignsService } from "../services/CampaignsService.js";
import { encountersService } from "../services/EncountersService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    campaign: { type: Object, required: true },
  },
  setup(props) {
    let editable = ref({});

    watchEffect(() => {
      editable.value = { ...props.campaign };
    });

    function getDefaults() {
      const defaults = {
        name: editable.value.name,
        coverImg: editable.value.coverImg,
        desc: editable.value.desc,
      };
      return defaults;
    }

    let defaultValues;

    onMounted(() => {
      defaultValues = getDefaults();
    });

    return {
      editable,
      defaultValues,

      async editCampaign(id) {
        try {
          // console.log(props.campaign.id, id);
          await campaignsService.editCampaign(editable.value, id);
        } catch (error) {
          Pop.error(error);
        }
      },
      // TODO currently resets to defaults only if the X or the Close button are used, but not if the modal is clicked outside or escape is used to close it
      resetForm() {
        editable.value.name = defaultValues.name;
        editable.value.coverImg = defaultValues.coverImg;
        editable.value.desc = defaultValues.desc;
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
