// 导入mysql模块
import mysql from 'mysql'
// 导入数据库配置
import config from './config'
// sql语句
import sql from './sql'
import crypto from 'crypto'

// 创建连接池
const pool = mysql.createPool(config.mysql)

class Sql {
  constructor () {}

  // 我测试一下git同步拉取
  /**
   * @description 用户登录sql
   * @param {账号} account
   * @param {密码} password
   * @returns Promise返回一个查询到的用户名或false判定无此用户
   * @memberof Sql
   */
  async login (account, password) {
    console.log(`sign in sqling, ${account}:${password}`)
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(sql.findUser, [account, password], (err, result) => {
          connection.release()
          if (err) {
            console.log(err)
            reject(err)
          }
          if (!!result.length) {
            console.log(result)
            resolve({
              account: result[0].account,
              role: result.role
            })
          } else {
            resolve(false)
          }
        })
      })
    })
  }

  /**
   * @description 获取栏目列表sql
   * @returns Promise返回栏目列表json
   * @memberof Sql
   */
  async checkFolders () {
    console.log('checking the folders')
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(sql.checkFolders, (err, result) => {
          connection.release()
          if (result) {
            let resJson = []
            for (let i = 0; i < result.length; i++) {
              let o = {
                id: result[i].id,
                name: result[i].name
              }
              resJson.push(o)
            }
            resolve(resJson)
          }
        })
      })
    })
  }

  /**
   * @description 新增目录
   * @param {新目录名称} name
   * @returns
   * @memberof Sql
   */
  async insertFolder (name) {
    console.log(`inserting the new one, ${name}`)
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(sql.checkOneFolder, [name], (err, result) => {
          connection.release()
          console.log(result)
          if (!!result.length) {
            resolve(false)
          } else {
            console.log('新增栏目进行中')
            connection.query(sql.insertFolder, [name], (err, res) => {
              if (err) reject(err)
              if (res) {
                resolve(true)
              }
            })
          }
        })
      })
    })
  }

  /**
   * @description 查询上传的素材列表
   * @returns
   * @memberof Sql
   */
  async checkUploads () {
    console.log('checking uploaded file')
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(sql.checkUploads, (err, result) => {
          connection.release()
          if (result.length) {
            let resJson = []
            for (let i = 0; i < result.length; i++) {
              let o = {
                url: result[i].url,
                banner: Boolean(result[i].banner),
                date: Math.floor(new Date(result[i].date).valueOf() / 1000)
              }
              resJson.push(o)
            }
            resolve(resJson)
          } else {
            resolve([])
          }
        })
      })
    })
  }

  /**
   * @description 上传新素材
   * @param {string} url
   * @param {string} name
   * @param {boolean} banner
   */
  async insertUploads (url, name, banner) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(sql.insertUploads, [url, name, banner], (err, result) => {
          connection.release()
          if (err) {
            resolve(false)
          }
          if (result) {
            resolve(true)
          }
        })
      })
    })
  }

  /**
   * @description 插入新文章
   * @param {string} article
   */
  async insertArticle (article) {
    return new Promise((resolve, reject) => {
      let {title, folder, abstract, cover = null, content} = article
      // 生成uuid
      let uuid = crypto.createHash('md5').update(`${title}${Date.now()}`).digest('hex')
      console.log(uuid)
      // 生成date
      let date = Math.floor(Date.now() / 1000)
      pool.getConnection((err, connection) => {
        connection.query(sql.insertArticle, [uuid, title, folder, date, abstract, cover, content], (err, result) => {
          connection.release()
          if (err) reject(err)
          if (result) {
            resolve(true)
          }
        })
      })
    })
  }

  /**
   * @description 根据页码，类型，搜索字符以及时间等相关因素查找文章列表
   * @param {number} currentPage
   * @param {string} type
   * @param {string} text
   * @param {number} start
   * @param {number} end
   */
  async checkArticles (currentPage = 1, type = null, text = null, start = null, end = null) {
    return new Promise((resolve, reject) => {
      // 整理查询列表语句
      let sqlList = {
        normal: {
          sql: sql.checkArticles,
          params: [(currentPage-1)*10, currentPage*10]
        },
        checkByFolder: {
          sql: sql.checkArticlesByFolder,
          params: [text, (currentPage-1)*10, currentPage*10]
        },
        checkArticlesByTitle: {
          sql: sql.checkArticlesByTitle,
          params: [text, (currentPage-1)*10, currentPage*10]
        },
        checkArticlesByDateScope: {
          sql: sql.checkArticlesByTimeScope,
          params: [Math.floor(start / 1000), Math.floor(end / 1000), (currentPage-1)*10, currentPage*10]
        }
      }
      let targetSql = sqlList['normal']
      // 存在判断查询的条件
      if (type) {
        switch (type) {
          case 'folder':
            targetSql = sqlList['checkByFolder']
            break
          case 'title':
            targetSql = sqlList['checkArticlesByTitle']
            break
          case 'date':
            targetSql = sqlList['checkArticlesByDateScope']
            break
          default:
            targetSql = sqlList['normal']
            break
        }
      }
      let resJson = []
      countArticles(type, text, start, end).then(count => {
        console.log(count)
        console.log(targetSql)
        pool.getConnection((err, connection) => {
          connection.query(targetSql.sql, targetSql.params, (err, result) => {
            connection.release()
            if (err) {
              console.log(err)
              reject(err)
            }
            if (!!result) {
              for (let i = 0; i < result.length; i++) {
                // (uuid, title, folder, abstract, cover, content)
                let o = {
                  id: result[i].uuid,
                  title: result[i].title,
                  folder: result[i].folder,
                  date: result[i].date,
                  abstract: result[i].abstract,
                  cover: result[i].cover,
                  content: result[i].content
                }
                resJson.push(o)
              }
              resolve({
                items: resJson,
                page: Number(currentPage),
                total: count
              })
            }
          })
        })
      })
    })
  }

  /**
   * @description 查找文章详情
   * @param {string} id
   */
  async checkArticle (id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(sql.checkArticle, [id], (error, res) => {
          connection.release()
          if (error) reject(error)
          if (res) {
            resolve(res[0])
          }
        })
      })
    })
  }

  async delArticle (id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(sql.delArticle, [id], (error, res) => {
          connection.release()
          if (error) reject(error)
          if (res) {
            resolve(true)
          }
        })
      })
    })
  }

  /**
   * @description 删除图片素材
   * @param {string} name
   */
  async delUploadFile (name) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(sql.delUploadFile, [name], (error, result) => {
          connection.release()
          if (error) reject(error)
          if (result) {
            resolve(true)
          }
        })
      })
    })
  }

  /**
   * @description 删除栏目
   * @param {String} id
   */
  async deleteFolder (id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        connection.query(sql.deleteFolder, [id], (error, result) => {
          connection.release()
          if (error) reject(error)
          if (result) {
            resolve(true)
          }
        })
      })
    })
  }
}

