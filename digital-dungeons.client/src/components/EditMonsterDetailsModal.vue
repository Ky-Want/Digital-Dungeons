<template>
  <!-- Card/toggle that opens the modal below -->
  <div class="monster-card p-3 rounded elevation-2 text-light selectable" title="Edit Monster Details"
    data-bs-toggle="modal" :data-bs-target="'#editMonsterDetailModal' + monster.id" @click="">
    <span>{{ monster.name }}</span>
  </div>

  <div class="modal fade" :id="'editMonsterDetailModal' + monster.slug" tabindex="-1"
    aria-labelledby="editMonsterDetailModal" aria-hidden="true">
    <div class="modal-dialog">
      <form action="submit" class="card text-secondary" @submit.prevent="editMonster(monster.id)">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editMonsterDetailModal">
              {{ monster?.name }}
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <!-- Section -->
          <div class="modal-body">
            <div class="d-flex flex-wrap justify-content-around mb-3">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="editable.nickName" name="nick Name" placeholder="Name:"
                  maxlength="500" />
                <label for="nickName">Name:</label>
              </div>

              <div class="form-floating mb-3">
                <input type="number" class="form-control" v-model="editable.quantity" name="quantity" max="10000"
                  placeholder="Quantity:" />
                <label for="quantity">Quantity:</label>
              </div>
              <div class="form-floating mb-3">
                <input type="number" class="form-control" v-model="editable.hit_points" name="hit_points" max="10000"
                  placeholder="Hit Points:" />
                <label for="hit_points">Hit Points:</label>
              </div>
            </div>
            <!-- Section -->
            <div class="d-flex flex-wrap justify-content-around mb-3">
              <div class="form-floating mb-3">
                <input type="number" class="form-control" v-model="editable.initiative" name="initiative"
                  placeholder="Initiative:" max="100" />
                <label for="initiative">Initiative:</label>
              </div>
              <div class="form-floating mb-3">
                <input type="number" class="form-control" v-model="editable.speed" name="speed" placeholder="Speed:" />
                <label for="speed">Speed:</label>
              </div>
              <div class="form-floating mb-3">
                <input type="number" class="form-control" v-model="editable.armor_class" max="100" name="armor_class"
                  placeholder="Amor Class:" />
                <label for="armor_class">Amor Class:</label>
              </div>
            </div>
            <div class="form-floating mb-3">
              <textarea type="text" class="form-control textarea-height" v-model="editable.desc" name="desc"
                stye="resize: none" placeholder="Description:" maxlength="500"></textarea>
              <label for="desc">Description:</label>
            </div>
          </div>
          <!-- Section -->
          <div class="modal-footer">
            <button class="btn btn-dark" data-bs-dismiss="modal" type="submit">
              Edit this Monster
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Pop from "../utils/Pop";
import { monstersService } from "../services/MonstersService.js";
import { ref, watchEffect } from "vue";
import { Monster } from "../models/Monster.js";

export default {
  props: {
    monster: { type: Monster, required: true },
  },
  setup(props) {
    let editable = ref({});
    watchEffect(() => {
      editable.value = { ...props.monster };
    });

    return {
      editable,

      async editMonster(id) {
        try {
          // console.log(props.monster.id, id);
          await monstersService.editMonster(editable.value, id);
        } catch (error) {
          Pop.error(error);
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.monster-card {
  background-color: rgb(59, 119, 59);
  height: fit-content;
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
}

p {
  margin: 0;
}

.textarea-height {
  height: 10.8rem;
}

.statistics {
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
