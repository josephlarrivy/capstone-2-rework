
const db = require('../db')
const { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError } = require('../ExpressError')




class Trip {

  static async generateRandomString(length) {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }
    return result;
  }

  static async addTripName ({tripname, username}) {
    const key = this.generateRandomString(10)
    const result = await db.query (
      `INSERT INTO tripnames
        (id, tripname, username) VALUES ($1, $2, $3) RETURNING tripname, username`, [key, tripname, username],
    );
    const giveDataBack = result.rows[0]
    console.log('Trip Model')
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