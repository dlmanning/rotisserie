function Rot(arr) {
  if (!(this instanceof Rot))
    return new Rot();
  this._arr = arr || [];
}

Rot.prototype.transpose = function() {
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

module.exports = Rot;
