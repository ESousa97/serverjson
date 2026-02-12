const { createHandler } = require('./createHandler');
const { ok } = require('./respond');
const { query, getQuery } = require('../db');

/**
 * Factory that produces a GET handler which runs a named query
 * (no parameters) and returns all rows.
 *
 * Eliminates the boilerplate duplicated across simple "list-all" endpoints
 * such as /api/cardlist and /api/categories.
 *
 * @param {string} queryName - Key defined in db.json → queries
 * @returns {Function} Express/Vercel-compatible handler
 */
function createListHandler(queryName) {
  return createHandler(async (_req, res) => {
    const { rows } = await query(getQuery(queryName), []);
    return ok(res, rows);
  });
}

module.exports = { createListHandler };
