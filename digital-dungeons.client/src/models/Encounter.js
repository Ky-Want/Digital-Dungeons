export class Encounter {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.desc = data.desc;
    this.campaignId = data.campaignId;
    this.type = data.type;
    this.isCompleted = data.isCompleted;
    this.coverImg = data.coverImg || "";
    this.musicUrl = data.musicUrl || "";
    this.creatorId = data.creatorId;
  }
}
