// This file is kept for reference but no longer needed in JavaScript
// The types are now handled through JSDoc comments and runtime validation

/**
 * @typedef {Object} ApiEndpoint
 * @property {string} id
 * @property {string} name
 * @property {string} path
 * @property {('GET'|'POST'|'PUT'|'DELETE'|'PATCH'|'OPTIONS')} method
 * @property {string} description
 * @property {string} category
 * @property {ParamField[]} [params]
 * @property {BodyField[]} [body]
 * @property {HeaderField[]} [headers]
 * @property {any} [exampleRequest]
 * @property {any} [exampleResponse]
 */

/**
 * @typedef {Object} ParamField
 * @property {string} name
 * @property {string} type
 * @property {boolean} required
 * @property {string} description
 * @property {any} [defaultValue]
 */

/**
 * @typedef {Object} BodyField
 * @property {string} name
 * @property {string} type
 * @property {boolean} required
 * @property {string} description
 * @property {any} [defaultValue]
 */

/**
 * @typedef {Object} HeaderField
 * @property {string} name
 * @property {string} type
 * @property {boolean} required
 * @property {string} description
 * @property {string} [defaultValue]
 */

/**
 * @typedef {Object} RequestData
 * @property {string} id
 * @property {string} name
 * @property {string} url
 * @property {('GET'|'POST'|'PUT'|'DELETE'|'PATCH'|'OPTIONS')} method
 * @property {Object.<string, string>} headers
 * @property {Object.<string, string>} params
 * @property {any} body
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} ResponseData
 * @property {number} status
 * @property {string} statusText
 * @property {any} data
 * @property {Object.<string, string>} headers
 * @property {number} time
 * @property {number} size
 */

/**
 * @typedef {Object} Collection
 * @property {string} id
 * @property {string} name
 * @property {string} [description]
 * @property {RequestData[]} requests
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} Environment
 * @property {string} id
 * @property {string} name
 * @property {EnvironmentVariable[]} variables
 * @property {boolean} isActive
 */

/**
 * @typedef {Object} EnvironmentVariable
 * @property {string} key
 * @property {string} value
 * @property {boolean} enabled
 */

/**
 * @typedef {Object} ThemeConfig
 * @property {boolean} isDark
 * @property {string} accentColor
 */

/**
 * @typedef {Object} TabData
 * @property {string} id
 * @property {('request'|'collection'|'environment')} type
 * @property {(RequestData|Collection|Environment)} data
 * @property {boolean} isActive
 */