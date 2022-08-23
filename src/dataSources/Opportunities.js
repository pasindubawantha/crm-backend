import { MongoDataSource } from 'apollo-datasource-mongodb'

export default class Opportunities extends MongoDataSource {
  async getOpportunities(filter_fields, sort_by_fields) {
    console.log("getOpportunities :")
    console.log("filter_fields :")
    console.log(filter_fields)
    console.log("sort_by_fields :")
    console.log(sort_by_fields)
    return await this.model.find(filter_fields).sort(sort_by_fields);
  }

  async getOpportunity(id) {
    return await this.findOneById(id);
  }

  async createOpportunity({ name, status, customer_id}) {
    return await this.model.create({ name, status, customer_id });
  }

  async editOpportunity(id, newOpp) {
    return await this.model.findOneAndUpdate({_id:id}, newOpp);
  }
  
  async deleteOpportunity(id) {
    return await this.model.findOneAndDelete({_id:id});
  }
}