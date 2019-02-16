'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contentType = contentType;
exports.createMd5Hash = createMd5Hash;
exports.base64Md5 = base64Md5;
exports.buildBaseParams = buildBaseParams;
exports.buildIndexes = buildIndexes;
exports.buildUploadParams = buildUploadParams;
exports.handleETag = handleETag;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the content type of the file, based on it's extension.
 * @param  {String} src Path to file fow which content type should be evaluated.
 * @return {String}     Returns string with content type and charset.
 */
function contentType(src, ext) {
  var type = _mime2.default.lookup(ext || src).replace('-', '');
  var charset = _mime2.default.charsets.lookup(type, null);

  if (charset) {
    type += '; charset=' + charset;
  }

  return type;
}

/**
 * Creates an MD5 hash of a give file.
 * @param  {String} data Contents of the file.
 * @return {String}      MD5 Hash of the file contents, returned as HEX string.
 */
function createMd5Hash(data) {
  return _crypto2.default.createHash('md5').update(data).digest('hex');
}

/**
 * Creates an MD5 hash of a give file.
 * @param  {String} data Contents of the file.
 * @return {String}      MD5 Hash of the file contents, returned as Base64 string.
 */
function base64Md5(data) {
  return _crypto2.default.createHash('md5').update(data).digest('base64');
}

/**
 * Returns a 'Key' attribute of a request to get info about file in AWS S3.
 * @param  {Object} file File object with information bout it's path.
 * @return {Object}      Returns an object with a 'Key' parameter,
 *                       being a base path of the file location, with slashes
 *                       removed from the path.
 */
function buildBaseParams(file, filePrefix, fileName) {
  var dest = _path2.default.relative(file.base, file.path).replace(/\\/g, '/');

  if (fileName) {
    dest = fileName.replace(/\\/g, '/');
  }
  if (filePrefix) {
    dest = filePrefix + '/' + dest;
  }
  return {
    Key: dest
  };
}

/**
 * Returns an array of aliases this file should be uploaded as, in the event
 * the filename matches the index specified.
 * @param  {String} file  File object, with all its details
 * @param  {String} index An index file name, which if the filename matches
 *                        will generate aliases.
 * @returns {Array} An array of Strings to act as aliases, or null if it's not an index.
 */
function buildIndexes(file, index) {

  // If there's no index specified, there's nothing to do.
  if (!index) {
    return Array();
  }

  // If the filename doesn't match the index, there's nothing to do.
  if (_path2.default.basename(file.path) !== index) {
    return Array();
  }

  var dest = _path2.default.relative(file.base, file.path).replace(/\\/g, '/');

  // The root object is handled separately on S3.
  if (_path2.default.dirname(dest) === '.') {
    return Array();
  }

  // Two aliases: the path name, and the path name with a trailing slash.
  return new Array(_path2.default.dirname(dest), _path2.default.dirname(dest) + '/');
}

/**
 * Takes a file object, and prepares parameters required during AWS S3 file upload.
 * @param  {Object} file File object, with all it's details.
 * @return {Object}      AWS S3 upload function parameters.
 */
function buildUploadParams(file, filePrefix, ext, fileName) {
  var params = Object.assign({
    ContentMD5: base64Md5(file.contents),
    Body: file.contents,
    ContentType: contentType(file.path, ext)
  }, buildBaseParams(file, filePrefix, fileName));

  return params;
}

function handleETag(opts) {
  if (opts.Metadata && opts.Metadata.ETag === true) {
    opts.Metadata.ETag = opts.ContentMD5;
  }

  return opts;
}