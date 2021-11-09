// From https://stackoverflow.com/questions/26785458/a-vector-class-in-javascript

class Vector extends Array {

    constructor(array) {
      // Handle special case of length 1 array, 
      // since Array with one numeric argument 
      // creates an Array with that many empty slots
      if (array.length === 1) {
        super();
        this.push(array[0]);
      } else
        super(...array);
    }

    add(other) {
      return this.map((e, i) => e + other[i]);
    }
  
    scale(s) {
      return this.map(e => s * e);
    }
  }