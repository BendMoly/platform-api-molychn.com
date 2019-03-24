const sql = {
  // 查询用户
  findUser: 'SELECT * FROM users WHERE account = ? AND password = ?',
  // 查询栏目列表
  checkFolders: 'SELECT * FROM folders',
  // 查询栏目列表制定栏目
  checkOneFolder: 'SELECT * FROM folders WHERE name = ?',
  // 插入新栏目
  insertFolder: 'INSERT INTO folders (name) VALUES (?)',
  // 查找上传目录
  checkUploads: 'SELECT * FROM uploads',
  // 添加Uploads文件
  insertUploads: 'INSERT INTO uploads (url, name, banner) VALUES (?, ?, ?)',
  // 插入文章
  insertArticle: 'INSERT INTO articles (uuid, title, folder, date, abstract, cover, content) VALUES (?, ?, ?, ?, ?, ?, ?)',
  // 文章列表查询
  checkArticles: 'SELECT * FROM articles limit ?, ?',
  // 文章列表目录条件查询
  checkArticlesByFolder: 'SELECT * FROM articles WHERE folder = ? limit ?, ?',
  // 文章列表标题条件查询
  checkArticlesByTitle: 'SELECT * FROM articles WHERE title like "%"?"%" limit ?, ?',
  // 文章列表时间范围查询
  checkArticlesByTimeScope: 'SELECT * FROM articles WHERE date BETWEEN ? AND ? limit ?, ?',
  // 删除上传的图片文件
  delUploadFile: 'DELETE FROM uploads WHERE name = ?'
}

export default sql
