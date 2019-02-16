'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SKIP_MATCHES = exports.SKIP_MATCHES = 'File Matches, skipped %s';
var UPLOAD_SUCCESS = exports.UPLOAD_SUCCESS = 'Uploaded: %s/%s';
var ERR_UPLOAD = exports.ERR_UPLOAD = 'Upload error: %s (%s)';
var ERR_CHECKSUM = exports.ERR_CHECKSUM = 'Update prevented: local hash is %s but bucket hash is %s for %s';
var DELETE_SUCCESS = exports.DELETE_SUCCESS = 'Deleted: %s';
var ABORT_UPLOAD = exports.ABORT_UPLOAD = 'Unexpected error: (%s) %s, aborting upload for %s';
var INVALIDATE_SUCCESS = exports.INVALIDATE_SUCCESS = 'Invalidated: %s';
var INVALIDATE_ERROR = exports.INVALIDATE_ERROR = 'Invalidate error: %s (%s)';