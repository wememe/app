'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidate = undefined;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _MSG = require('./MSG');

var MSG = _interopRequireWildcard(_MSG);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Invalidate paths within AWS CloudFront distribution
 * @param  {String} distributionId CloudFront distribution ID
 * @param  {Array} paths An array of pathnames to invalidate
 * @return {Promise} Returns a promise which resolves with a log message of upload status or rejects with an error message
 */

var invalidate = exports.invalidate = function invalidate(distributionId) {
  var paths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['/'];
  return new Promise(function (resolve, reject) {

    var cloudfront = new _awsSdk2.default.CloudFront();
    var params = {
      DistributionId: distributionId,
      InvalidationBatch: {
        CallerReference: 's3-deploy-' + (Date.now() / 1000 | 0),
        Paths: {
          Quantity: paths.length,
          Items: paths.map(function (v) {
            return v.charAt(0) === '/' ? v : '/' + v;
          })
        }
      }
    };
    cloudfront.createInvalidation(params, function (err, data) {
      if (err) {
        console.log(err);
        return reject(_util2.default.format(MSG.INVALIDATE_ERROR, err, err.stack));
      }
      console.log('Invalidation ' + data.Invalidation.Id + ' is in progress...');
      return resolve(_util2.default.format(MSG.INVALIDATE_SUCCESS, paths));
    });
  });
};