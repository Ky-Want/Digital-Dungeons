<template>
  <div class="d-flex justify-content-center">
    <div class="monster-card text-center text-visible selectable animate__animated animate__fadeIn"
      title="See Monster Details" data-bs-toggle="modal" :data-bs-target="'#monsterModal' + monster.id" @click=""
      :style="monster.image ? { backgroundImage: `url(${monster.image})` } : ''">
      <div class="muted-layer bg-transparent">
        <div>
          <span>HP: {{ monster.hit_points }}</span>
        </div>
        <div class="w-100 d-flex justify-content-center">
          <span class="text-visible">{{ monster.nickName }} </span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Q: {{ monster.quantity }}</span>
          <span>I: {{ monster.initiative }}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" :id="'monsterModal' + monster.id" tabindex="-1" aria-labelledby="MonsterDetailsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" v-if="monster.characterType === 'monster'">
      <div class="modal-content text-visible"
        :style="monster.image ? { backgroundImage: `url(${monster.image})` } : ''">
        <div class="modal-header bg-transparent-modal">
          <h1 class="modal-title text-info fs-5" id="MonsterDetailsModalLabel">
            {{ monster?.name }}
          </h1>
          <div v-if="monster.challenge_rating" class="d-flex align-items-center gap-3">
            <p class="text-info text-shadow me-1 my-auto">Challenge Rating:</p>
            <p class=" my-auto">{{ monster.challenge_rating }}</p>
            <button type="button" class="btn-visible text-visible" data-bs-dismiss="modal" aria-label="Close">X</button>
          </div>
        </div>
        <div class="modal-body bg-transparent-modal scrollable" v-if="monster">
          <!-- Monster Details -->
          <!-- hide place fxn implementation -->
          <div class="modal-body" v-if="hidden == false">


            <!-- GENERAL -->
            <div v-if="monster.characterType == monster">
              <h4 class="statistics text-info">General</h4>
              <div class="d-flex justify-content-evenly">
                <div class="text-center">
                  <span class="d-flex">
                    <p class="me-1 text-info">Type:</p>
                    <p>{{ monster.type }} </p>
                  </span>
                  <span class="d-flex">
                    <p class="me-1 text-info">Alignment:</p>
                    <p>{{ monster.alignment }} </p>
                  </span>
                </div>
                <div class="text-center">
                  <span class="d-flex">
                    <p class="text-info me-1">Size:</p>
                    <p>{{ monster.size }}</p>
                  </span>
                  <div class="d-flex">
                    <span class="d-flex">
                      <p class="text-info me-1">HP:</p>
                      <p class="me-2">{{ monster.hit_points }}</p>
                    </span>
                    <p class="me-1 text-info">Hit Dice:</p>
                    <p class="">{{ monster.hit_dice }}</p>
                  </div>
                </div>
              </div>

              <!-- STUB SPEED -->
              <button class="btn selectable" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSpeed"
                aria-expanded="false" aria-controls="collapseSpeed">
                <h5 class="text-woah">Speed</h5>
              </button>
              <div class="collapse" id="collapseSpeed">
                <div class="d-flex justify-content-around">
                  <!-- NOTE Speed is weird, for help ask Talor -->
                  <div v-for="(value, property) in monster.speed" :key="property">
                    <span class="d-flex">
                      <p class="text-info me-1">{{ property }}:</p>
                      <p>{{ value }}{{ typeof value == 'number' ? 'ft' : '' }}</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>


            <!-- INFO -->
            <h4 class="statistics text-info">Data</h4>
            <div>


              <!-- STATS -->
              <button class="btn selectable" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStats"
                aria-expanded="false" aria-controls="collapseStats">
                <h5 class="text-woah">Stats</h5>
              </button>
              <div class="collapse" id="collapseStats">
                <div class="d-flex justify-content-around">
                  <span class="d-flex" title="Strength">
                    <p class="me-1 text-info">Str:</p>
                    <p>{{ monster.strength }}</p>
                  </span>
                  <span class="d-flex" title="Dexterity">
                    <p class="me-1 text-info">Dex:</p>
                    <p>{{ monster.dexterity }}</p>
                  </span>
                  <span class="d-flex" title="Constitution">
                    <p class="me-1 text-info">Con:</p>
                    <p>{{ monster.constitution }}</p>
                  </span>
                  <span class="d-flex" title="Intelligence">
                    <p class="me-1 text-info">Int:</p>
                    <p>{{ monster.intelligence }}</p>
                  </span>
                  <span class="d-flex" title="Wisdom">
                    <p class="me-1 text-info">Wis:</p>
                    <p>{{ monster.wisdom }}</p>
                  </span>
                  <span class="d-flex" title="Charisma">
                    <p class="me-1 text-info">Cha:</p>
                    <p>{{ monster.charisma }}</p>
                  </span>
                </div>
              </div>


              <!-- SAVES -->
              <div
                v-if="monster.strength_save || monster.dexterity_save || monster.constitution_save || monster.intelligence_save || monster.wisdom_save || monster.charisma_save">
                <button class="btn selectable" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSaves"
                  aria-expanded="false" aria-controls="collapseSaves" title="Saving Dice Rolls">
                  <h5 class="text-woah">Save DC</h5>
                </button>
              </div>
              <div class="collapse" id="collapseSaves">
                <div class="d-flex justify-content-around">
                  <span v-if="monster.strength_save" class="d-flex" title="Strength Save">
                    <p class="me-1 text-info">Str:</p>
                    <p>{{ monster.strength_save }}</p>
                  </span>
                  <span v-if="monster.dexterity_save" class="d-flex" title="Dexterity Save">
                    <p class="me-1 text-info">Dex:</p>
                    <p>{{ monster.dexterity_save }}</p>
                  </span>
                  <span v-if="monster.constitution_save" class="d-flex" title="Constitution Save">
                    <p class="me-1 text-info">Con:</p>
                    <p>{{ monster.constitution_save }}</p>
                  </span>
                  <span v-if="monster.intelligence_save" class="d-flex" title="Intelligence Save">
                    <p class="me-1 text-info">Int:</p>
                    <p>{{ monster.intelligence_save }}</p>
                  </span>
                  <span v-if="monster.wisdom_save" class="d-flex" title="Wisdom Save">
                    <p class="me-1 text-info">Wis:</p>
                    <p>{{ monster.wisdom_save }}</p>
                  </span>
                  <span v-if="monster.charisma_save" class="d-flex" title="Charisma Save">
                    <p class="me-1 text-info">Cha:</p>
                    <p>{{ monster.charisma_save }}</p>
                  </span>
                </div>
              </div>


              <!-- ARMOR -->
              <div>
                <button v-if="monster.armor_class || monster.armor_desc" class="btn selectable" type="button"
                  data-bs-toggle="collapse" data-bs-target="#collapseArmor" aria-expanded="false"
                  aria-controls="collapseArmor">
                  <h5 class="text-woah">Armor Class</h5>
                </button>
              </div>
              <div class="collapse" id="collapseArmor">
                <span class="d-flex">
                  <p v-if="monster.armor_class" class="me-1">AC: {{ monster.armor_class }} -</p>
                  <p v-if="monster.armor_desc">{{ monster.armor_desc }}</p>
                </span>
              </div>
            </div>


            <!-- FEATURES AND TRAITS -->
            <button class="btn selectable" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseFeaturesAndTraits" aria-expanded="false"
              aria-controls="collapseFeaturesAndTraits">
              <h5 class="text-woah">Features & Traits</h5>
            </button>
            <div class="collapse" id="collapseFeaturesAndTraits">


              <!-- SKILLS -->
              <p v-if="!monster.skills" class="border-bottom border-1 text-info">Skills</p>
              <div v-if="monster.skills" class="d-flex flex-wrap">
                <div v-for="(value, property) in monster.skills" :key="property">
                  <span class="d-flex me-2">
                    <p class=" me-1">{{ property }}:</p>
                    <p>{{ value }}</p>
                  </span>
                </div>
              </div>


              <!-- SENSES -->
              <div v-if="monster.senses">
                <p class="border-bottom border-1 text-info">Senses</p>
                <p>{{ monster.senses }}</p>
              </div>


              <!-- LANGUAGES -->
              <div v-if="monster.languages">
                <p class="border-bottom border-1 text-info">Languages</p>
                <p>{{ monster.languages.replace('—', 'None').replace('-', 'None') }}</p>
              </div>


              <!-- TRAITS -->
              <div class="d-flex justify-content-around flex-wrap">
                <span class="d-flex flex-wrap">
                  <p class="text-info me-1">Vulnerabilities:</p>
                  <p>{{ monster.damage_vulnerabilities }}</p>
                </span>
                <span class="d-flex flex-wrap">
                  <p class="text-info me-1">Resistances:</p>
                  <p>{{ monster.damage_resistances }}</p>
                </span>
                <span class="d-flex flex-wrap">
                  <p class="text-info me-1">Damage Immunities:</p>
                  <p>{{ monster.damage_immunities }}</p>
                </span>
                <span class="d-flex flex-wrap">
                  <p class="text-info me-1">Condition Immunities:</p>
                  <p>{{ monster.condition_immunities }}</p>
                </span>
              </div>
            </div>


            <!-- PERFORMANCES -->
            <h4 class="statistics text-info">Moves</h4>
            <div>


              <!-- LEGENDARY -->
              <div v-if="monster.legendary_desc || monster.legendary_actions">
                <button v-if="monster.legendary_desc || monster.legendary_actions" class="btn selectable" type="button"
                  data-bs-toggle="collapse" data-bs-target="#collapseLegendary" aria-expanded="false"
                  aria-controls="collapseLegendary">
                  <h5 class="text-warning ">Legendary Info</h5>
                </button>
              </div>
              <div v-if="monster.legendary_desc || monster.legendary_actions" class="collapse" id="collapseLegendary">
                <span class="d-flex flex-wrap">
                  <p v-if="monster.legendary_desc" class="me-1 mb-1 text-warning">Description:</p>
                  <p v-if="monster.legendary_desc">{{ monster.legendary_desc }}</p>
                </span>
                <p v-if="monster.legendary_actions"
                  class="fs-5 border-bottom border-1 border-warning mb-1 me-1 text-warning">Actions</p>
                <div v-if="monster.legendary_actions" v-for="a in monster.legendary_actions">
                  <span class="d-flex flex-wrap">
                    <p class="text-warning me-1 mb-1">{{ a.name }}:</p>
                    <p class="mb-1">{{ a.desc }}</p>
                  </span>
                </div>
              </div>


              <!-- ACTIONS -->
              <div>
                <button class="btn selectable" type="button" data-bs-toggle="collapse" data-bs-target="#collapseActions"
                  aria-expanded="false" aria-controls="collapseActions">
                  <h5 v-if="monster.actions" class="me-1 text-woah">Actions</h5>
                </button>
                <div class="collapse" id="collapseActions">
                  <div v-if="monster.actions" v-for="actions in monster.actions">
                    <span class="d-flex flex-wrap">
                      <p class="text-info me-1">{{ actions.name }}:</p>
                      <p>{{ actions.desc }}</p>
                    </span>
                  </div>
                </div>
              </div>


              <!-- REACTIONS -->
              <div v-if="monster.reactions">
                <button class="btn selectable" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseReactions" aria-expanded="false" aria-controls="collapseReactions">
                  <h5 v-if="monster.reactions" class="me-1 text-woah">Reactions</h5>
                </button>
                <div class="collapse" id="collapseReactions">
                  <div v-if="monster.reactions" v-for="reactions in monster.reactions">
                    <span class="d-flex flex-wrap">
                      <p class="text-info me-1">{{ reactions.name }}:</p>
                      <p>{{ reactions.desc }}</p>
                    </span>
                  </div>
                </div>
              </div>


              <!-- SPECIAL ABILITIES -->
              <div>
                <button class="btn selectable" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseSpAbilities" aria-expanded="false" aria-controls="collapseSpAbilities">
                  <h5 v-if="monster.special_abilities" class="me-1 text-woah">Special Abilities</h5>
                </button>
                <div class="collapse" id="collapseSpAbilities">
                  <div v-if="monster.special_abilities" v-for="special_abilities in monster.special_abilities">
                    <span class="d-flex flex-wrap">
                      <p class="text-info me-1">{{ special_abilities.name }}:</p>
                      <p>{{ special_abilities.desc }}</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>


            <!-- SPELLS -->
            <h4 v-if="monster.spell_list[0]" class=" statistics text-info">Spells</h4>
            <div v-if="monster.spell_list[0]" v-for="spell in monster.spell_list">
              <a :href="spell.replace('api-beta.', '')" target="_blank" class="text-light">{{
                  spell.replace('https://api-beta.open5e.com/spells/', '').replace('/',
                    '').replace('-', '').toUpperCase()
              }}</a>
            </div>
            <div>
              <button class="btn selectable" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDesc"
                aria-expanded="false" aria-controls="collapseDesc">
                <h5 v-if="monster.desc" class="me-1 text-woah">Description</h5>
              </button>
              <div class="collapse" id="collapseDesc">
                <div v-if="monster.desc">
                  <span class="d-flex flex-wrap">
                    <p>{{ monster.desc }}</p>
                  </span>
                </div>



                <!-- Monster Edits -->
                <div class="modal-body all-transparent" v-else>
                  <form action="submit" class="card text-secondary all-transparent"
                    @submit.prevent="editMonster(monster.id)">
                    <div class="modal-content all-transparent">

                      <!-- name -->
                      <div class="d-flex gap-3 justify-content-around mb-1 all-transparent">
                        <div class="form-floating mb-3 text-visible">
                          <input type="text" class="form-control input-bg text-visible" v-model="editable.nickName"
                            name="nickName" placeholder="Name:" maxlength="500" />
                          <label for="nickName">Name:</label>
                        </div>

                        <div class="form-floating mb-3 text-visible">
                          <input type="number" class="form-control input-bg text-visible" v-model="editable.quantity"
                            name="quantity" max="1000" placeholder="Quantity:" />
                          <label for="quantity">Quantity:</label>
                        </div>
                        <div class="form-floating mb-3 text-visible">
                          <input type="number" class="form-control input-bg text-visible" v-model="editable.hit_points"
                            name="hit_points" max="10000" placeholder="Hit Points:" />
                          <label for="hit_points">Hit Points:</label>
                        </div>
                      </div>

                      <!-- description -->
                      <div class="d-flex gap-3 justify-content-around mb-3">
                        <div class="form-floating mb-3 text-visible">
                          <input type="number" class="form-control input-bg text-visible" v-model="editable.armor_class"
                            max="100" name="armor_class" placeholder="Armor Class:" />
                          <label for="armor_class">Armor Class:</label>
                        </div>
                      </div>
                      <div class="form-floating mb-3 text-visible">
                        <textarea type="text" class="form-control textarea-height input-bg text-visible"
                          v-model="editable.desc" name="desc" stye="resize: none" placeholder="Description:"
                          maxlength="500"></textarea>
                        <label for="desc">Description:</label>
                      </div>
                    </div>

                    <!-- details -->
                    <div class="modal-footer all-transparent d-flex justify-content-between">
                      <button type="button" class="btn-visible text-visible" @click.stop="toggleHidden()">
                        Monster Details
                      </button>
                      <button class="btn-visible text-visible" type="submit">
                        Make These Edits
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>







        <!-- No monster Data -->
        <div class="modal-body bg-transparent-modal" v-else>
          <p>Sorry, there is no monster data available :(</p>
        </div>
        <div v-if="account.id == encounter.creatorId">
          <div class="modal-footer bg-transparent-modal d-flex justify-content-between" v-if="hidden == false">
            <div>
              <button v-if="hidden == false" type="button" class="btn-visible text-visible"
                @click.stop="toggleHidden()">
                Edit Monster
              </button>
              <button v-else type="button" class="btn-visible text-visible" @click.stop="toggleHidden()">
                Monster Details
              </button>
            </div>
            <button type="button" class="btn-visible text-visible" data-bs-dismiss="modal"
              @click.stop="removeMonster(monster.id)">
              Remove Monster
            </button>
          </div>
        </div>
        <div v-else></div>


        <div class="modal-dialog" v-else>
          <div class="modal-content text-visible npc-content"
            :style="monster.image ? { backgroundImage: `url(${monster.image})` } : ''">
            <div class="modal-header bg-transparent-modal">
              <h1 class="modal-title text-info fs-5" id="MonsterDetailsModalLabel">
                {{ monster?.name }}
              </h1>
              <button type="button" class="btn-visible text-visible" data-bs-dismiss="modal"
                aria-label="Close">X</button>
            </div>
            <div class="modal-body bg-transparent-modal scrollable d-flex flex-column justify-content-around"
              v-if="hidden === false">
              <div class="d-flex flex-wrap justify-content-around">
                <div class="text-center">
                  <h5 class="text-primary">HP</h5>
                  <p>{{ monster.hit_points }}</p>
                </div>
                <div class="text-center">
                  <h5 class="text-primary">Dexterity</h5>
                  <p>{{ monster.dexterity }}</p>
                </div>
              </div>
              <div class="d-flex flex-column justify-content-center align-items-center">
                <h5 class="text-primary">Description</h5>
                <div>
                  <p>{{ monster.desc }}</p>
                </div>
              </div>
            </div>

            <div class="modal-body bg-transparent-modal" v-else>
              <form action="submit" class="card text-secondary all-transparent"
                @submit.prevent="editMonster(monster.id)">
                <div class="modal-content all-transparent">
                  <!-- name -->
                  <div class="d-flex gap-3 justify-content-around mb-1 all-transparent">
                    <div class="form-floating mb-3 text-visible">
                      <input type="text" class="form-control input-bg text-visible" v-model="editable.nickName"
                        name="nickName" placeholder="Name:" maxlength="500" />
                      <label for="nickName">Name:</label>
                    </div>

                    <!-- dex -->
                    <div class="form-floating mb-3 text-visible">
                      <input type="number" class="form-control input-bg text-visible" v-model="editable.dexterity"
                        name="dexterity" max="10000" placeholder="Dexterity:" />
                      <label for="dexterity">Dexterity:</label>
                    </div>

                    <!-- HP -->
                    <div class="form-floating mb-3 text-visible">
                      <input type="number" class="form-control input-bg text-visible" v-model="editable.hit_points"
                        name="hit_points" max="10000" placeholder="Hit Points:" />
                      <label for="hit_points">Hit Points:</label>
                    </div>
                  </div>

                  <!-- description -->
                  <div class="form-floating text-visible">
                    <textarea type="text" class="form-control textarea-height input-bg text-visible"
                      v-model="editable.desc" name="desc" stye="resize: none" placeholder="Description:"
                      maxlength="500"></textarea>
                    <label for="desc">Description:</label>
                  </div>
                  <div class="text-end text-visible mt-2">
                    <span>{{ editable.desc ? editable.desc.length : 0 }}</span>
                    <span>/ 500</span>
                  </div>
                </div>

                <!-- details -->
                <div class="modal-footer all-transparent d-flex justify-content-between">
                  <button type="button" class="btn-visible text-visible" @click.stop="toggleHidden()">
                    Monster Details
                  </button>
                  <button class="btn-visible text-visible" type="submit">
                    Make These Edits
                  </button>
                </div>
              </form>
            </div>



            <div v-if="account.id == encounter.creatorId">
              <div class="modal-footer bg-transparent-modal d-flex justify-content-between" v-if="hidden == false">
                <div>
                  <button v-if="hidden == false" type="button" class="btn-visible text-visible"
                    @click.stop="toggleHidden()">
                    Edit Monster
                  </button>
                  <button v-else type="button" class="btn-visible text-visible" @click.stop="toggleHidden()">
                    Monster Details
                  </button>
                </div>
                <button type="button" class="btn-visible text-visible" data-bs-dismiss="modal"
                  @click.stop="removeMonster(monster.id)">
                  Remove Monster
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>





<script>
import { computed, ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { Monster } from "../models/Monster.js";
import { monstersService } from "../services/MonstersService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    monster: { type: Monster, required: true },
  },
  setup(props) {
    let editable = ref({});
    watchEffect(() => {
      editable.value = { ...props.monster };
      AppState.activeEncounterMonsters;
    });
    return {
      editable,
      account: computed(() => AppState.account),
      encounter: computed(() => AppState.activeEncounter),
      hidden: computed(() => AppState.hidden),
      async toggleHidden() {
        try {
          AppState.hidden = !AppState.hidden;
        } catch (error) {
          Pop.error(error);
        }
      },
      async removeMonster(id) {
        try {
          const yes = await Pop.confirm(
            "Are you sure you want to delete this Encounter?"
          );
          if (!yes) {
            return;
          }
          await monstersService.removeMonster(id);
        } catch (error) {
          Pop.error(error);
        }
      },
      async editMonster(id) {
        try {
          // console.log(props.monster.id, id);
          await monstersService.editMonster(editable.value, id);
          this.toggleHidden();
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
  background-color: black;
  background-color: rgba(0, 0, 0, 0.6);
  height: 12rem;
  width: 10rem;
  border-radius: 0.5rem;
  background-position: center;
  background-size: cover;
  transition: 150ms linear;
}

.monster-card:hover {
  transform: scale(1.1);
}

.muted-layer {
  height: 12rem;
  width: 10rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.639);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  padding: 0.5rem;
  text-shadow: none;
  color: rgba(96, 190, 234, 0.505);
}

.muted-layer:hover {
  color: rgb(96, 190, 234);
  text-shadow: 1px 1px rgba(0, 0, 0, 0.644),
    0px 0px 5px rgba(189, 234, 30, 0.678);
}

.input-bg {
  background-color: rgba(0, 0, 0, 0.552) !important;
}

.modal-content {
  background-position: center;
  background-size: cover;
}

.bg-transparent {
  background-color: rgba(10, 10, 10, 0.804) !important;
}

.bg-transparent:hover {
  background-color: rgba(10, 10, 10, 0.43) !important;
}

.bg-transparent-modal {
  background-color: rgba(10, 10, 10, 0.664) !important;
}

.all-transparent {
  background-color: rgba(0, 0, 0, 0) !important;
}

.npc-content {
  min-height: 60vh;
}

.statistics {
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-woah {
  color: rgb(96, 190, 234) !important;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.644), 0px 0px 5px rgba(18, 34, 50, 0.678);
}


.textarea-height {
  height: 10rem;
}

.text-visible {
  color: rgb(216, 224, 229) !important;
}

.text-visible:hover {
  color: rgb(216, 224, 229) !important;
}

.text-light:hover {
  color: rgb(216, 224, 229) !important;
}

.scrollable {
  overflow-y: auto;
  max-height: 70vh;
}
</style>