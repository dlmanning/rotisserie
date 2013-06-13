function Rotable(arr) {
  if (!(this instanceof Rotable))
    return new Rotable();

  this._arr = arr || [];
  this._columnCount = undefined;
  this._rowCount = undefined;

}

Rotable.prototype.transpose = function() {
  if (!this._arr) return new Error('blag');

  var arr = this._arr;

  var i, j
    , arrT = [];
  arrT[0] = [];

  for(i = arr.length - 1; i >= 0; i--) {
    if(Array.isArray(arr[i])) {
      for(j = arr[i].length - 1; j >= 0; j--) {
        arrT[j] = arrT[j] || [];
        arrT[j][i] = arr[i][j];
      }
    } else {
      arrT[0][i] = arr[i];
    }
  }

  this._arr = arrT;

  return this;
}

Rotable.prototype.getColumnCount = function() {
  if(this._columnCount) // be lazy
    return this._columnCount;

  var i, currentRowColumns = 0, columnCount = 0
    , arr = this._arr;

  for(i = arr.length - 1; i >= 0; i--) {
    currentRowColumns = arr[i].length;
    columnCount = (currentRowColumns > columnCount) ? currentRowColumns : columnCount;
  }

  this._columnCount = columnCount;

  return columnCount;
}

module.exports = Rotable;
