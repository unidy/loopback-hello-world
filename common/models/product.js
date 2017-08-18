'use strict';

module.exports = function(Product) {
  Product.status = function(id, cb) {
    console.log('id:' + id);
    // console.log('cb:' + cb);
    // return id > 0 ? 'in store' : 'sold out';
    Product.findById(id, function(err, prod) {
      console.log(id);
      console.log(prod);
      console.log('count' + ':' + prod.count);
      var status = prod.count > 0 ? 'in store' : 'sold out';
      console.log('status:' + status);
      return status;
    });
  };
  Product.remoteMethod(
    'status',
    {
      http: {
        path: '/status',
        verb: 'get',
      },
      accepts: {
        arg: 'id',
        type: 'number',
        http: {source: 'query'},
      },
      returns: {
        arg: 'status',
        type: 'string',
      },
    }
  );
};
