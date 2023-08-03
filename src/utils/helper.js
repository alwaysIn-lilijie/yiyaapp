export default {


    /**
	 * 比较数组，找到标识相同的，替换
	 */
	changeData(oldData=[],newData=[],key,type){
		if(oldData.length<=0||newData.length<=0){
			return []
		}
		oldData=JSON.parse(JSON.stringify(oldData))
		newData=JSON.parse(JSON.stringify(newData))

		newData.forEach((item,index)=>{
			try{
				oldData.forEach((oitem,oindex)=>{
					if(item[key].toUpperCase()==oitem[key].toUpperCase()){
						if(type){
							oitem.changeData=item
						}else{
							oldData.splice(oindex,1,item) ;
						}

						throw '找到了'
					}
				})
			}catch(e){
				// console.log(e)
			}

		})

		return oldData
	},
	/**
	 * 表格时间格式化
	 */
	formatDate(cellValue) {
	  if (cellValue == null || cellValue === '') return ''
	  var date = new Date(cellValue)
	  var year = date.getFullYear()
	  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
	  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
	},
	/**
	 * 表格时间格式化
	 */
	formatDateOnly(cellValue) {
	  if (cellValue == null || cellValue === '') return ''
	  var date = new Date(cellValue)
	  var year = date.getFullYear()
	  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
	  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	  return year + '-' + month + '-' + day
	},
	/**
	 * @param {number} time
	 * @param {string} option
	 * @returns {string}
	 */
	formatTime(time, option) {
	  if (('' + time).length === 10) {
	    time = parseInt(time) * 1000
	  } else {
	    time = +time
	  }
	  const d = new Date(time)
	  const now = Date.now()

	  const diff = (now - d) / 1000

	  if (diff < 30) {
	    return '刚刚'
	  } else if (diff < 3600) {
	    // less 1 hour
	    return Math.ceil(diff / 60) + '分钟前'
	  } else if (diff < 3600 * 24) {
	    return Math.ceil(diff / 3600) + '小时前'
	  } else if (diff < 3600 * 24 * 2) {
	    return '1天前'
	  }
	  if (option) {
	    return parseTime(time, option)
	  } else {
	    return (
	      d.getMonth() +
	      1 +
	      '月' +
	      d.getDate() +
	      '日' +
	      d.getHours() +
	      '时' +
	      d.getMinutes() +
	      '分'
	    )
	  }
	},
}
