function Rotable(arr) {
  if (!(this instanceof Rotable)) {
    return new Rotable();
  }

  this._arr = arr || [];
  this._columnCount = undefined;
  this._rowCount = undefined;
}

Rotable.prototype.transform = function(transformCB) {
  if(!this._arr) {
    return new Error('No array provided');
  }

  var arr = this._arr
    , arrM = []
    , i, j;

  for(i = arr.length - 1; i >= 0; i--) {
    if(Array.isArray(arr[i])) {
      for(j = arr[i].length - 1; j >= 0; j--) {
        if(arr[i][j] !== undefined) {
          arrM[i] = arrM[i] || [];
          arrM[i][j] = transformCB(arr[i][j]);
        }
      }
    } else {
      if(arr[i] !== undefined) {
        arrM[i] = transformCB(arr[i]);
      }
    }
  }

  this._arr = arrM;

  return this;
};

Rotable.prototype.transpose = function() {
  if (!this._arr) {
    return new Error('blag');
  }

  var arr = this._arr
    , arrT = []
    , i, j;

  for(i = arr.length - 1; i >= 0; i--) {
    if(Array.isArray(arr[i])) {
      for(j = arr[i].length - 1; j >= 0; j--) {
        arrT[j] = arrT[j] || [];
        if(arr[i][j] !== undefined) {
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

  var arr = this._arr
    , arrR = []
    , columnWidthIndex = this.getColumnCount() - 1
    , i, j;

  for (i = arr.length - 1; i >= 0; i--) {
    if(Array.isArray(arr[i])) {
      for (j = columnWidthIndex; j >= 0; j--) {
        arrR[i] = arrR[i] || [];
        if (arr[i][columnWidthIndex - j] !== undefined) {
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

Rotable.prototype.fillIn = function(fillWith) {
  if(!this._arr) {
    return new Error('No array provided');
  }

  var arr = this._arr
    , columnCount = this.getColumnCount()
    , rowCount = this.getRowCount()
    , i, j;

  for(i = 0; i < rowCount; i++) {
    if(Array.isArray(arr[i])) {
      for(j = 0; j < columnCount; j++) {
        if (arr[i][j] === undefined) {
          arr[i][j] = fillWith;
        }
      }
    } else {
      if(arr[i] === undefined) {
        arr[i] = fillWith;
      }
    }
  }

  this._arr = arr;

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
