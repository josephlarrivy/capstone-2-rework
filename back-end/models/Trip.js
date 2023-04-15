
const db = require('../db')
const { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError } = require('../ExpressError')




class Trip {

  static async addTripName ({name}) {
    const result = await db.query (
      `INSERT INTO tripNames
        (name) VALUES ($1) RETURNING name`, [name],
    );
    const nameReturn = result.rows[0]
    return nameReturn
  }

  static async addTripItem (
    { type, route, name, description, park, latitude, longitude }
  ) {
    const result = await db.query (
      `INSERT INTO tripItems
        (type, route, name, description, park, latitude, longitude)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING route, name, description, park, latitude, longitude`,
      [type, route, name, description, park, latitude, longitude],
    );

    const item = result.rows[0]
    return item
  }


}



module.exports = Trip