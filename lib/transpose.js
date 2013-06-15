function Rotable(arr) {
  if (!(this instanceof Rotable)) {
    return new Rotable();
  }

  this._arr = arr || [];
  this._columnCount = undefined;
  this._rowCount = undefined;
}

Rotable.prototype.transpose = function() {
  if (!this._arr) {
    return new Error('blag');
  }

  var arr = this._arr;

  var i, j
    , arrT = [];
  //var arrT[0] = [];

  for(i = arr.length - 1; i >= 0; i--) {
    if(Array.isArray(arr[i])) {
      for(j = arr[i].length - 1; j >= 0; j--) {
        arrT[j] = arrT[j] || [];
        if(arr[i][j]) {
          arrT[j][i] = arr[i][j];
        }
      }
    } else {
      arrT[0][i] = arr[i];
    }
  }

  this._dimensionsSwapped();
  this._arr = arrT;

  return this;
};

Rotable.prototype.rot180 = function() {
  if(!this._arr) {
    return new Error('No array provided');
  }

  var arr = this._arr;

  var i, j
    , columnWidthIndex = this.getColumnCount() - 1
    , arrR = [];

  for (i = arr.length - 1; i >= 0; i--) {
    if(Array.isArray(arr[i])) {
      for (j = columnWidthIndex; j >= 0; j--) {
        arrR[i] = arrR[i] || [];
        if (arr[i][columnWidthIndex - j]) {
          arrR[i][j] = arr[i][columnWidthIndex - j];
        }
      }
    } else {
      // todo
    }
  }

  this._arr = arrR;

  return this;
};

Rotable.prototype.getColumnCount = function() {
  if(this._columnCount)  { // be lazy
    return this._columnCount;
  }

  var i, currentRowColumns = 0, columnCount = 0
    , arr = this._arr;

  for(i = arr.length - 1; i >= 0; i--) {
    currentRowColumns = arr[i].length;
    columnCount = (currentRowColumns > columnCount) ? currentRowColumns : columnCount;
  }

  this._columnCount = columnCount;

  return columnCount;
};

Rotable.prototype.getRowCount = function() {
  if(this._rowCount)  { // be lazy
    return this._rowCount;
  }

  var rowCount = this._arr.length;
  this._rowCount = rowCount;

  return rowCount;
};

Rotable.prototype.toArray = function () {
  return this._arr;
};

Rotable.prototype._dimensionsSwapped = function() {
  var x = this._columnCount;

  this._columnCount = this._rowCount;
  this._rowCount = x;
};

module.exports = Rotable;
