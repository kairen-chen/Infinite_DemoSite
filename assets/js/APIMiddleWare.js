"use strict";

if (!Array.prototype.find) {
    Array.prototype.find = function (callback) {
    return callback && (this.filter(callback) || [])[0];
  };
}

var create_action = function(item) {
  return API.create(item);
};

var read_action = function() {
  return API.read();
};

var update_action = function(data, _ref) {
  var id = _ref.id;
  var item = data.find(function (item) {
    return item.id == id;
  });
  if (!item) return false;
  item = Object.assign({}, item, _ref);
  return API.update({ id: id, item: item });
};

var delete_action = function(id) {
  return API.delete(id);
};

// let create_action = (item) => {
//     return API.create(item)
// }

// let read_action = () => {
//     return API.read()
// }

// let update_action = (data,{id,title}) => {
//     let item =data.find( item =>{ return item.id == id });
//     if(!item) return false
//     item = Object.assign({}, item, { title });
//     return API.update({id,item})
// }

// let delete_action = (id) => {
//     return API.delete(id)
// }
