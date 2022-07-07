// h.ts
function h(sel, data, children) {
  // ...
  return vnode(sel, data, children, text, undefined);
}

// vnode.ts
function vnode(sel, data, children, text, elm) {
  const key = data === undefined ? undefined : data.key;
  // 调用 `h` 函数时 elm 为 undefined, elm 在 `patch` 函数调用时和真实的 DOM 元素关联
  return { sel, data, children, text, elm, key };
}

// init.ts
function init(modules) {
  // ...
  return function patch(oldVnode, vnode) {
    let elm, parent;

    // oldVnode 是 DOM 元素 <= patch(container, vnode)
    if (isElement(oldVnode)) {
      // 创建空的 vnode 并关联到原来的 DOM 元素上
      oldVnode = emptyNodeAt(oldVnode);
    } else if (isDocumentFragment(oldVnode)) {
      oldVnode = emptyDocumentFragmentAt(oldVnode);
    }

    // oldVnode 是 vnode 对象 <= patch(vnode, newVnode)
    if (sameVnode(oldVnode, vnode)) {
      // oldVnode === vnode
      // 更新替换
      patchVnode(oldVnode, vnode);
    } else {
      // oldVnode !== vnode
      elm = oldVnode.elm;
      parent = parentNode(elm);

      // 删掉重建
      createElm(vnode);

      if (parent !== null) {
        insertBefore(parent, vnode.elm, nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }

    return vnode;
  };
}

function sameVnode(vnode1, vnode2) {
  // tag 标签和 key 键值两者都相同, 则认为是相同节点
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

// init.ts
function patchVnode(oldVnode, vnode) {
  // 将 vnode 和 oldVnode 节点都关联到 elm 这个 DOM 元素
  const elm = (vnode.elm = oldVnode.elm);

  const oldCh = oldVnode.children;
  const ch = vnode.children;

  if (oldVnode === vnode) return;

  // text 和 children 属性一般为互斥关系
  // - 有 text 属性时, chilren 属性一定为空;
  // - 没有 text 属性时, children 属性可以有值也可以为空.
  if (isUndef(vnode.text)) {
    //  => vnode.text === undefined => ch === undefined || ch !== undefined
    if (isDef(oldCh) && isDef(ch)) {
      // => oldCh !== undefined && ch !== undefined
      if (oldCh !== ch) updateChildren(elm, oldCh, ch); // 比较 oldCh 和 ch
    } else if (isDef(ch)) {
      // => oldCh === undefined && ch !== undefined
      if (isDef(oldVnode.text)) setTextContent(elm, "");
      // 添加新 ch
      addVnodes(elm, null, ch, 0, ch.length - 1);
    } else if (isDef(oldCh)) {
      // oldCh !== undefined && ch === undefined
      // 移除旧 oldCh
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    } else if (isDef(oldVnode.text)) {
      // oldCh === undefined && ch === undefined && oldVnode.text !== undefined
      // 移除旧 old.text, 即设置新 vnode.text = "" 空字符串
      setTextContent(elm, "");
    }
    // else => vnode.text !== undefined => ch === undefined
  } else if (oldVnode.text !== vnode.text) {
    // 移除旧 oldCh
    if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    }
    // 设置新 vnode.text
    setTextContent(elm, vnode.text);
  }
}

// init.js
function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];

  let oldKeyToIdx;
  let idxInOld;
  let elmToMove;
  let before;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // Vnode might have been moved left or right (节点可能已经向左/向右移动)
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // => oldStartVnode === newStartVnode
      // 新旧头节点相同
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // => oldEndVnode === newEndVnode
      // 新旧尾节点相同
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // => oldStartVnode === newEndVnode
      // 旧头节点和新尾节点相同
      // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode);
      // 将旧头节点移动到 oldCh 尾部, 成为新尾节点
      insertBefore(parentElm, oldStartVnode.elm, nextSibling(oldEndVnode.elm));
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // => oldEndVnode === newStartVnode
      // 旧尾节点和新头节点相同
      // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode);
      // 将旧尾节点移动到 oldCh 头部, 成为新头节点
      insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 新旧头尾节点都不相同
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      // if oldCh has newStartVnode's key (新头节点 newStartVnode 的 key 能否对应上旧节点数组 oldCh 中的某个节点的 key)
      idxInOld = oldKeyToIdx[newStartVnode.key];
      if (isUndef(idxInOld)) {
        // New element (新头节点 newStartVnode 是新节点)
        // 创建 newStartVnode 节点并移动到 oldCh 头部, 成为新头节点
        insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm);
      } else {
        // oldCh children's key match newStartVnode's key (新头节点 newStartVnode 在旧节点数组 oldCh 中存在)
        elmToMove = oldCh[idxInOld];
        if (elmToMove.sel !== newStartVnode.sel) {
          // sel is not equals, newStartVnode is still a new element (key 相同但是 sel 不相同, 新头节点 newStartVnode 依然是新元素)
          // 创建 newStartVnode 节点并移动到 oldCh 头部, 成为新头节点
          insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm);
        } else {
          // otherwise newStartVnode and elmToMove is same vnodes (否则新头节点 newStartVnode 和旧节点数组对应节点 elmToMove 是相同节点, 可以进行 patchVnode 操作)
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined;
          // 则将 oldCh 中已存在的 newStartVnode 节点移动到 oldCh 头部, 成为新头节点
          insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
        }
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }

  // after add and move vnodes (经过上面的节点添加和移动后)
  if (newStartIdx <= newEndIdx) {
    // newCh still has vnodes (newCh 还有节点未处理, 这些节点全部为新节点, 全部插入即可)
    before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
    addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
  }
  if (oldStartIdx <= oldEndIdx) {
    // oldCh still has vnodes (oldCh 还有节点未处理, 这些节点全部为 newCh 不存在元素, 全部移除即可)
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}
