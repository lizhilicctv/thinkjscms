/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : nodecms

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-08-08 14:30:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for lizhili_admin
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_admin`;
CREATE TABLE `lizhili_admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `isopen` int(11) NOT NULL DEFAULT '1',
  `mark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_admin
-- ----------------------------
INSERT INTO `lizhili_admin` VALUES ('1', 'admin', 'a3f17ee3685c44216eed0724f0c717c2', '1529570040', '1559016242', '1', '1', '超级管理员,拥有至高无限权利,且不能删除.');
INSERT INTO `lizhili_admin` VALUES ('27', 'lizhili', 'a3f17ee3685c44216eed0724f0c717c2', '1532685192', '1565060181', '2', '1', '');

-- ----------------------------
-- Table structure for lizhili_adposition
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_adposition`;
CREATE TABLE `lizhili_adposition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ad_title` varchar(150) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `isopen` tinyint(1) DEFAULT NULL,
  `sort` tinyint(3) DEFAULT '0',
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of lizhili_adposition
-- ----------------------------
INSERT INTO `lizhili_adposition` VALUES ('11', '1321232131', '', '/static/adposition/1565169707112.jpg', '0', '2', '1565169707', '1565233111');
INSERT INTO `lizhili_adposition` VALUES ('12', '23威尔威', 'http://uni_cms.com', '/static/adposition/1565170020791.jpg', '1', '1', '1565169727', '1565233111');

-- ----------------------------
-- Table structure for lizhili_article
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_article`;
CREATE TABLE `lizhili_article` (
  `id` mediumint(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) DEFAULT NULL,
  `cateid` mediumint(9) DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `desc` varchar(100) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `pic` varchar(160) DEFAULT NULL,
  `editor` text,
  `state` smallint(6) unsigned DEFAULT '0' COMMENT '0代表未推荐,1代表推荐了',
  `click` mediumint(9) DEFAULT '0',
  `zan` mediumint(9) DEFAULT '0',
  `in_time` int(10) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_article
-- ----------------------------
INSERT INTO `lizhili_article` VALUES ('42', 'Node.js 12.4.0 发布，JSON 文档稳定', '4', 'node,php,html,css', '　　显着的变化　　doc：　　API文档的JSON变体不再是实验性的(Rich Trott)#27842。　　esm：　　始终启用JSON模块支持--experimental-modules。该　　-', '', null, '&lt;p&gt;　　显着的变化&lt;/p&gt;&lt;p&gt;　　doc：&lt;/p&gt;&lt;p&gt;　　API文档的JSON变体不再是实验性的(Rich Trott)#27842。&lt;/p&gt;&lt;p&gt;　　esm：&lt;/p&gt;&lt;p&gt;　　始终启用JSON模块支持--experimental-modules。该&lt;/p&gt;&lt;p&gt;　　--experimental-json-modules旗帜已被删除(Myles Borins)#27752。&lt;/p&gt;&lt;p&gt;　　http，http2：&lt;/p&gt;&lt;p&gt;　　添加了一个新标志，用于覆盖默认的HTTP服务器套接字&lt;/p&gt;&lt;p&gt;　　超时(两分钟)。通过--http-server-default-timeout=milliseconds&lt;/p&gt;&lt;p&gt;　　或--http-server-default-timeout=0分别更改或禁用超时。&lt;/p&gt;&lt;p&gt;　　从Node.js 13.0.0开始，默认情况下将禁用超时(Ali Ijaz Sheikh)#27704。&lt;/p&gt;&lt;p&gt;　　inspector：&lt;/p&gt;&lt;p&gt;　　添加了一个实验--heap-prof标志，用于&lt;/p&gt;&lt;p&gt;　　在启动时启动V8堆分析器，并在退出之前将堆配置文件写入磁盘(Joyee Cheung)#27596。&lt;/p&gt;&lt;p&gt;　　流：&lt;/p&gt;&lt;p&gt;　　该readable.unshift()方法现在正确地将字符串转换为缓冲区&lt;/p&gt;&lt;p&gt;　　此外，接受新的可选参数来指定字符串的&lt;/p&gt;&lt;p&gt;　　编码，例如&#39;utf8&#39;或&#39;ascii&#39;(Marcos Casagrande)#27194。&lt;/p&gt;&lt;p&gt;　　v8：&lt;/p&gt;&lt;p&gt;　　返回的对象v8.getHeapStatistics()有两个新属性：&lt;/p&gt;&lt;p&gt;　　number_of_native_contexts和number_of_detached_contexts(Yuriy \r\nVasiyarov)#27933。&lt;/p&gt;&lt;p&gt;&lt;br/&gt;&lt;/p&gt;', '1', '0', '0', '1559787574', '1559791682');

-- ----------------------------
-- Table structure for lizhili_auth_access
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_auth_access`;
CREATE TABLE `lizhili_auth_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_auth_access
-- ----------------------------
INSERT INTO `lizhili_auth_access` VALUES ('1', '1');
INSERT INTO `lizhili_auth_access` VALUES ('27', '2');

-- ----------------------------
-- Table structure for lizhili_auth_group
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_auth_group`;
CREATE TABLE `lizhili_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` char(80) NOT NULL DEFAULT '',
  `sort` tinyint(4) DEFAULT '0',
  `desc` varchar(255) DEFAULT NULL,
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_auth_group
-- ----------------------------
INSERT INTO `lizhili_auth_group` VALUES ('1', '超级管理员', '1', '', '0', '拥有至高无上的权利', null, '1559037994');
INSERT INTO `lizhili_auth_group` VALUES ('2', '内容发布员', '1', '12', '0', '只能发布内容', null, '1559046550');

