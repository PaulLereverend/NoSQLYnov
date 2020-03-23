db.createCollection('sport');
db.sport.insertOne({ 'nom': 'foot', 'description': '', 'ballon': true, 'taille_terrain': 50 });
db.sport.update({ 'nom': 'tennis' }, { $set: { 'nom': 'tennis', 'title': 'sport de raquette', 'requireTeam': true } }, { upsert: true });
db.sport.update({ 'nom': 'foot' }, { $set: { 'title': 'sport de balon', 'requireTeam': true } }, { upsert: true });
db.sport.insertOne({ 'nom': 'ping-pong', 'description': '', 'ballon': false, 'taille_terrain': 0, 'requireTeam': false });

db.sport.updateMany({ 'requireTeam': true }, { $set: { 'minJoueur': 4 } });
db.sport.updateMany({ 'requireTeam': true }, { $inc: { 'minJoueur': 10 } });


db.sport.update({}, { $set: { "team": [] } }, false, true);

db.sport.updateMany({ 'requireTeam': true }, { $push: { 'team': { $each: [{ 'nom': 'bruce', 'prenom': 'lee', 'numero': 14 }, { 'nom': 'bond', 'prenom': 'james', 'numero': 007 }] } } });

db.sport.updateMany({ 'team.nom': 'bruce' }, { $set: { "team.$.titulaire": true } });
//db.sport.updateMany({ 'team.nom': {$exists: true} },  { $set: { "team.$.titulaire" : false } }); ne fonctionne pas ?

