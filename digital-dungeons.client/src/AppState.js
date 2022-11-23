import { reactive } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Campaign.js').Campaign} */
  campaigns: [],
  /** @type {import('./models/Campaign.js').Campaign || null} */
  activeCampaign: null,
  /** @type {import('./models/Encounter.js').Encounter} */
  encounters: [],

  /** @type {import('./models/Encounter.js').Encounter || null} */
  activeEncounter: null,
  /** @type {import('./models/Monster.js').Monster[]} */
  monsters: [],
  /** @type {import('./models/Monster.js').Monster} */
  activeMonster: null,
  /** @type {import('./models/Monster.js').Monster[]} */
  activeEncounterMonsters: [],
  /** @type {import('./models/Spell.js').Spell[]} */
  spells: [],
  /** @type {import('./models/Race.js').Race[]} */
  races: [],
  /** @type {import('./models/DndClass.js').DndClass[]} */
  classes: [],
  /** @type {import('./models/MagicItem.js').MagicItem[]} */
  magicitems: [],
  /** @type {import('./models/Weapon.js').Weapon[]} */
  weapons: [],
  /** @type {import('./models/Armor.js').Armor[]} */
  armor: [],

  /** @type {import('./models/Spell.js').Spell} */
  activeCategory: null,

  hidden: false,
  nextPage: null,
  previousPage: null,
  count: null,
  currentPage: 1,
});
