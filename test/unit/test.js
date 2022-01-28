const Record = require('../../models/record');
const mongoose = require("mongoose");
const db = require('../../db');

jest.setTimeout(5000);
test('Query Result greater than 0', async (done) => {
    expect.assertions(1);
    try {
        const records = await Record.aggregate([

            {   // Sums the $counts and writes into totalCount
                $project: {
                    key: 1,
                    _id: 0,
                    createdAt: 1,
                    totalCount: {
                        $sum: '$counts'
                    }
                }
            },
            {
                // Set the limits of two dates
                $match: {
                    createdAt: {
                        $gt: new Date("2017-01-26"),
                        $lt: new Date("2017-01-27")
                    },
                    totalCount: {
                        $gt: 3000,
                        $lt: 3500
                    }
                }
            }
        ]);

        expect(records.length).not.toBe(0);

        mongoose.connection.close();
        done();
    } catch (e) {
        console.log(e)
    }
});
