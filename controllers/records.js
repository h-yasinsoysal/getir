const Record = require('../models/record');

async function getRecords(req, res) {
    const {startDate, endDate, minCount, maxCount} = req.body;

    let response;
    try {
        if (Number.isInteger(minCount)) {
            if (Number.isInteger(maxCount)) {
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
                                $gt: new Date(startDate),
                                $lt: new Date(endDate)
                            },
                            totalCount: {
                                $gt: parseInt(minCount),
                                $lt: parseInt(maxCount)
                            }
                        }
                    }
                ]);

                if (records.length > 1) {
                    response = {
                        code: 0,
                        msg: 'Success', records
                    };

                } else {
                    response = {
                        code: 1,
                        msg: 'There is no record.'
                    }
                }

                res.status(200);
            } else {
                response = {
                    code: -1,
                    msg: 'Requested parameter' + minCount + ' is not correct. Please try again!'
                };
                res.status(422);

            }
        } else {
            response = {
                code: -1,
                msg: 'Requested parameters ' + maxCount + ' is not correct. Please try again!'
            };
            res.status(422);
        }


    } catch (e) {
        console.error(e);
        response = {
            code: -1,
            msg: 'Requested parameters ' + req.body + ' is not correct. Please try again!'
        };
        res.status(422)
    } finally {
        res.json(response)
    }

}


module.exports = {getRecords};