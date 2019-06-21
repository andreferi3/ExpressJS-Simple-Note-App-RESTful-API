'use strict'

var model = require("../models/index");

exports.get = async (req,res,next) => {
    try {
        const category = await model.category.findAll({});
        if (category.length !== 0) {
            res.json({
            'status': 'OK',
            'messages': '',
            'data': category
            })
        } else {
            res.json({
            'status': 'ERROR',
            'messages': 'EMPTY',
            'data': {}
            })
        }
        } catch (err) {
        res.json({
            'status': 'ERROR',
            'messages': err.messages,
            'data': {}
        })
    }
}

exports.add = async (req, res, next) => {
    try {
        const {
          name
        } = req.body;
        const category = await model.category.create({
          name
        });
      if (category) {
        res.status(201).json({
          'status': 'OK',
          'messages': 'Success add a new category!',
          'data': category,
        })
      }
     } catch (err) {
       res.status(400).json({
         'status': 'ERROR',
         'messages': err.message,
         'data': {},
       })
    }
}

exports.update = async (req, res, next) => {
    try {
        const catId = req.params.id;
        const {
            name
        } = req.body;

        const category = await model.category.update({
            name
        }, {
            where: {
                id : catId
            }
        });

        if(category) {
            res.json({
                status: "OK",
                message: "Success update category!",
                data: category
            });
            res.end();
        }
    } catch (err) {
        res.status(404).json({
            status: 404,
            message: err.message,
            data: {},
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        const catId = req.params.id;
        const category = await model.category.destroy({ where: {
            id: catId
          }})
          if (category) {
            res.json({
              'status': 'OK',
              'messages': 'Success delete category',
              'data': category,
            })
          }
        } catch (err) {
          res.status(400).json({
            'status': 'ERROR',
            'messages': err.message,
            'data': {},
          })
    }
}

exports.getByCategory = async (req, res, next) => {
  await model.category.findAll({
    where : {id: req.params.id},
    include: [{model: model.notes}]
  }).then(data => {
    res.status(200).json({
      status: "OK",
      message: "Data loaded",
      result: data
    });
  })
}