import mysql from 'mysql'

const db_config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  socketPath: process.env.DB_SOCKET,
};

let connection

/* istanbul ignore next */
function handleDisconnect() {
  connection = mysql.createConnection(db_config)

  connection.connect(err => {
    if(err) {
      console.error('error when connecting to db:', err)
      setTimeout(handleDisconnect, 2000);
    }
  })

  connection.on('error',err => {
    console.error('db error', err)
    if(err.code === 'PROTOCOL_CONNECTION_LOST') handleDisconnect()
    else throw err
  })
}

handleDisconnect()

export default connection
