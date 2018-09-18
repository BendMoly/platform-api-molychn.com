import app from '../src/app'
import chalk from 'chalk'
const request = require('supertest')(app)
const Authorization = new Buffer("molychn:lincanyue").toString('base64')
describe('Articles api test', () => {
  describe('#post', () => {
    // it('should return success info', (done) => {
    //   request
    //     .post('/admin/v1/articles')
    //     .set('Authorization', `Basic ${Authorization}`)
    //     .send({
    //       title: 'test',
    //       columnId: 1,
    //       tags: ['test'],
    //       abstract: '测试一下中文',
    //       content: '### Hello world!!!'
    //     })
    //     .expect(200)
    //     .end((err, res) => {
    //       if (err) {
    //         console.log(chalk.red(err))
    //         return
    //       }
    //       done()
    //     })
    // })
    it('we post some random articles in db', (done) => {
      let res = randomPost(30)
      for (let i = 0; i < res.length; i++) {
        request
        .post('/admin/v1/articles')
        .set('Authorization', `Basic ${Authorization}`)
        .send(res[i])
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.log(chalk.red(err))
            return
          }
        })
      }
      done()
    })
  })
  describe('#get', () => {
    it('get article list by empty condition', (done) => {
      request
      .get('/admin/v1/articles')
      .set('Authorization', `Basic ${Authorization}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(chalk.red(err))
          return
        }
        done()
      })
    })
    it('get articles list by pageIndex1', (done) => {
      request
      .get('/admin/v1/articles?current=1')
      .set('Authorization', `Basic ${Authorization}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(chalk.red(err))
          return
        }
        done()
      })
    })
    it('get articles list by pageIndex2', (done) => {
      request
      .get('/admin/v1/articles?current=2')
      .set('Authorization', `Basic ${Authorization}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(chalk.red(err))
          return
        }
        done()
      })
    })
    it('get articles list by date', (done) => {
      request
      .get('/admin/v1/articles?current=1&start=1535731200000&end=1535990400000')
      .set('Authorization', `Basic ${Authorization}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(chalk.red(err))
          return
        }
        done()
      })
    })
    it('get articles list by keys', (done) => {
      request
      .get(`/admin/v1/articles?keys=${escape('萧尹姚')}`)
      .set('Authorization', `Basic ${Authorization}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(chalk.red(err))
          return
        }
        done()
      })
    })
    // it('get the article content', (done) => {
    //   request
    //   .get('/admin/v1/articles/5b8f4927fcebd1b5bfa5de15')
    //   .set('Authorization', `Basic ${Authorization}`)
    //   .expect(200)
    //   .end((err, res) => {
    //     if (err) {
    //       console.log(chalk.red(err))
    //       return
    //     }
    //     done()
    //   })
    // })
  })
  // describe('#del', () => {
  //   it('delete the article by _id', (done) => {
  //     request
  //     .del('/admin/v1/articles/5b8f4927fcebd1b5bfa5de13')
  //     .set('Authorization', `Basic ${Authorization}`)
  //     .expect(204)
  //     .end((err, res) => {
  //       if (err) {
  //         console.log(chalk.red(err))
  //         return
  //       }
  //       done()
  //     })
  //   })
  // })
})

const randomPost = (n) => {
  const randomCHN = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴鬱胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍卻璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后荆红游竺权逯盖益桓公万俟司马上官欧阳夏侯诸葛闻人东方赫连皇甫尉迟公羊澹台公冶宗政濮阳淳于单于太叔申屠公孙仲孙轩辕令狐钟离宇文长孙慕容鲜于闾丘司徒司空丌官司寇仉督子车颛孙端木巫马公西漆雕乐正壤驷公良拓跋夹谷宰父谷梁晋楚闫法汝鄢涂钦段干百里东郭南门呼延归海羊舌微生岳帅缑亢况郈有琴梁丘左丘东门西门商牟佘佴伯赏南宫墨哈谯笪年爱阳佟第五言福百家姓终'
  const randomENG = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let res = []
  for (let i = 0; i < n; i++) {
    let x = Math.floor(Math.random() * 101)
    let y = Math.floor(Math.random() * 27)
    let temp = {}
    temp.title = randomCHN.substr(x, 20)
    temp.columnId = '5b98b70e929b412c57d29c34'
    temp.tags = [`${randomENG.substr(y, 5)}`]
    temp.abstract = randomCHN.substr(x, 140)
    temp.content = randomCHN.substr(x, 300)
    res.push(temp)
  }
  return res
}