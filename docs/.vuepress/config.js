module.exports = {
  title: '微笑的蛋壳呀',
  description: '饭要一口一口吃，路要一步一步走',
  serviceWorker: true,
  // head: [ // 注入到当前页面的 HTML <head> 中的标签
  //   ['link', { rel: 'icon', href: '/img/head.jpeg' }], // 标签里的头像
  // ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {text: '前端', link: '/frontEnd/'},
      {text: '后台', link: '/backEnd/'},
      {
        text: '链接', 
        items: [
          {text: 'csdn', link: 'https://blog.csdn.net/sherry_chan'},
          {text: 'github', link: 'https://github.com/smilechenjia/'}     
        ]
      }
    ],
    sidebar: {
      '/frontEnd/':[
        '',
        'nginx',
        'node',
        
        'rnmac'
      ],
      '/backEnd/': [
        '',
        'macjava'
       ]
    },// 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  }
};
