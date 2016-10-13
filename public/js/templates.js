;(function(){

'use strict';

angular.module('app').run(['$templateCache', function($templateCache) {

  $templateCache.put('feed/feed_tpl.html', '<div class="post-panel"><div class="sidebar list-group" resize data-ng-show="width > 768 || vm.expand"><a class="post-select list-group-item" ui-sref="feed.post({id: post.feed_id, post_id: post._id})" data-ng-repeat="post in vm.posts | orderBy: \'pubdate\' : true" data-ng-click="vm.read(post)" data-ng-class="{true: \'active\', false: \'\'}[post.active]"><h2>{{::post.title}}</h2><img class="read" src="img/ic_done_black_24dp_1x.png" data-ng-if="post.read"> <span>{{::post.pubdate | toLocalString}}</span></a><div class="status-bar side-bar"><button class="posts btn btn-primary" data-ng-click="vm.readall()" data-ng-if="vm.feed.feeded">全部标记为已读 <span data-ng-if="vm.unread">( {{vm.unread}} )</span> <span class="glyphicon glyphicon-ok"></span></button> <button class="posts btn btn-primary" data-ng-click="vm.feedit()" data-ng-if="!vm.feed.feeded">立即订阅 <span class="glyphicon glyphicon-ok"></span></button></div></div><div ui-view class="center" scroll-listen="post.read" data-ng-show="!vm.expand"><div class="page-header feed-header"><img data-ng-src="{{vm.feed.favicon}}"><h1>{{::vm.feed.title}}</h1></div><feed-panel feed="vm.feed"></feed-panel><nvd3 options="vm.options" data="vm.data"></nvd3><div class="status-bar feed-bar"><p class="title">{{ ::vm.feed.title }}</p></div></div></div>');

  $templateCache.put('home/home_tpl.html', '<div class="summary"><div class="row"><div class="col-md-8"><div class="page-header"><h1>最新的未读文章</h1></div><p data-ng-if="!vm.posts.length">还没有未读内容～</p><article data-ng-repeat="post in vm.posts"><header class="feed-title"><a ui-sref="feed({id: post.feed_id})">{{post.feed_title}}<small>({{post.unread}})</small></a></header><section class="post"><img data-ng-src="{{post.description}}"><section class="post-content"><header class="post-title"><a href="javascript: void 0" data-ng-click="vm.goto(post)">{{post.title}}</a></header><article class="post-summary">{{post.summary}}</article></section></section></article></div><div class="col-md-4"><div class="page-header"><h1>最近热门订阅源</h1></div><p data-ng-if="!vm.feeds.length">没有东西</p><div class="list-group feed"><a class="list-group-item" ui-sref="feed({id: feed._id})" data-ng-repeat="feed in vm.feeds"><img data-ng-src="{{feed.favicon}}"><p>{{feed.title}}</p><p>订阅人数：{{feed.feedNum}}</p></a></div><div class="page-header"><h1>公告</h1></div><div class="board"><h2>Rsser v1.0.0</h2><p>Rsser 是一个基于 Angular1 和 Koa2 的 RSS 订阅器</p><p></p><p>本项目开源在<a href="https://github.com/ruiming/rss">Github</a> 上面</p><p>持续完善中，欢迎您的使用...</p><p class="text-right">2016-10-12 19:30</p></div></div></div></div>');

  $templateCache.put('post/post_tpl.html', '<article class="markdown-body"><header><h1>{{::vm.currentPost.title}}</h1></header><section><small><span class="glyphicon glyphicon-send"></span> <span data-ng-if="vm.currentPost.pubdate">更新于 {{::vm.currentPost.pubdate | timeago}}</span> <span data-ng-if="vm.currentPost.author">由 {{::vm.currentPost.author}} 发布</span></small> <small data-ng-show="vm.currentPost.categories.length"><span class="glyphicon glyphicon-tags"></span> {{::vm.currentPost.categories.toString()}}</small></section><section><article data-ng-bind-html="::vm.currentPost.description | linkFix: vm.currentPost.website"></article></section><footer class="status-bar post-bar"><button class="home btn btn-primary" data-ng-click="vm.home()"><span class="glyphicon glyphicon-home"></span></button><p class="title">{{ ::vm.currentPost.title }}</p><p class="readtime" data-ng-if="vm.begintime"><span class="glyphicon glyphicon-time"></span> {{ vm.currenttime - vm.begintime | date: \'mm:ss\' }}</p><button class="mark btn btn-primary" data-ng-click="vm.mark()"><span data-ng-if="!vm.currentPostDetail.mark">收藏</span> <span data-ng-if="vm.currentPostDetail.mark">已收藏</span></button> <button class="love btn btn-primary" data-ng-click="vm.love()"><span data-ng-if="!vm.currentPostDetail.love">点赞</span> <span data-ng-if="vm.currentPostDetail.love">已点赞</span></button><p class="status" data-ng-if="vm.status">{{ ::vm.status }}</p></footer></article>');

  $templateCache.put('posts/posts_tpl.html', '<div class="post-panel"><div class="sidebar list-group" resize data-ng-show="width > 768 || vm.expand"><a class="post-select list-group-item" data-ng-repeat="post in vm.posts | orderBy: \'pubdate\' : true" data-ng-class="{true: \'active\', false: \'\'}[post.active]" data-ng-click="vm.goto(post._id)"><h2>{{::post.title}}</h2><img class="read" src="img/ic_done_black_24dp_1x.png" data-ng-if="post.read === true && vm.type === \'未读\'"> <span>{{::post.pubdate | toLocalString}}</span></a><div class="status-bar side-bar"><button class="posts btn btn-primary" data-ng-click="vm.readall()" data-ng-if="vm.type === \'未读\'"><span class="glyphicon glyphicon-ok"></span> 全部标记为已读 <span data-ng-if="vm.unread">( {{vm.unread}} )</span></button></div></div><div ui-view class="center" scroll-listen="post.read" data-ng-show="!vm.expand"><div><div class="page-header"><h1>{{vm.type}}文章 <strong>{{vm.unread}}</strong> 篇</h1></div><div class="bs-callout" data-ng-random-class="[\'bs-callout-info\', \'bs-callout-danger\', \'bs-callout-warning\']" data-ng-repeat="feed in vm.postsByFeed"><h4>{{feed[0].feed_title}}<small>{{feed.length}}</small></h4><ul><li data-ng-repeat="post in feed | orderBy:\'date\':true track by post._id"><a data-ng-click="vm.goto(post._id)" data-ng-class="{true: \'visit\', false: \'\'}[post.read && vm.type===\'未读\']">{{post.title}}</a><small>{{post.date | timeago}}</small></li></ul></div><p data-ng-if="!vm.posts.length && vm.type===\'未读\'">全部读完啦</p><p data-ng-if="!vm.posts.length && vm.type===\'星标\'">没有收藏哦</p></div></div></div>');

  $templateCache.put('search/search_tpl.html', '<div class="search-panel container-fluid"><div class="searching" data-ng-if="!vm.err"><p class="lead">搜索中...</p><small>订阅源第一次被搜索时会比较久，请耐心等待...</small></div><div class="alert alert-danger" role="alert" data-ng-if="vm.err" data-ng-bind-html="vm.err"></div></div>');

  $templateCache.put('contextMenu/contextMenu.html', '<div class="context-menu" resize data-ng-show="width > 1024 || vm.expand"><div class="user-avatar"><img data-ng-src="{{vm.user.avatar}}"> <span>{{vm.user.username}}</span></div><div class="list-group"><a href="#" class="list-group-item"><span class="glyphicon glyphicon-globe"></span> 仪表盘</a> <a ui-sref="posts({type: \'unread\'})" class="list-group-item"><span class="glyphicon glyphicon-list"></span> 未读文章</a> <a ui-sref="posts({type: \'mark\'})" class="list-group-item"><span class="glyphicon glyphicon-star"></span> 星标文章</a></div><div class="list-group"><h2>订阅源</h2></div><div class="list-group"><div data-ng-repeat="(folder, feeds) in vm.feeds"><div class="list-group-item feed-item folder-item" data-ng-if="folder !== \'default\'"><img class="favicon" src="img/folder.png"> <span class="title">{{folder}}</span></div><a class="list-group-item feed-item" ui-sref="feed({id: feed.feed_id})" data-ng-click="vm.setTitle()" data-ng-class="{true: \'inner\', false: \'\'}[folder !== \'default\']" data-ng-repeat="feed in feeds track by feed.feed_id"><img class="favicon" onerror="this.src=\'/img/rss.png\';" data-ng-src="{{feed.favicon}}"> <span class="title">{{feed.title}}</span> <span class="badge" data-ng-if="feed.unread">{{feed.unread}}</span></a></div></div><div class="status-bar time-bar"><p class="time"><span class="glyphicon glyphicon-calendar"></span> {{ vm.time | date: \'EEEE yyyy-MM-dd HH:mm:ss a\' }}</p></div></div>');

  $templateCache.put('feedPanel/feedPanel.html', '<div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">订阅源信息</h3><button class="btn btn-primary" data-ng-if="feed.feeded === true" data-ng-click="vm.feedit()">已订阅</button> <button class="btn btn-primary" data-ng-if="feed.feeded === false" data-ng-click="vm.feedit()">未订阅</button></div><div class="panel-body"><div class="row"><p class="col-xs-5 col-sm-4 col-md-3">订阅源标题</p><p class="col-xs-7 col-sm-8 col-md-9">{{feed.title}}</p></div><div class="row" data-ng-if="feed.author"><p class="col-xs-5 col-sm-4 col-md-3">作者</p><p class="col-xs-7 col-sm-8 col-md-9">{{feed.author}}</p></div><div class="row" data-ng-if="feed.pubdate"><p class="col-xs-5 col-sm-4 col-md-3">最近更新时间</p><p class="col-xs-7 col-sm-8 col-md-9">{{feed.pubdate | toLocalString: \'yyyy-MM-dd\'}}</p></div><div class="row"><p class="col-xs-5 col-sm-4 col-md-3">订阅人数</p><p class="col-xs-7 col-sm-8 col-md-9">{{feed.feedNum}}</p></div><div class="row"><p class="col-xs-5 col-sm-4 col-md-3">订阅源网站</p><p class="col-xs-7 col-sm-8 col-md-9">{{feed.link}}</p></div><div class="row"><p class="col-xs-5 col-sm-4 col-md-3">XML 地址</p><p class="col-xs-7 col-sm-8 col-md-9">{{feed.absurl}}</p></div></div></div>');

  $templateCache.put('navbar/navbar.html', '<nav class="rssnav navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><span resize class="glyphicon glyphicon-align-justify" data-ng-show="width <= 1024" data-ng-click="vm.expand()"></span> <a class="navbar-brand">Rss</a></div><form name="form" class="search"><div class="search-btn btn btn-default" data-ng-click="vm.search(feedlink)" data-ng-mouseover="vm.focus()"><input class="search-wrap" type="submit" value> <span class="glyphicon glyphicon-search"></span></div><input type="url" id="search" class="form-control" name="input" placeholder="输入 URL 添加订阅源" autocomplete="off" data-ng-class="{true: \'input-active\', false: \'\'}[vm.active]" data-ng-model="feedlink" data-ng-focus="vm.focus()" data-ng-blur="vm.blur()" data-ng-keypress="$event.which === 13 ? vm.search(feedlink) : \'\'"></form><div resize data-ng-show="width >= 640"><ul class="feed-nav"><li><a ui-sref="home">仪表盘</a></li><li><a ui-sref="posts({type: \'unread\'})">未读文章</a></li><li><a ui-sref="posts({type: \'mark\'})">星标文章</a></li></ul></div></div></nav>');

}]);

})();