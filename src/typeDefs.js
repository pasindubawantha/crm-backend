import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar Date

  enum CustomerStatus {
    ACTIVE
    NON_ACTIVE 
    LEAD
  }
  
  enum OpportunityStatus {
    NEW
    CLOSED_WON
    CLOSED_LOST
  }

  # enum UserRole {
  #   ADMIN
  #   USER
  # }
  
  enum SortOrder {
    ASCENDING
    DESCENDING
  }

  type Customer {
    _id: ID!
    status: CustomerStatus!
    creation_date: Date!
    name: String!
    email: String #@unique
    mobile_number: String
    address: String
    opportunities: [Opportunity]
  }

  type Opportunity {
    _id: ID!
    name: String!
    status: OpportunityStatus!
  }

  # type User {
  #   _id: ID!
  #   email: String! #@unique
  #   name: String!
  #   role: UserRole!
  #   status: String! # moved to local
  # }
  
  input CustomerFilters {
    _id: [ID]
    status: [CustomerStatus]
    creation_date_start: Date
    creation_date_end: Date
    name: [String]
    email: [String]
    mobile_number: [String]
    address: [String]
  }

  input SortFields {
    field: String!
    sort_order: SortOrder!
  }

  input CustomerInput{ 
    filters: CustomerFilters
    sort_by: [SortFields]
  }

  input updatedCustomer{
    status: CustomerStatus
    creation_date: Date
    name: String
    email: String #@unique
    mobile_number: String
    address: String
  }

  input OpportunityFilters {
    _id: [ID]
    name: [String]
    status: [OpportunityStatus]
    customer_id: [String]
  }

  input OpportunityInput{ 
    filters: OpportunityFilters
    sort_by: [SortFields]
  }

  input updatedOpportunity{
    name: String
    status: OpportunityStatus
  }

  type Query {
    getCustomer(id: ID!): Customer!
    getCustomers(input: CustomerInput): [Customer]

    getOpportunity(id: ID!): Opportunity!
    getOpportunities(input: OpportunityInput): [Opportunity]
  }

  type Mutation {
    createCustomer(status: CustomerStatus!, name: String!, email: String, mobile_number: String, address: String): Customer!
    editCustomer(id: ID!, updatedCustomer: updatedCustomer): Customer!

    createOpportunity(status: OpportunityStatus!, name: String!, customer_id: String!): Opportunity!
    editOpportunity(id: ID!, updatedOpportunity: updatedOpportunity): Opportunity!
    deleteOpportunity(id: ID!): Opportunity!
  }
`;


