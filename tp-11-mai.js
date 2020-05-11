//1 - Prendre 3 points dans paris, mettre dans une collection

db.tp.insert({
    name: "Tuileries",
    location: { type: "Point", coordinates: [2.3241233825683594, 48.86448891012796] },
});

db.tp.insert({
    name: "Tricadero",
    location: { type: "Point", coordinates: [2.2889328002929688, 48.861778610526805] },
});

db.tp.insert({
    name: "Montsouris",
    location: { type: "Point", coordinates: [2.3383712768554688, 48.822406260848375] },
});

//2 - Prendre un point aléatoire dans paris, trouver le point le plus proche

db.tp.createIndex({ location: "2dsphere" })

db.tp.aggregate([
    {
        $geoNear: {
            near: { type: "Point", coordinates: [2.319488525390625, 48.85726111835348] },
            spherical: true,
            distanceField: "calcDistance"
        }
    },
    { $limit: 1 }
])
// ou
db.tp.find(
    {
        location:
        {
            $near:
            {
                $geometry: { type: "Point", coordinates: [2.319488525390625, 48.85726111835348] },
            }
        }
    }
).limit(1)
// ou
db.tp.findOne(
    {
        location:
        {
            $near:
            {
                $geometry: { type: "Point", coordinates: [2.319488525390625, 48.85726111835348] },
            }
        }
    }
)

//3 - Faire une zone contenant 2 des 3 points (ne pas oublier de fermer la zone, triangle 4 points, carré 5...)

db.tp.find(
    {
        location: {
            $geoWithin: {
                $geometry: {
                    type: "Polygon",
                    coordinates: [[[2.319488525390625, 48.85726111835348], [2.341289520263672, 48.87019135286425], [2.268247604370117, 48.859406977973094], [2.319488525390625, 48.85726111835348]]]
                }
            }
        }
    }
)

//4 - Trouver un point tous les points aux alentours avec un certain rayon

db.tp.find(
    {
        location: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [2.319488525390625, 48.85726111835348]
                },
                $maxDistance: 3000 // 3km
            }
        }
    }
)