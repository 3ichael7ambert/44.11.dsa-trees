/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    // Helper function to perform a recursive traversal and accumulate the sum
    function calculateSum(node) {
      if (!node) {
        return 0;
      }
      // Add the current node's value and recursively sum the values of its children
      return node.val + node.children.reduce((acc, child) => acc + calculateSum(child), 0);
    }
    // Start the recursive calculation from the root
    return calculateSum(this.root);
  }
  

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {
    // Helper function to perform a recursive traversal and count the even nodes
    function countEvensRecursive(node) {
      if (!node) {
        return 0;
      }
      // Count the current node if its value is even
      let count = node.val % 2 === 0 ? 1 : 0;
      // Recursively count the even nodes in its children
      count += node.children.reduce((acc, child) => acc + countEvensRecursive(child), 0);
      return count;
    }
    // Start the recursive counting from the root
    return countEvensRecursive(this.root);
  }
  

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */
  numGreater(lowerBound) {
    // Helper function to perform a recursive traversal and count nodes greater than lowerBound
    function countGreaterRecursive(node) {
      if (!node) {
        return 0;
      }
      // Count the current node if its value is greater than lowerBound
      let count = node.val > lowerBound ? 1 : 0;
      // Recursively count nodes in its children that are greater than lowerBound
      count += node.children.reduce((acc, child) => acc + countGreaterRecursive(child), 0);
      return count;
    }
    // Start the recursive counting from the root
    return countGreaterRecursive(this.root);
  }
  
}

module.exports = { Tree, TreeNode };
