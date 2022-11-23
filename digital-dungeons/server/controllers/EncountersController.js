import { Auth0Provider } from "@bcwdev/auth0provider";
import { encountersService } from "../services/EncountersService";
import { monstersService } from "../services/MonstersService";
import BaseController from "../utils/BaseController";

export class EncountersController extends BaseController {
  constructor() {
    super("api/encounters");
    this.router
      .get("/:encounterId/monsters", this.getMonstersByEncounterId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.addEncounter)
      .delete("/:encounterId", this.removeEncounter)
      .put("/:encounterId", this.editEncounter)
      .put("/:encounterId/monsters", this.editMonsters)

  }

  async getMonstersByEncounterId(req, res, next) {
    try {
      const monsters = await monstersService.getMonstersByEncounterId(
        req.params.encounterId
      );
      res.send(monsters);
    } catch (error) {
      next(error);
    }
  }

  async addEncounter(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      const encounter = await encountersService.addEncounter(req.body);
      res.send(encounter);
    } catch (error) {
      next(error);
    }
  }

  async removeEncounter(req, res, next) {
    try {
      const encounter = await encountersService.removeEncounter(
        req.params.encounterId,
        req.userInfo.id
      );
      res.send(encounter);
    } catch (error) {
      next(error);
    }
  }
  async editEncounter(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      req.body.id = req.params.encounterId;
      const encounter = await encountersService.editEncounter(req.body);
      res.send(encounter);
    } catch (error) {
      next(error);
    }
  }

  async editMonsters(req, res, next) {
    try {
      const monstersReport = await monstersService.editMonsters(req.body, req.userInfo.id, req.params.encounterId)
      res.send(monstersReport)
    }
    catch(error) {
      next(error)
    }
  }
}
