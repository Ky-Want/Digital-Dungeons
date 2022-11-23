import { Schema } from "mongoose";
import { OBJECT_ID, SCHEMA_OPTIONS } from "../db/DbUtils";

export const MonsterSchema = new Schema(
  {
    encounterId: { type: OBJECT_ID, required: true },
    creatorId: { type: OBJECT_ID, required: true },

    slug: { type: String },
    name: { type: String, required: true },
    size: { type: String },
    type: { type: String },
    subtype: { type: String, default: "No subtype" },
    group: { type: String, default: "No group" },
    alignment: { type: String, default: "No alignment" },
    armor_class: { type: Number, default: null, min: 1 },
    armor_desc: { type: String, default: "No armor desc" },
    hit_dice: { type: String, default: "No hit dice" },
    speed: { type: Object, default: {} },
    strength: { type: Number, default: 10 },
    dexterity: { type: Number, default: 10 },
    constitution: { type: Number, default: 10 },
    intelligence: { type: Number, default: 10 },
    wisdom: { type: Number, default: 10 },
    charisma: { type: Number, default: 10 },
    strength_save: { type: Number, default: 0 },
    dexterity_save: { type: Number, default: 0 },
    constitution_save: { type: Number, default: 0 },
    intelligence_save: { type: Number, default: 0 },
    wisdom_save: { type: Number, default: 0 },
    charisma_save: { type: Number, default: 0 },
    perception: { type: Number, default: 0 },
    skills: { type: Object, default: {} },
    damage_vulnerabilities: {
      type: String,
      default: "No damage vulnerabilities",
    },
    damage_resistances: { type: String, default: "No damage resistances" },
    damage_immunities: { type: String, default: "No damage immunities" },
    condition_immunities: { type: String, default: "No condition immunities" },
    senses: { type: String, default: "No senses" },
    languages: { type: String, default: "No languages" },
    challenge_rating: { type: String, default: "No challenge rating" },
    actions: { type: Array, default: [] },
    reactions: { type: Array, default: [] },
    legendary_desc: { type: String, default: "No legendary desc" },
    legendary_actions: { type: Array, default: [] },
    special_abilities: { type: Array, default: [] },
    spell_list: { type: Array, default: [] },
    img_main: { type: String, default: "No image" },
    document__slug: { type: String, default: "No document slug" },
    document__title: { type: String, default: "No document title" },
    document__license_url: { type: String, default: "No license url" },
    characterType: {
      type: String,
      enum: ["monster", "player", "npc"],
      required: true,
      default: "monster",
    },

    //EDITABLE FIELDS
    icon: { type: String },
    initiative: { type: Number, min: 1, max: 60, default: 1 },
    image: { type: String },
    desc: { type: String, maxlength: 500 },
    nickName: { type: String, maxlength: 50, minlength: 1 },
    quantity: { type: Number, default: 1, min: 1, max: 1000000 },
    hit_points: { type: Number, required: true, min: 1, max: 100000 },
  },
  SCHEMA_OPTIONS
);

MonsterSchema.virtual("encounter", {
  localField: "encounterId",
  foreignField: "_id",
  justOne: true,
  ref: "Encounter",
});
