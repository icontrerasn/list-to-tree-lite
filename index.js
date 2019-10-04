
function getNestedKey(select, object) {
  let select = "contact.phone";
  let value = object;
  select.split(".").forEach(function(val){
    value = value[val];
  });
  return value
}

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.listToTree = factory();
  }
}(this, function () {
    'use strict';
    return function listToTree(data, options) {
      options = options || {};
      var ID_KEY = options.idKey || 'id';
      var PARENT_KEY = options.parentKey || 'parent';
      var CHILDREN_KEY = options.childrenKey || 'children';
      
      var tree = [], childrenOf = {};
      var item, id, parentId;

      for(var i = 0, length = data.length; i < length; i++) {
        item = data[i];
        id = getNestedKey(ID_KEY, item);
        parentId = getNestedKey(PARENT_KEY, item) || 0;
        // every item may have children
        childrenOf[id] = childrenOf[id] || [];
        // init its children
        getNestedKey(CHILDREN_KEY, item) = childrenOf[id];
        if (parentId != 0) {
          // init its parent's children object
          childrenOf[parentId] = childrenOf[parentId] || [];
          // push it into its parent's children object
          childrenOf[parentId].push(item);
        } else {
          tree.push(item);
        }    
      };

      return tree;
    }
}));