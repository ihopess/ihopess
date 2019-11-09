module.exports = {
  base: '/',
  title: 'iHopess',
  description: 'Vuepress blog demo',
  head:[
      ['link', {rel:'icon', href:'/images/ihopess_favicon.ico'}]  // 增加一个自定义的 favicon(网页标签的图标)
  ],
  themeConfig: {
	// 你的GitHub仓库，请正确填写
	repo: 'https://github.com/ihopess/ihopess',
	editLinks: true,  // 启用编辑
	editLinkText: '在 GitHub 上编辑此页', // 编辑按钮的 Text
	docsDir: 'docs',  // 编辑文档的所在目录
	docsBranch: 'master',  // 编辑文档的所在分支
	// 自定义仓库链接文字。
	repoLabel: 'GitHub',
	nav: [
		{ text: '主页', link: '/' },
		{ text: 'Java', items: [
				{ text: 'Java设计模式', link: '/Java/Java设计模式/六大原则'},
				{ text: 'Java性能优化', link: '/Java/Java性能优化'},
			] 
		},
		{ text: '面试', items: [
				{ text: 'Java基础', link: '/面试/Java基础/'},
				{ text: '数据库', link: '/面试/数据库/'}
			] 
		},
		{ text: '我的博客', link: 'https://layne666.cn' }
	],
	sidebarDepth: 2,
	lastUpdated: '最后更新于',
    sidebar: {
		'/Java/Java设计模式/': [
			{
			  title: 'Java设计模式',
			  collapsable: false,
			  children: [
				'六大原则',
				'单例模式'
			  ]
			}
		]
	},
	//displayAllHeaders: true, // 默认值：false
	// 所有页面全部开启自动生成侧边栏
    //sidebar: 'auto'
  },
  plugins: [
	'@vuepress/back-to-top',//返回到顶部
    [
      'vuepress-plugin-helper-live2d', {
        live2d: {
          // 是否启用(关闭请设置为false)(default: true)
          enable: true,
          // 模型名称(default: hibiki)>>>取值请参考：
          // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
          model: 'haru/02',
          display: {
            position: "right", // 显示位置：left/right(default: 'right')
            width: 135, // 模型的长度(default: 135)
            height: 300, // 模型的高度(default: 300)
            hOffset: 65, //  水平偏移(default: 65)
            vOffset: 0, //  垂直偏移(default: 0)
          },
          mobile: {
            show: false // 是否在移动设备上显示(default: false)
          },
          react: {
            opacity: 0.8 // 模型透明度(default: 0.8)
          }
        }
      }
    ]
  ],
  markdown: { // 为每个代码块显示行号
    lineNumbers: true
  }
}