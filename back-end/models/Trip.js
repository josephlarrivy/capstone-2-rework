
const db = require('../db')
const { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError } = require('../ExpressError')




class Trip {

  static async addTripName ({tripname, username}) {
    const result = await db.query (
      `INSERT INTO tripnames
        (tripname, username) VALUES ($1, $2) RETURNING tripname, username`, [tripname, username],
    );
    const giveDataBack = result.rows[0]
    return giveDataBack
  }


  static async addTripItem (
    { type, route, name, description, park, latitude, longitude }
  ) {
    const result = await db.query (
      `INSERT INTO tripitems
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