-- ----------------------------
-- Table structure for lizhili_auth_rule
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_auth_rule`;
CREATE TABLE `lizhili_auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(80) NOT NULL DEFAULT '',
  `title` char(20) NOT NULL DEFAULT '',
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `tiao` char(100) NOT NULL DEFAULT '' COMMENT '这个是条件,我修改了,原来是condition,现在是tiao',
  `fid` mediumint(9) DEFAULT '0',
  `level` tinyint(4) DEFAULT '0',
  `sort` int(11) DEFAULT '0',
  `mark` varchar(255) DEFAULT NULL,
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_auth_rule
-- ----------------------------
INSERT INTO `lizhili_auth_rule` VALUES ('8', 'cate/all', '栏目管理', '1', '1', '', '0', '0', '0', '1111', null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('9', 'cate/add', '栏目添加', '1', '1', '', '8', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('10', 'cate/del', '栏目删除', '1', '1', '', '8', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('11', 'cate/edit', '栏目修改', '1', '1', '', '8', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('12', 'cate/index', '栏目查看', '1', '1', '', '8', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('13', 'cate/ajax', '栏目ajax', '1', '1', '', '8', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('14', 'article/all', '资讯管理', '1', '1', '', '0', '0', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('15', 'article/index', '资讯查看', '1', '1', '', '14', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('16', 'article/add', '资讯添加', '1', '1', '', '14', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('17', 'article/del', '资讯删除', '1', '1', '', '14', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('18', 'article/edit', '资讯修改', '1', '1', '', '14', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('19', 'article/ajax', '资讯ajax', '1', '1', '', '14', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('20', 'link/all', '友情链接', '1', '1', '', '0', '0', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('21', 'link/add', '友情链接添加', '1', '1', '', '20', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('22', 'link/del', '友情链接删除', '1', '1', '', '20', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('23', 'link/edit', '友情链接修改', '1', '1', '', '20', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('24', 'link/index', '友情链接查看', '1', '1', '', '20', '1', '0', null, null, '1559040889');
INSERT INTO `lizhili_auth_rule` VALUES ('25', 'link/ajax', '友情链接ajax', '1', '1', '', '20', '1', '0', null, null, '1559040889');

-- ----------------------------
-- Table structure for lizhili_cate
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_cate`;
CREATE TABLE `lizhili_cate` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `catename` varchar(30) DEFAULT NULL,
  `en_name` varchar(30) DEFAULT NULL,
  `fid` tinyint(4) DEFAULT NULL,
  `type` tinyint(3) DEFAULT NULL COMMENT '1代表是列表，2代表是单页，3代表图片列表',
  `keyword` varchar(255) DEFAULT NULL COMMENT '栏目关键字',
  `template` varchar(255) DEFAULT NULL COMMENT '模版地址文件',
  `mark` varchar(255) DEFAULT NULL,
  `editorValue` text COMMENT '单页的数据',
  `sort` int(11) unsigned NOT NULL DEFAULT '0',
  `up_time` int(11) DEFAULT NULL,
  `in_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_cate
-- ----------------------------
INSERT INTO `lizhili_cate` VALUES ('1', '关于我', 'about', '2', '2', '关于我,李志立', null, '', null, '0', '1565150322', '1559700134');
INSERT INTO `lizhili_cate` VALUES ('2', '学无止境1', 'study', '0', '3', '111', null, '11111', null, '1', '1565150322', '1559701755');
INSERT INTO `lizhili_cate` VALUES ('4', '慢生活', 'life', '2', '1', '', null, '', null, '2', '1565150322', '1559701779');

-- ----------------------------
-- Table structure for lizhili_comment
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_comment`;
CREATE TABLE `lizhili_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL COMMENT '内容',
  `article_id` int(6) DEFAULT NULL COMMENT '文章id',
  `member_id` int(6) DEFAULT NULL COMMENT '用户id',
  `isopen` tinyint(4) DEFAULT '-1' COMMENT '0是不展示，1是展示，-1是没有审核',
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_comment
-- ----------------------------
INSERT INTO `lizhili_comment` VALUES ('13', '的', '42', '19', '0', null, '1565231763');

-- ----------------------------
-- Table structure for lizhili_link
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_link`;
CREATE TABLE `lizhili_link` (
  `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `linkurl` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT '0',
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL COMMENT '友情链接logo',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_link
-- ----------------------------
INSERT INTO `lizhili_link` VALUES ('10', '百度', 'http://www.baidu.com', '', '2', '1558679635', '1565167523', '/link/20190524/5ce7905377af6.png');
INSERT INTO `lizhili_link` VALUES ('13', '12333', 'http://unicms.com', '撒旦法法撒旦法44', '3', '1565166812', '1565167523', '/static/link/1565167370175.jpg');

-- ----------------------------
-- Table structure for lizhili_log
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_log`;
CREATE TABLE `lizhili_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `ip` char(15) DEFAULT NULL,
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_log
-- ----------------------------
INSERT INTO `lizhili_log` VALUES ('2', 'admin', '127.0.0.1', '1557143132', '1557143132');
INSERT INTO `lizhili_log` VALUES ('3', 'admin', '127.0.0.1', '1557143179', '1557143179');
INSERT INTO `lizhili_log` VALUES ('4', 'admin', '127.0.0.1', '1557143226', '1557143226');
INSERT INTO `lizhili_log` VALUES ('37', 'admin', '127.0.0.1', '1559550120', '1559550120');
INSERT INTO `lizhili_log` VALUES ('38', 'admin', '127.0.0.1', '1559558289', '1559558289');
INSERT INTO `lizhili_log` VALUES ('39', 'admin', '127.0.0.1', '1559558662', '1559558662');
INSERT INTO `lizhili_log` VALUES ('40', 'admin', '127.0.0.1', '1559560023', '1559560023');
INSERT INTO `lizhili_log` VALUES ('41', 'admin', '127.0.0.1', '1559700043', '1559700043');
INSERT INTO `lizhili_log` VALUES ('42', 'admin', '127.0.0.1', '1559787386', '1559787386');
INSERT INTO `lizhili_log` VALUES ('43', 'admin', '127.0.0.1', '1560162967', '1560162967');
INSERT INTO `lizhili_log` VALUES ('46', 'admin', '192.168.1.140', '1564476954', '1564476954');
INSERT INTO `lizhili_log` VALUES ('45', null, '127.0.0.1', '1564469404', '1564469404');
INSERT INTO `lizhili_log` VALUES ('47', 'admin', '127.0.0.1', '1564645718', '1564645718');
INSERT INTO `lizhili_log` VALUES ('48', 'admin', '127.0.0.1', '1564658493', '1564658493');
INSERT INTO `lizhili_log` VALUES ('49', 'admin', '127.0.0.1', '1564729070', '1564729070');
INSERT INTO `lizhili_log` VALUES ('50', 'admin', '192.168.1.185', '1564743038', '1564743038');
INSERT INTO `lizhili_log` VALUES ('52', 'admin', '127.0.0.1', '1565080273', '1565080273');
INSERT INTO `lizhili_log` VALUES ('53', 'admin', '127.0.0.1', '1565142814', '1565142814');
INSERT INTO `lizhili_log` VALUES ('54', 'admin', '192.168.1.140', '1565232382', '1565232382');

-- ----------------------------
-- Table structure for lizhili_member
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_member`;
CREATE TABLE `lizhili_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(60) DEFAULT NULL,
  `password` varchar(32) DEFAULT 'e10adc3949ba59abbe56e057f20f883e',
  `sex` tinyint(4) DEFAULT NULL COMMENT '1代表男，2代表女，3代表未知',
  `email` varchar(60) DEFAULT NULL,
  `phone` bigint(11) DEFAULT NULL,
  `isopen` tinyint(4) DEFAULT NULL,
  `state` tinyint(4) DEFAULT '0' COMMENT '0代表是没有通过审核，1代表通过审核',
  `score` int(11) DEFAULT '0' COMMENT '积分',
  `headimg` varchar(60) DEFAULT NULL,
  `sheng` varchar(60) DEFAULT NULL,
  `shi` varchar(60) DEFAULT NULL,
  `xian` varchar(60) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  `del_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_member
-- ----------------------------
INSERT INTO `lizhili_member` VALUES ('20', '45465', '698d51a19d8a121ce581499d7b701668', '2', 'dd@163.com', '18633456272', '1', '1', '0', null, '内蒙古', '呼和浩特', '和林格尔', '绕弯儿若', '1564743103', '1564743151', null);
INSERT INTO `lizhili_member` VALUES ('19', '是地方撒', '202cb962ac59075b964b07152d234b70', '1', 'jjss@qq.com', '18633456271', '1', '0', '0', null, '广东', '清远', '连州', '是对方的身份水电费', '1564737892', '1565232553', null);

-- ----------------------------
-- Table structure for lizhili_message
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_message`;
CREATE TABLE `lizhili_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `neirong` text,
  `isopen` tinyint(4) DEFAULT '0' COMMENT '1代表处理了，0代表未处理',
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_message
-- ----------------------------
INSERT INTO `lizhili_message` VALUES ('25', '12', '12', '12', '12', '1', null, '1565231839');

-- ----------------------------
-- Table structure for lizhili_shield
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_shield`;
CREATE TABLE `lizhili_shield` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shield` text,
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_shield
-- ----------------------------
INSERT INTO `lizhili_shield` VALUES ('1', '她妈|它妈|他妈|你妈|去死|贱人|1090tv|10jil|21世纪中国基金会|2c8|3p|4kkasi|64惨案|64惨剧|64学生运动|64运动|64运动民國|89惨案|89惨剧|89学生运动|89运动|adult|asiangirl|avxiu|av女|awoodong|A片|bbagoori|bbagury|bdsm|binya|bitch|bozy|bunsec|bunsek|byuntae|B样|fa轮|fuck|ＦｕｃΚ|gay|hrichina|jiangzemin|j女|kgirls|kmovie|lihongzhi|MAKELOVE|NND|nude|petish|playbog|playboy|playbozi|pleybog|pleyboy|q奸|realxx|s2x|sex|shit|sorasex|tmb|TMD|tm的|tongxinglian|triangleboy|UltraSurf|unixbox|ustibet|voa|lizhili|admin', null, '1558956338');

-- ----------------------------
-- Table structure for lizhili_slide
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_slide`;
CREATE TABLE `lizhili_slide` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `img` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT '0',
  `isopen` tinyint(1) DEFAULT '0' COMMENT '1代表启用，0代表不启用',
  `desc` varchar(255) DEFAULT NULL,
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_slide
-- ----------------------------
INSERT INTO `lizhili_slide` VALUES ('7', '/static/slide/1565168856691.jpg', 'http://www.baidu.com', '111', '1', '0', '111', '1558681938', '1565168974');

-- ----------------------------
-- Table structure for lizhili_system
-- ----------------------------
DROP TABLE IF EXISTS `lizhili_system`;
CREATE TABLE `lizhili_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cnname` varchar(100) DEFAULT NULL,
  `enname` varchar(100) DEFAULT NULL,
  `type` tinyint(4) DEFAULT '1',
  `value` varchar(255) DEFAULT NULL,
  `kxvalue` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT '0',
  `desc` varchar(255) DEFAULT NULL,
  `st` tinyint(3) DEFAULT '0',
  `in_time` int(11) DEFAULT NULL,
  `up_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lizhili_system
-- ----------------------------
INSERT INTO `lizhili_system` VALUES ('1', '网站名称', 'webname', '1', '李志立博客', '', '0', '网站名称', '1', null, '1564997797');
INSERT INTO `lizhili_system` VALUES ('2', '关键词', 'keyword', '1', '李志立博客,技术博客', '', '0', '网站关键字', '1', null, '1564997797');
INSERT INTO `lizhili_system` VALUES ('3', '描述', 'miaoshu', '1', '我是一个厉害的技术博客人!', '', '0', '网站描述', '1', null, '1564997797');
INSERT INTO `lizhili_system` VALUES ('4', '底部版权信息', 'copyright', '1', 'Design by &lt;a href=&quot;/&quot;&gt;李志立个人博客&lt;/a&gt; @技术宅', '', '0', '网站版权信息', '1', null, '1564997797');
INSERT INTO `lizhili_system` VALUES ('5', '备案号', 'No', '1', '', '', '0', '网站备案号', '1', null, '1564997797');
INSERT INTO `lizhili_system` VALUES ('6', '统计代码', 'statistics', '2', '', '', '0', '网站统计代码', '1', null, '1564997797');
INSERT INTO `lizhili_system` VALUES ('7', '网站状态', 'value', '3', '开启', '开启,关闭', '0', '网站的状态', '1', null, '1564997797');
