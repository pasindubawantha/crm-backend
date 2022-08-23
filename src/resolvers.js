import { GraphQLScalarType, Kind } from 'graphql'

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});


const extractFiltersAndSort = function (input) {
  var filters = {}
  var sort_by_fields = new Map()
  if (input) {
    for (const filter in input['filters']) {
      if (Array.isArray(input['filters'][filter])) {
        filters[filter] = input['filters'][filter].map((value) => {
          if (typeof(value) === 'string' && filter != "_id" && filter != "status" ) {
            try {
             return new RegExp(value,"i")
            }
            catch (e){
              console.log(e)
            }
          }
          return value
        })
      }
      else {
        if (typeof(input['filters'][filter]) === 'string') {
          filters[filter] = new RegExp(input['filters'][filter],"i")
        }
        else {
          filters[filter] = input['filters'][filter]
        }
      }
    }

    if (input['sort_by']) {
      input['sort_by'].forEach(sort_field => {
        sort_by_fields.set(sort_field.field, sort_field.sort_order.toLowerCase());
      });  
    }
  }
  
  return {
    "filters": filters,
    "sort_by_fields": Object.fromEntries(sort_by_fields)
  }
}

export const resolvers = {
  Date: {dateScalar},
  Customer: {
    opportunities: async (parent, _, { dataSources: { opportunities } }) => {
      return opportunities.getOpportunities({customer_id: parent._id}, {});
    }
  },
  Query: {
    getCustomer: async (_, { id }, { dataSources: { customers } }) => {
      return customers.getCustomer(id);
    },
    getCustomers: async (_, { input }, { dataSources: { customers } }) => {
      let { filters , sort_by_fields } = extractFiltersAndSort(input)

      if(filters['creation_date_start'] || filters['creation_date_end']) {
        let creation_date = {}
        if(filters['creation_date_start']) {
          creation_date.$gte = filters['creation_date_start'];
          delete filters['creation_date_start'];
        }
        if(filters['creation_date_end']) {
          creation_date.$lte = filters['creation_date_end'];
          delete filters['creation_date_end'];
        }
        filters['creation_date'] = creation_date
      }
    
      return customers.getCustomers(filters, sort_by_fields);
    },
    
    getOpportunity: async (_, { id }, { dataSources: { opportunities } }) => {
      return opportunities.getOpportunity(id);
    },
    getOpportunities: async (_, { input }, { dataSources: { opportunities } }) => {
      let { filters , sort_by_fields } = extractFiltersAndSort(input)
      return opportunities.getOpportunities(filters, sort_by_fields);
    },

  },
  Mutation: {
    createCustomer: async (_, args, { dataSources: { customers } }) => {
      args['creation_date'] = new Date().getTime()
      return customers.createCustomer(args)
    },
    editCustomer: async (_, { id, updatedCustomer}, { dataSources: { customers } }) => {
      return customers.editCustomer(id, updatedCustomer)
    },


    createOpportunity: async (_, args, { dataSources: { opportunities } }) => {
      return opportunities.createOpportunity(args)
    },
    editOpportunity: async (_, { id, updatedOpportunity}, { dataSources: { opportunities } }) => {
      return opportunities.editOpportunity(id, updatedOpportunity)
    },
    deleteOpportunity: async (_, { id }, { dataSources: { opportunities } }) => {
      return opportunities.deleteOpportunity(id)
    },
  }
}