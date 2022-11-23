import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { logger } from "../utils/Logger";

class MonstersService {
  async editMonsters(arrayOfMonsters, accountId, encounterId) {
    arrayOfMonsters = arrayOfMonsters.filter(
      (monster) => monster.creatorId === accountId
    );
    if (arrayOfMonsters.length === 0) {
      throw new Forbidden("Not your monsters, no editing allowed.");
    }
    const document = [];

    arrayOfMonsters.forEach((monster) => {
      const obj = {
        updateOne: {
          filter: { _id: monster.id },
          update: { $set: { initiative: monster.initiative } },
        },
      };
      document.push(obj);
    });
    const monstersReport = await dbContext.Monsters.bulkWrite(document);
    const monsters = await this.getMonstersByEncounterId(encounterId);

    return { monstersReport, monsters };
  }
  async editMonster(monsterData) {
    const monster = await this.getMonsterById(monsterData.id);
    // @ts-ignore
    if (monster.creatorId.toString() !== monsterData.creatorId) {
      throw new Forbidden("This is not your monster; you cannot edit it.");
    }

    monster.nickName = monsterData.nickName || monster.nickName;
    monster.desc = monsterData.desc || monster.desc;
    monster.image = monsterData.image || monster.image;
    monster.icon = monsterData.icon || monster.icon;
    monster.hit_points = monsterData.hit_points || monster.hit_points;
    monster.initiative = monsterData.initiative || monster.initiative;
    monster.armor_class = monsterData.armor_class || monster.armor_class;
    monster.quantity = monsterData.quantity || monster.quantity;

    await monster.save();
    return monster;
  }

  async deleteMonster(monsterId, userId) {
    const monster = await this.getMonsterById(monsterId);
    // @ts-ignore
    if (monster.creatorId.toString() !== userId) {
      throw new Forbidden("This is not your monster; you cannot delete it.");
    }
    await monster.remove();
    return monster;
  }

  async getMonsterById(monsterId) {
    const monster = await dbContext.Monsters.findById(monsterId);
    if (!monster) {
      throw new BadRequest("Could not get monster by that ID");
    }
    return monster;
  }

  async addMonster(monsterData) {
    const monster = await dbContext.Monsters.create(monsterData);
    await monster.populate("encounter");
    return monster;
  }

  async getMonstersByEncounterId(encounterId) {
    const monsters = await dbContext.Monsters.find({ encounterId }).populate(
      "encounter"
    );
    return monsters;
  }
}

export const monstersService = new MonstersService();
