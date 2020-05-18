import request from '@/utils/request'

// request.get('/db.json').then(res => {
//   const data = res.data
//   console.log(data)
// })

export default {
  getList() {
    const req = request({
      method:'get',
      url:'/db.json'
    })
    return req
  }
}

