const mongoose = require('mongoose');
const mongoURI = 'Your DB URL'

const mongoDB = async () => {

    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {

        if (err) {
            console.log("ERROR CONNECTING", err);
        }

        else {
            console.log("CONNECTED");

            const fetched_data = await mongoose.connection.db.collection("fooddata")
            fetched_data.find({}).toArray(function name(err, data) {

                const foodcategory = mongoose.connection.db.collection("foodcategory")
                foodcategory.find({}).toArray(function name(err, catData) {
                    if (err) console.log(err)
                    else {
                        global.fooddata = data;
                        global.foodcategory =catData;

                    }
                })



                // if (err) console.log(err)
                // else {
                //     global.fooddata = data;
                //     // console.log(global.fooddata)
                // }

            })
        }

    })


}

module.exports = mongoDB();