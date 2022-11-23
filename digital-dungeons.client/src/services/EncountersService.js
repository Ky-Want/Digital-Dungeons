import { AppState } from "../AppState.js";
import { Encounter } from "../models/Encounter.js";
import { logger } from "../utils/Logger.js";
import { baseApi } from "./AxiosService.js";


class EncountersService {
  async getEncounters(params) { }

  async getEncountersByCampaignId(campaignId) {
    const res = await baseApi.get(`api/campaigns/${campaignId}/encounters`);
    AppState.encounters = res.data.map((e) => new Encounter(e));
    // console.log(res.data);
    // console.log("Getting Encounters Round 2");
    // console.log(AppState.encounters);
  }

  async addEncounterToCampaign(encounterData) {
    const res = await baseApi.post("/api/encounters", encounterData);
    const encounter = new Encounter(res.data);
    AppState.encounters = [...AppState.encounters, encounter];
    // console.log(AppState.encounters);
  }

  async removeEncounter(id) {
    await baseApi.delete(`api/encounters/${id}`);
    AppState.encounters = AppState.encounters.filter((e) => e.id != id);
  }

  async editEncounter(encounterData, id) {
    const res = await baseApi.put(`api/encounters/${id}`, encounterData);
    // console.log(encounterData);
    const updatedEncounter = new Encounter(res.data);
    const index = AppState.encounters.findIndex((e) => e.id == id);
    AppState.encounters.splice(index, 1, updatedEncounter);
    AppState.activeEncounter = updatedEncounter;
  }





  async getEncounterById(campaignId, encounterId) {
    const res = await baseApi.get(
      `api/campaigns/${campaignId}/encounter/${encounterId}`
    );
    AppState.activeEncounter = new Encounter(res.data);
    // console.log(res.data);
    // console.log("Getting Encounters Round 2");
    // console.log(AppState.activeEncounter);
  }
}

export const encountersService = new EncountersService();
