'use strict'

exports.ok = (values, res) => {
    const data = {
        status: 200,
        value: values
    };

    res.json(data);
    res.end();
}