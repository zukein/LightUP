"use strict";

const Subscriber = require("../models/subscriber"),
  getSubscriberParams = body => {
    return {
      name: body.name,
      email: body.email,
      zipCode: parseInt(body.zipCode)
    };
  };

module.exports = {
  index: (req, res, next) => {
    Subscriber.find()
      .then(subscribers => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch(error => {
        console.log(`Error subscribers: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("exposure/subscribers/index", {
      path: '/exposures',
      pageTitle: 'Exposure Category '
    });
  },

  new: (req, res) => {
    res.render("exposure/subscribers/new", {
      path: '/exposures',
      pageTitle: 'Exposure Category '
    });
  },

  create: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error 保存できません: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error IDで取得できません: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("exposure/subscribers/show", {
      path: '/exposures',
      pageTitle: 'Exposure Category '
    });
  },

  edit: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.render("exposure/subscribers/edit", {
          subscriber: subscriber,
          path: '/exposures',
          pageTitle: 'Exposure 編集'
        });
      })
      .catch(error => {
        console.log(`Error IDで取得できません: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let subscriberId = req.params.id,
      subscriberParams = getSubscriberParams(req.body);

    Subscriber.findByIdAndUpdate(subscriberId, {
      $set: subscriberParams
    })
      .then(subscriber => {
        res.locals.redirect = `/subscribers/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error IDで更新できません: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId)
      .then(() => {
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch(error => {
        console.log(`Error IDで削除できません: ${error.message}`);
        next();
      });
  }
};
