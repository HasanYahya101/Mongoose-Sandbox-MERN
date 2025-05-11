import { v4 as uuidv4 } from 'uuid';

export const endpoints = [
  {
    id: uuidv4(),
    name: 'insertOne',
    path: '/api/users',
    method: 'POST',
    description: 'Create a single user document',
    category: 'Create',
    body: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'User name'
      },
      {
        name: 'email',
        type: 'string',
        required: true,
        description: 'User email'
      },
      {
        name: 'age',
        type: 'number',
        required: true,
        description: 'User age'
      },
      {
        name: 'city',
        type: 'string',
        required: false,
        description: 'User city'
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: 'User active status',
        defaultValue: true
      }
    ],
    exampleRequest: {
      "name": 'John Doe',
      "email": 'john@example.com',
      "age": 30,
      "city": 'New York',
      "active": true
    },
    exampleResponse: {
      success: true,
      data: {
        _id: '60d21b4967d0d8992e610c85',
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        city: 'New York',
        active: true,
        createdAt: '2023-06-20T12:00:00.000Z'
      }
    }
  },
  {
    id: uuidv4(),
    name: 'insertMany',
    path: '/api/users/batch',
    method: 'POST',
    description: 'Create multiple user documents',
    category: 'Create',
    body: [
      {
        name: 'users',
        type: 'array',
        required: true,
        description: 'Array of user objects'
      }
    ],
    exampleRequest: [
      {
        "name": 'John Doe',
        "email": 'john@example.com',
        "age": 30,
        "city": 'New York',
        "active": true
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        age: 25,
        city: 'Boston',
        active: true
      }
    ],
    exampleResponse: {
      success: true,
      data: [
        {
          _id: '60d21b4967d0d8992e610c85',
          name: 'John Doe',
          email: 'john@example.com',
          age: 30,
          city: 'New York',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        },
        {
          _id: '60d21b4967d0d8992e610c86',
          name: 'Jane Smith',
          email: 'jane@example.com',
          age: 25,
          city: 'Boston',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        }
      ]
    }
  },
  {
    id: uuidv4(),
    name: 'find',
    path: '/api/users',
    method: 'GET',
    description: 'Find users based on query parameters',
    category: 'Read',
    params: [
      {
        name: 'query',
        type: 'object',
        required: false,
        description: 'Query criteria in JSON format',
        defaultValue: '{}'
      }
    ],
    exampleRequest: {
      "age": { "$gt": 25 },
    },
    exampleResponse: {
      success: true,
      data: [
        {
          _id: '60d21b4967d0d8992e610c85',
          name: 'John Doe',
          email: 'john@example.com',
          age: 30,
          city: 'New York',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        },
        {
          _id: '60d21b4967d0d8992e610c86',
          name: 'Jane Smith',
          email: 'jane@example.com',
          age: 25,
          city: 'Boston',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        }
      ]
    }
  },
  {
    id: uuidv4(),
    name: 'findOne',
    path: '/api/users/one',
    method: 'GET',
    description: 'Find a single user based on query parameters',
    category: 'Read',
    params: [
      {
        name: 'query',
        type: 'object',
        required: false,
        description: 'Query criteria in JSON format',
        defaultValue: '{}'
      }
    ],
    exampleRequest: {
      "name": 'John Doe'
    },
    exampleResponse: {
      success: true,
      data: {
        _id: '60d21b4967d0d8992e610c85',
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        city: 'New York',
        active: true,
        createdAt: '2023-06-20T12:00:00.000Z'
      }
    }
  },
  {
    id: uuidv4(),
    name: 'find with limit',
    path: '/api/users/limit',
    method: 'GET',
    description: 'Find users with a limit on the number of results',
    category: 'Read',
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Maximum number of documents to return',
        defaultValue: 5
      }
    ],
    exampleRequest: {
      "limit": 2
    },
    exampleResponse: {
      success: true,
      data: [
        {
          _id: '60d21b4967d0d8992e610c85',
          name: 'John Doe',
          email: 'john@example.com',
          age: 30,
          city: 'New York',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        },
        {
          _id: '60d21b4967d0d8992e610c86',
          name: 'Jane Smith',
          email: 'jane@example.com',
          age: 25,
          city: 'Boston',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        }
      ]
    }
  },
  {
    id: uuidv4(),
    name: 'find with skip',
    path: '/api/users/skip',
    method: 'GET',
    description: 'Find users with a skip parameter for pagination',
    category: 'Read',
    params: [
      {
        name: 'skip',
        type: 'number',
        required: false,
        description: 'Number of documents to skip',
        defaultValue: 0
      }
    ],
    exampleRequest: {
      "skip": 1
    },
    exampleResponse: {
      success: true,
      data: [
        {
          _id: '60d21b4967d0d8992e610c85',
          name: 'John Doe',
          email: 'john@example.com',
          age: 30,
          city: 'New York',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        },
        {
          _id: '60d21b4967d0d8992e610c86',
          name: 'Jane Smith',
          email: 'jane@example.com',
          age: 25,
          city: 'Boston',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        }
      ]
    }
  },
  {
    id: uuidv4(),
    name: 'find with sort',
    path: '/api/users/sort',
    method: 'GET',
    description: 'Find users with sorting options',
    category: 'Read',
    params: [
      {
        name: 'sortBy',
        type: 'object',
        required: false,
        description: 'Sort criteria in JSON format',
        defaultValue: '{"createdAt": -1}'
      }
    ],
    exampleRequest: {
      "age": -1
    },
    exampleResponse: {
      success: true,
      data: [
        {
          _id: '60d21b4967d0d8992e610c86',
          name: 'Jane Smith',
          email: 'jane@example.com',
          age: 25,
          city: 'Boston',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        },
        {
          _id: '60d21b4967d0d8992e610c85',
          name: 'John Doe',
          email: 'john@example.com',
          age: 30,
          city: 'New York',
          active: true,
          createdAt: '2023-06-19T12:00:00.000Z'
        }
      ]
    }
  },
  {
    id: uuidv4(),
    name: 'distinct',
    path: '/api/users/distinct',
    method: 'GET',
    description: 'Get distinct values for a field',
    category: 'Read',
    params: [
      {
        name: 'field',
        type: 'string',
        required: false,
        description: 'Field name to get distinct values for',
        defaultValue: 'city'
      }
    ],
    exampleRequest: {
      "field": "name",
      "query": { "active": true }
    },
    exampleResponse: {
      success: true,
      data: ['New York', 'Boston', 'Chicago', 'Seattle']
    }
  },
  {
    id: uuidv4(),
    name: 'countDocuments',
    path: '/api/users/count',
    method: 'GET',
    description: 'Count users based on query parameters',
    category: 'Read',
    params: [
      {
        name: 'query',
        type: 'object',
        required: false,
        description: 'Query criteria in JSON format',
        defaultValue: '{}'
      }
    ],
    exampleRequest: {
      "active": true
    },
    exampleResponse: {
      success: true,
      data: 5
    }
  },
  {
    id: uuidv4(),
    name: 'updateOne',
    path: '/api/users/one',
    method: 'PUT',
    description: 'Update a single user document',
    category: 'Update',
    body: [
      {
        name: 'filter',
        type: 'object',
        required: true,
        description: 'Filter criteria to find the document to update'
      },
      {
        name: 'update',
        type: 'object',
        required: true,
        description: 'Update operations to apply'
      }
    ],
    exampleRequest: {
      "filter": { "email": "john@example.com" },
      "update": {
        "$set": {
          "age": 31,
          "city": "Chicago"
        }
      }
    },
    exampleResponse: {
      success: true,
      data: {
        acknowledged: true,
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0,
        upsertedId: null
      }
    }
  },
  {
    id: uuidv4(),
    name: 'updateMany',
    path: '/api/users/many',
    method: 'PUT',
    description: 'Update multiple user documents',
    category: 'Update',
    body: [
      {
        name: 'filter',
        type: 'object',
        required: true,
        description: 'Filter criteria to find documents to update'
      },
      {
        name: 'update',
        type: 'object',
        required: true,
        description: 'Update operations to apply'
      }
    ],
    exampleRequest: {
      "filter": {
        "city": "New York"
      },
      "update": {
        "$set":
        {
          "active": false
        }
      }
    },
    exampleResponse: {
      success: true,
      data: {
        acknowledged: true,
        matchedCount: 2,
        modifiedCount: 2,
        upsertedCount: 0,
        upsertedId: null
      }
    }
  },
  {
    id: uuidv4(),
    name: 'replaceOne',
    path: '/api/users/replace',
    method: 'PUT',
    description: 'Replace a single user document',
    category: 'Update',
    body: [
      {
        name: 'filter',
        type: 'object',
        required: true,
        description: 'Filter criteria to find the document to replace'
      },
      {
        name: 'replacement',
        type: 'object',
        required: true,
        description: 'New document to replace the old one'
      }
    ],
    exampleRequest: {
      filter: { email: 'john@example.com' },
      replacement: {
        name: 'John Smith',
        email: 'john@example.com',
        age: 32,
        city: 'Dallas',
        active: true
      }
    },
    exampleResponse: {
      success: true,
      data: {
        acknowledged: true,
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0,
        upsertedId: null
      }
    }
  },
  {
    id: uuidv4(),
    name: 'deleteOne',
    path: '/api/users/one',
    method: 'DELETE',
    description: 'Delete a single user document',
    category: 'Delete',
    body: [
      {
        name: 'filter',
        type: 'object',
        required: true,
        description: 'Filter criteria to find the document to delete'
      }
    ],
    exampleRequest: {
      filter: { email: 'john@example.com' }
    },
    exampleResponse: {
      success: true,
      data: {
        acknowledged: true,
        deletedCount: 1
      }
    }
  },
  {
    id: uuidv4(),
    name: 'deleteMany',
    path: '/api/users/many',
    method: 'DELETE',
    description: 'Delete multiple user documents',
    category: 'Delete',
    body: [
      {
        name: 'filter',
        type: 'object',
        required: true,
        description: 'Filter criteria to find documents to delete'
      }
    ],
    exampleRequest: {
      filter: { active: false }
    },
    exampleResponse: {
      success: true,
      data: {
        acknowledged: true,
        deletedCount: 3
      }
    }
  },
  {
    id: uuidv4(),
    name: 'aggregate',
    path: '/api/users/aggregate',
    method: 'GET',
    description: 'Perform aggregation operations on users',
    category: 'Aggregate',
    params: [
      {
        name: 'pipeline',
        type: 'array',
        required: false,
        description: 'Aggregation pipeline stages in JSON format',
        defaultValue: '[{"$group": {"_id": "$city", "count": {"$sum": 1}}}]'
      }
    ],
    exampleRequest: [
      {
        $match: {
          active: true
        }
      },
      {
        $group:
        {
          _id: null,
          averageAge: {
            $avg: "$age"
          }
        }
      }
    ],
    exampleResponse: {
      success: true,
      data: [
        { _id: 'New York', count: 2 },
        { _id: 'Boston', count: 1 },
        { _id: 'Chicago', count: 1 },
        { _id: 'Seattle', count: 1 }
      ]
    }
  },
  {
    id: uuidv4(),
    name: 'createIndex',
    path: '/api/users/index',
    method: 'POST',
    description: 'Create an index on a field',
    category: 'Index',
    body: [
      {
        name: 'field',
        type: 'string',
        required: true,
        description: 'Field name to create index on'
      },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: 'Index options',
        defaultValue: {}
      }
    ],
    exampleRequest: {
      field: 'email',
      options: { unique: true }
    },
    exampleResponse: {
      success: true,
      data: 'email_1'
    }
  },
  {
    id: uuidv4(),
    name: 'dropIndex',
    path: '/api/users/index',
    method: 'DELETE',
    description: 'Drop an index',
    category: 'Index',
    body: [
      {
        name: 'indexName',
        type: 'string',
        required: true,
        description: 'Name of the index to drop'
      }
    ],
    exampleRequest: {
      indexName: 'email_1'
    },
    exampleResponse: {
      success: true,
      data: { nIndexesWas: 2, ok: 1 }
    }
  },
  {
    id: uuidv4(),
    name: 'getIndexes',
    path: '/api/users/indexes',
    method: 'GET',
    description: 'Get all indexes for the users collection',
    category: 'Index',
    exampleRequest: {
      "User Message": "No request body needed"
    },
    exampleResponse: {
      success: true,
      data: [
        {
          v: 2,
          key: { _id: 1 },
          name: '_id_',
          ns: 'mongodb-api.users'
        },
        {
          v: 2,
          key: { email: 1 },
          name: 'email_1',
          ns: 'mongodb-api.users',
          unique: true
        }
      ]
    }
  },
  {
    id: uuidv4(),
    name: 'findOneAndUpdate',
    path: '/api/users/findAndUpdate',
    method: 'PUT',
    description: 'Find a single user document and update it',
    category: 'Update',
    body: [
      {
        name: 'filter',
        type: 'object',
        required: true,
        description: 'Filter criteria to find the document to update'
      },
      {
        name: 'update',
        type: 'object',
        required: true,
        description: 'Update operations to apply'
      },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: 'Options for the operation',
        defaultValue: { returnDocument: 'after' }
      }
    ],
    exampleRequest: {
      filter: { email: 'john@example.com' },
      update: { $set: { age: 33 } },
      options: { returnDocument: 'after' }
    },
    exampleResponse: {
      success: true,
      data: {
        _id: '60d21b4967d0d8992e610c85',
        name: 'John Doe',
        email: 'john@example.com',
        age: 33,
        city: 'New York',
        active: true,
        createdAt: '2023-06-20T12:00:00.000Z'
      }
    }
  },
  {
    id: uuidv4(),
    name: 'findOneAndDelete',
    path: '/api/users/findAndDelete',
    method: 'DELETE',
    description: 'Find a single user document and delete it',
    category: 'Delete',
    body: [
      {
        name: 'filter',
        type: 'object',
        required: true,
        description: 'Filter criteria to find the document to delete'
      }
    ],
    exampleRequest: {
      filter: { email: 'john@example.com' }
    },
    exampleResponse: {
      success: true,
      data: {
        _id: '60d21b4967d0d8992e610c85',
        name: 'John Doe',
        email: 'john@example.com',
        age: 33,
        city: 'New York',
        active: true,
        createdAt: '2023-06-20T12:00:00.000Z'
      }
    }
  },
  {
    id: uuidv4(),
    name: 'bulkWrite',
    path: '/api/users/bulk',
    method: 'POST',
    description: 'Perform multiple write operations in a single request',
    category: 'Bulk',
    body: [
      {
        name: 'operations',
        type: 'array',
        required: true,
        description: 'Array of write operations'
      }
    ],
    exampleRequest: {
      operations: [
        {
          insertOne: {
            document: {
              name: 'Sam Wilson',
              email: 'sam@example.com',
              age: 28,
              city: 'Chicago',
              active: true
            }
          }
        },
        {
          updateOne: {
            filter: { email: 'john@example.com' },
            update: { $set: { age: 34 } }
          }
        },
        {
          deleteOne: {
            filter: { email: 'jane@example.com' }
          }
        }
      ]
    },
    exampleResponse: {
      success: true,
      data: {
        acknowledged: true,
        insertedCount: 1,
        matchedCount: 1,
        modifiedCount: 1,
        deletedCount: 1,
        upsertedCount: 0,
        upsertedIds: {}
      }
    }
  },
  {
    id: uuidv4(),
    name: 'findOneAndReplace',
    path: '/api/users/findAndReplace',
    method: 'PUT',
    description: 'Find a single user document and replace it',
    category: 'Update',
    body: [
      {
        name: 'filter',
        type: 'object',
        required: true,
        description: 'Filter criteria to find the document to replace'
      },
      {
        name: 'replacement',
        type: 'object',
        required: true,
        description: 'New document to replace the old one'
      },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: 'Options for the operation',
        defaultValue: { returnDocument: 'after' }
      }
    ],
    exampleRequest: {
      filter: { email: 'john@example.com' },
      replacement: {
        name: 'John Johnson',
        email: 'john@example.com',
        age: 35,
        city: 'Miami',
        active: true
      },
      options: { returnDocument: 'after' }
    },
    exampleResponse: {
      success: true,
      data: {
        _id: '60d21b4967d0d8992e610c85',
        name: 'John Johnson',
        email: 'john@example.com',
        age: 35,
        city: 'Miami',
        active: true,
        createdAt: '2023-06-20T12:00:00.000Z'
      }
    }
  },
  {
    id: uuidv4(),
    name: 'renameCollection',
    path: '/api/collections/rename',
    method: 'PUT',
    description: 'Rename a collection',
    category: 'Collection',
    body: [
      {
        name: 'oldName',
        type: 'string',
        required: true,
        description: 'Current name of the collection'
      },
      {
        name: 'newName',
        type: 'string',
        required: true,
        description: 'New name for the collection'
      }
    ],
    exampleRequest: {
      oldName: 'users',
      newName: 'people'
    },
    exampleResponse: {
      success: true,
      message: 'Collection renamed successfully from "users" to "people"'
    }
  },
  {
    id: uuidv4(),
    name: 'dropCollection',
    path: '/api/collections/drop',
    method: 'DELETE',
    description: 'Drop a collection',
    category: 'Collection',
    exampleRequest: {},
    exampleResponse: {
      success: true,
      message: 'Collection drop would occur here'
    }
  },
  {
    id: uuidv4(),
    name: 'listCollections',
    path: '/api/collections',
    method: 'GET',
    description: 'List all collections in the database',
    category: 'Collection',
    exampleRequest: {},
    exampleResponse: {
      success: true,
      data: [
        {
          name: 'users',
          type: 'collection',
          options: {},
          info: { readOnly: false, uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }
        }
      ]
    }
  },
  {
    id: uuidv4(),
    name: 'getAllData',
    path: '/api/all',
    method: 'GET',
    description: 'Get all data from the users collection',
    category: 'Utility',
    exampleRequest: {},
    exampleResponse: {
      success: true,
      data: [
        {
          _id: '60d21b4967d0d8992e610c85',
          name: 'Alice',
          email: 'alice@example.com',
          age: 28,
          city: 'New York',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        },
        {
          _id: '60d21b4967d0d8992e610c86',
          name: 'Bob',
          email: 'bob@example.com',
          age: 35,
          city: 'Chicago',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        }
      ]
    }
  },
  {
    id: uuidv4(),
    name: 'resetDatabase',
    path: '/api/reset',
    method: 'DELETE',
    description: 'Clear all data in the users collection',
    category: 'Utility',
    exampleRequest: {},
    exampleResponse: {
      success: true,
      message: 'Database reset'
    }
  },
  {
    id: uuidv4(),
    name: 'seedDatabase',
    path: '/api/seed',
    method: 'POST',
    description: 'Seed the database with sample user data',
    category: 'Utility',
    exampleRequest: {},
    exampleResponse: {
      success: true,
      data: [
        {
          _id: '60d21b4967d0d8992e610c85',
          name: 'Alice',
          email: 'alice@example.com',
          age: 28,
          city: 'New York',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        },
        {
          _id: '60d21b4967d0d8992e610c86',
          name: 'Bob',
          email: 'bob@example.com',
          age: 35,
          city: 'Chicago',
          active: true,
          createdAt: '2023-06-20T12:00:00.000Z'
        }
      ]
    }
  }
];

export const getEndpointsByCategory = () => {
  return endpoints.reduce((acc, endpoint) => {
    if (!acc[endpoint.category]) {
      acc[endpoint.category] = [];
    }
    acc[endpoint.category].push(endpoint);
    return acc;
  }, {});
};

export const getEndpointById = (id) => {
  return endpoints.find(endpoint => endpoint.id === id);
};

export const getEndpointByName = (name) => {
  return endpoints.find(endpoint => endpoint.name === name);
};