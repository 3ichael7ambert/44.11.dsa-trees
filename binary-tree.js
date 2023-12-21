/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth() {
    // Helper function to calculate the minimum depth of a node
    function calculateMinDepth(node) {
      // Base case: If the node is null, return 0
      if (node === null) {
        return 0;
      }
      // If the node is a leaf, return 1
      if (node.left === null && node.right === null) {
        return 1;
      }
      // Recursive cases: Calculate the minimum depth for the left and right subtrees
      const leftDepth = calculateMinDepth(node.left);
      const rightDepth = calculateMinDepth(node.right);
  
      // Return the minimum depth by adding 1 to the minimum depth of the smaller subtree
      return 1 + Math.min(leftDepth, rightDepth);
    }
    // Start the recursive calculation from the root
    return calculateMinDepth(this.root);
  }
  

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth() {
    // Helper function to calculate the maximum depth of a node
    function calculateMaxDepth(node) {
      // Base case: If the node is null, return 0
      if (node === null) {
        return 0;
      }
      // Recursive cases: Calculate the maximum depth for the left and right subtrees
      const leftDepth = calculateMaxDepth(node.left);
      const rightDepth = calculateMaxDepth(node.right);
      // Return the maximum depth by adding 1 to the maximum depth of the larger subtree
      return 1 + Math.max(leftDepth, rightDepth);
    }
    // Start the recursive calculation from the root
    return calculateMaxDepth(this.root);
  }
  

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    if (!this.root) {
      // Return 0 for an empty tree
      return 0;
    }
    // Helper function to perform a recursive traversal and calculate the maximum path sum
    function calculateMaxSum(node) {
      if (!node) {
        return 0;
      }
      const leftSum = Math.max(0, calculateMaxSum(node.left));
      const rightSum = Math.max(0, calculateMaxSum(node.right));
  
      const currentSum = node.val + leftSum + rightSum;
      // Update the global maxSum if the current path sum is greater
      maxSum = Math.max(maxSum, currentSum);
  
      // Return the maximum path sum considering the current node
      return node.val + Math.max(leftSum, rightSum);
    }
    // Initialize the global maxSum to negative infinity
    let maxSum = Number.NEGATIVE_INFINITY;
    // Start the recursive calculation from the root
    calculateMaxSum(this.root);
    // Return the calculated maxSum
    return maxSum;
  }
  
  
  

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    if (!this.root) {
      return null;
    }
    let current = this.root;
    let stack = [];
    let result = null;
    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      if (current.val > lowerBound) {
        // Update result if the current node's value is larger than the lowerBound
        if (result === null || current.val < result) {
          result = current.val;
        }
      }
      current = current.right;
    }
    return result;
  }
  

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */
  areCousins(node1, node2) {
    if (!this.root) {
      return false;
    }
    // Helper function to find the level and parent of a given node
    function findLevelAndParent(root, target, level, parent) {
      if (root === null) {
        return null;
      }
      if (root === target) {
        return { level, parent };
      }
      const leftResult = findLevelAndParent(root.left, target, level + 1, root);
      const rightResult = findLevelAndParent(root.right, target, level + 1, root);
      return leftResult || rightResult;
    }
    const info1 = findLevelAndParent(this.root, node1, 0, null);
    const info2 = findLevelAndParent(this.root, node2, 0, null);
    // Nodes must exist in the tree and have the same level
    if (info1 && info2 && info1.level === info2.level) {
      // Nodes must have different parents
      return info1.parent !== info2.parent;
    }
    return false;
  }
  

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */
  static serialize(tree) {
    if (!tree.root) {
      return '[]'; // Return an empty array representation for an empty tree
    }
    // Helper function to perform a recursive pre-order traversal for serialization
    function serializeNode(node) {
      if (node === null) {
        return 'null';
      }
      const leftSerialized = serializeNode(node.left);
      const rightSerialized = serializeNode(node.right);
      return `${node.val},${leftSerialized},${rightSerialized}`;
    }
    const rootSerialized = serializeNode(tree.root);
    return `[${rootSerialized}]`;
  }
  

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  static deserialize(serializedTree) {
    if (serializedTree === '[]') {
      return new BinaryTree(); // Return an empty tree for an empty array representation
    }
    const nodes = serializedTree.slice(1, -1).split(',');
    // Helper function to perform a recursive pre-order traversal for deserialization
    function deserializeNode() {
      const val = nodes.shift();
      if (val === 'null') {
        return null;
      }
      const node = new BinaryTreeNode(parseInt(val, 10));
      node.left = deserializeNode();
      node.right = deserializeNode();
      return node;
    }
    const root = deserializeNode();
    return new BinaryTree(root);
  }
  

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */
  lowestCommonAncestor(node1, node2) {
    // Helper function to find the lowest common ancestor
    function findLCA(root, p, q) {
      if (root === null || root === p || root === q) {
        return root;
      }
      const leftLCA = findLCA(root.left, p, q);
      const rightLCA = findLCA(root.right, p, q);
      // If both nodes are found in different subtrees, the current root is the LCA
      if (leftLCA && rightLCA) {
        return root;
      }
      // Otherwise, return the non-null result (either left or right LCA)
      return leftLCA || rightLCA;
    }
    // Start the recursive search from the root
    return findLCA(this.root, node1, node2);
  }
  

}

module.exports = { BinaryTree, BinaryTreeNode };
