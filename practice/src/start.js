const getDate = () => {
  const now = new Date()
  const arr = [
    now.getFullYear(),
    '.',
    now.getMonth()+1,
    '.',
    now.getDate(),
    ',',
    now.getHours(),
    ':',
    now.getMinutes(),
    ':',
    now.getSeconds()
  ]
  return arr.join('')
}

function downloadTxtFile(filename, text) {
  // 创建一个新的Blob对象，类型为纯文本
  var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

  // 创建一个指向Blob对象的URL
  var url = URL.createObjectURL(blob);

  // 创建一个a标签并设置属性
  var downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = filename;

  // 添加链接到文档并模拟点击
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // 清理并移除元素和URL引用
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

function startTime(store, states) {
  if (store.state.ifPractice===1) {
    return
  }
  if (store.state.records.length>0) {
    let record = store.state.records[store.state.records.length-1]
    const curr = store.state.curr
    if (record.curr == curr) {
      return
    }
  }
  setTimeout(function() {
    if (store.state.records.length>0) {
      let record = store.state.records[store.state.records.length-1]
      if (record.endTime === '') {
        record.endTime = getDate()
        record.rows = store.state.clearLines
        store.commit('updateRecords',[...store.state.records])
      }
    }

    store.commit('updateIsLock', true)
  
    let curr = store.state.curr
    if(curr==2) {
      store.commit('updateThirdRoundFinished',true)
    } else if(curr==1) {
      store.commit('updateSecondRoundFinished',true)
    } else if(curr==0) {
      store.commit('updateFirstRoundFinished',true)
    }
    if (curr==2) {
      // 使用函数
      downloadTxtFile('【勿删该文档】.txt', JSON.stringify(store.state.records));
      states.overEnd()
      return
    } else {
      curr++
    }
  
    states.overStart()
  
    store.commit('speedStart', store.state.simpleNormalDiffcult[curr])
    store.commit('updateCurr', curr)
  
  }, 0.5*60*1000);//此处修改的时间是正式每一关的时间
}

export default startTime