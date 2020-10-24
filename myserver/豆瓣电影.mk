豆瓣电影api查询

颜色不一样的烟火_ac0f
2020.01.14 21:43:24
字数 219
阅读 2,271
豆瓣开发者api不能使用了需要在后面加上参数appkey

以网上查询还可以用的appkey：0df993c66c0c636e29ecbb5344252a4a为例最新接口如下

1、获取正在热映的电影：http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a

2、获取电影Top250：http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a

3、获取即将上映电影：http://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a

4、获取电影详情：http://api.douban.com/v2/movie/subject/${id}?apikey=0df993c66c0c636e29ecbb5344252a4a

以《你的名字》为例，上豆瓣电影搜索“你的名字”，点击进去，跳转至https://movie.douban.com/subject/26683290/  页面  ，26683290即为《你的名字》id,所以搜索《你的名字》api为：http://api.douban.com/v2/movie/subject/26683290?apikey=0df993c66c0c636e29ecbb5344252a4a

json字符串在线格式化：http://www.bejson.com/