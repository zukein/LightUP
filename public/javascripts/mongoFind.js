const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017',
    dbName = 'LightUP';

mongoClient.connect(url, (err, client) => {
    if (!err) {
        process.on('SIGINT', () => {
            console.log('切断して終了します。');
            client.close();
        });
        console.log("MongoDBサーバへ接続しました。");
        const db = client.db(dbName),
            lightup = db.collection('courses');
        console.log("1.全件検索----------開始");
        lightup.find({}).toArray((err, docs) => {
            console.log("1.全件検索==========終了");
            console.log(docs);
        });
        console.log("2.一致検索----------開始");
        lightup.find({ "point": 12 }).toArray((err, docs) => {
            console.log("2.一致検索==========終了");
            console.log(docs);
        });
    }
});