// 对于文章的统计因后期会使用redis进行缓存
// 逻辑上先使用简单查询进行实现
// 在整套系统逻辑打通之后加入redis模块
// 完成统计逻辑
const countArticles = async (type = null, text = null, start = null, end = null) => {
  return new Promise((resolve, reject) => {
    let _sql = {
      normal: 'SELECT count(*) AS c FROM articles',
      folder: 'SELECT count(*) AS c FROM articles WHERE folder = ?',
      title: 'SELECT count(*) AS c FROM articles WHERE title like "%"?"%"',
      date: 'SELECT count(*) AS c FROM articles WHERE date BETWEEN ? AND ?'
    }
    let targetSql = _sql['normal']
    if (type) {
      switch (type) {
        case 'folder':
          targetSql = _sql['folder']
          break
        case 'title':
          targetSql = _sql['title']
          break
        case 'date':
          targetSql = _sql['date']
          break
        default:
          targetSql = _sql['normal']
          break
      }
    }
    pool.getConnection((err, connection) => {
      console.log(type == 'date' ? [Math.floor(start / 1000), Math.floor(end / 1000)] : [text])
      connection.query(targetSql, type == 'date' ? [Math.floor(start / 1000), Math.floor(end / 1000)] : [text], (err, res) => {
        connection.release()
        if (res) {
          resolve(res[0].c)
        }
      })
    })
  })
}

export default new Sql()