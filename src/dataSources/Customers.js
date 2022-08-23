import { MongoDataSource } from 'apollo-datasource-mongodb'

export default class Customers extends MongoDataSource {
  async getCustomers(filter_fields, sort_by_fields) {
    console.log("getCustomers :")
    console.log("filter_fields :")
    console.log(filter_fields)
    console.log("sort_by_fields :")
    console.log(sort_by_fields)

    return await this.model.find(filter_fields).sort(sort_by_fields);
  }

  async getCustomer(id) {
    return await this.findOneById(id);
  }

  async createCustomer({ name, status, creation_date, email, mobile_number, address }) {
    return await this.model.create({ name, status, creation_date, email, mobile_number, address });
  }

  async editCustomer(id, newCustomer) {
    return await this.model.findOneAndUpdate({_id:id}, newCustomer);
  }
}