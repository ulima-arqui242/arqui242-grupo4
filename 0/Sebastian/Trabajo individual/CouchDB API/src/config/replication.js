const nano = require('nano');

const user = 'admin';
const password = 'admin';

// Conexión a CouchDB con autenticación
const couchdb = nano(`http://${user}:${password}@127.0.0.1:5984`); 

couchdb.db.replicate('users', 'users_replication', {
    create_target: true,
    continuous: true // Activamos la replicación continua
  }, (err, body) => {
    if (!err) {

      console.log('Replication from users to users_replication started');
    } else {
      console.log('Error in replication from users to users_replication: ', err);
    }
  });