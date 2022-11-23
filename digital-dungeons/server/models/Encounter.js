import { Schema } from "mongoose";
import { OBJECT_ID, SCHEMA_OPTIONS } from "../db/DbUtils";

export const EncounterSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    desc: { type: String, maxlength: 1000 },
    campaignId: { type: OBJECT_ID, required: true },
    type: {
      type: String,
      enum: ["fight", "stealth", "strength", "slight of hand"],
    },
    isCompleted: { type: Boolean, default: false },
    coverImg: { type: String, maxlength: 10000 },
    musicUrl: { type: String, maxlength: 10000 },
    creatorId: { type: OBJECT_ID, required: true },
  },
  SCHEMA_OPTIONS
);

EncounterSchema.virtual("campaign", {
  localField: "campaignId",
  foreignField: "_id",
  justOne: true,
  ref: "Campaign",
});
