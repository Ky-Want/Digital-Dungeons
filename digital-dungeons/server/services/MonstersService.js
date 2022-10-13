import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class MonstersService {
  async editMonster(monsterData) {

  }

  async deleteMonster(monsterId, userId) {
    const monster = await this.getMonsterById(monsterId)
    // @ts-ignore
    if (monster.creatorId.toString() !== userId) {
      throw new Forbidden("This is not your monster; you cannot delete it.")
    }
    await monster.remove()
    return monster
  }

  async getMonsterById(monsterId) {
    const monster = await dbContext.Monsters.findById(monsterId)
    if (!monster) {
      throw new BadRequest("Could not get monster by that ID")
    }
    return monster
  }

  async addMonster(monsterData) {
    const monster = await dbContext.Monsters.create(monsterData);
    await monster.populate("encounter")
    return monster
  }

  async getMonstersByEncounterId(encounterId) {
    const monsters = await dbContext.Monsters.find({ encounterId }).populate(
      "encounter"
    );
    return monsters;
  }

}

export const monstersService = new MonstersService();
