import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

class EncountersService {
  async editEncounter(encounterData) {
    logger.log("edit encounter", encounterData)
    const encounter = await this.getEncounterById(encounterData.id);
    // @ts-ignore
    if (encounter.creatorId.toString() !== encounterData.creatorId) {
      throw new Forbidden("This is not your encounter; you may not edit it.");
    }

    encounter.name = encounterData.name || encounter.name;
    encounter.desc = encounterData.desc || encounter.desc;
    encounter.type = encounterData.type || encounter.type;
    encounter.isCompleted = encounterData.isCompleted
    encounter.musicUrl = encounterData.musicUrl || encounter.musicUrl;
    encounter.coverImg = encounterData.coverImg || encounter.coverImg;

    await encounter.save();
    logger.log("edit encounter", encounter)
    return encounter;
  }
  async getEncounterById(encounterId) {
    const encounter = await dbContext.Encounters.findById(encounterId);
    if (!encounter) {
      throw new BadRequest("Could not get Encounter due to invalid Id");
    }
    return encounter;
  }
  async removeEncounter(encounterId, userId) {
    const encounter = await dbContext.Encounters.findById(encounterId);

    // @ts-ignore
    if (encounter.creatorId.toString() != userId) {
      throw new BadRequest("You Ain't You Sir!");
    }
    if (!encounter) {
      throw new BadRequest("Bad encounter Id");
    }

    await encounter.remove();
    return encounter;
  }

  async getEncountersByCampaignId(campaignId) {
    const encounters = await dbContext.Encounters.find({ campaignId }).populate(
      "campaign"
    );
    return encounters;
  }

  async addEncounter(encounterData) {
    const encounter = await dbContext.Encounters.create(encounterData);
    await encounter.populate("campaign");
    return encounter;
  }
}

export const encountersService = new EncountersService();
