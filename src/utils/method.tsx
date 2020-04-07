import {useState, useEffect} from 'react';
interface nodeType {
  children?: [];
  title: string;
  code: string;
  path: string;
}
/**
 * 广度优先遍历
 * @param {*} node
 */
export const wideTraversal = (node: [nodeType]) => {
  let nodos = [];
  if (node[0]) {
    let stack = [...node];
    while(stack.length !== 0){
      let item = stack.shift()
      if (item && item.children && item.children.length > 0) {
        stack.push(...item.children)
      }
      nodos.push(item)
    }
  }
  return nodos
}


/**
 * fullscreen
 */

export const enterFullscreen = () => {
  let ele: any;
  ele = document.documentElement;
  let reqFullscreen = ele.requestFullscreen || ele.webkitRequestFullScreen || ele.mozRequestFullScreen || ele.msRequestFullScreen;
  if (typeof reqFullscreen !== 'undefined' && reqFullscreen) {
    reqFullscreen.call(ele);
  }
}

/**
 * exit fullscreen mode
 */
export const exitFullscreen = () => {
  let document: any;
  document = window.document;
  if (document.exitFullscreen) {  
    document.exitFullscreen().catch((err: any) => Promise.resolve(err));
  } else if (document.mozCancelFullScreen) {  
    document.mozCancelFullScreen().catch((err: any) => Promise.resolve(err)); 
  } else if (document.webkitCancelFullScreen) {  
    document.webkitCancelFullScreen().catch((err: any) => Promise.resolve(err));
  } else if (document.msExitFullscreen) {  
    document.msExitFullscreen().catch((err: any) => Promise.resolve(err));
  }
}


export const formatStatus = (text: string = '') => {
  let statusObj: {[key: string]: string} = {
    'NORMAL': '未审核',
    'AUDITED': '已审核',
    'INIT': '初始化'
  }
  return statusObj[text];
}
