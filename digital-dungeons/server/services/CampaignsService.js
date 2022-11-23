import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CampaignService {
  async editCampaign(campaignData) {
    const campaign = await this.getCampaignById(campaignData.id)
    // @ts-ignore
    if (campaign.creatorId.toString() !== campaignData.creatorId) {
      throw new Forbidden("This is not your campaign; you may not edit it.")
    }

    campaign.name = campaignData.name || campaign.name
    campaign.desc = campaignData.desc || campaign.desc
    campaign.coverImg = campaignData.coverImg || campaign.coverImg

    await campaign.save()
    return campaign

  }

  async getCampaigns(query) {
    const campaigns = await dbContext.Campaigns.find({ ...query })
      .populate('creator', 'name picture')
    return campaigns
  }

  async addCampaign(campaignData) {
    const campaign = await dbContext.Campaigns.create(campaignData)
    await campaign.populate('creator', 'name picture')
    return campaign
  }

  async getCampaignById(campaignId) {
    const campaign = await dbContext.Campaigns.findById(campaignId).populate('creator', 'name picture')
    if (!campaign) {
      throw new BadRequest('Could not get Campaign due to invalid Id')
    }
    return campaign
  }


  async deleteCampaign(campaignId, userId) {
    const campaign = await this.getCampaignById(campaignId)

    // @ts-ignore
    if (campaign.creatorId.toString() != userId) {
      throw new Forbidden('Campaign is not owned by you')
    }
    await campaign.remove()
    return campaign
  }


  // This is a future goal
  // async getCharactersByCampaignId() {

  // }

}
export const campaignsService = new CampaignService