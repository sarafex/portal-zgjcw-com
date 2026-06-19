/**
 * Site helper - 页面提示卡与关键词组件
 * 用于展示提示信息、关键标签及访问说明
 */
(function() {
  'use strict';

  // 配置数据
  const CONFIG = {
    siteUrl: 'https://portal-zgjcw.com',
    keyword: '中国竞彩网',
    tipTitle: '温馨提示',
    tipContent: '请确保从官方渠道获取信息，本页面仅作展示参考。',
    tagList: ['竞彩资讯', '官方数据', '赛事分析', '安全提示']
  };

  /**
   * 创建提示卡片
   * @param {string} title - 卡片标题
   * @param {string} content - 卡片内容
   * @param {string} [type='info'] - 卡片类型
   * @returns {HTMLElement} 卡片元素
   */
  function createTipCard(title, content, type) {
    type = type || 'info';
    var card = document.createElement('div');
    card.className = 'tip-card tip-card-' + type;

    var header = document.createElement('div');
    header.className = 'tip-card-header';
    header.textContent = title;

    var body = document.createElement('div');
    body.className = 'tip-card-body';
    body.textContent = content;

    card.appendChild(header);
    card.appendChild(body);
    return card;
  }

  /**
   * 创建一个关键词徽章
   * @param {string} text - 徽章文字
   * @param {string} [color] - 可选背景色
   * @returns {HTMLElement} 徽章元素
   */
  function createBadge(text, color) {
    var badge = document.createElement('span');
    badge.className = 'keyword-badge';
    badge.textContent = text;
    if (color) {
      badge.style.backgroundColor = color;
    }
    return badge;
  }

  /**
   * 创建访问说明区域
   * @param {string} url - 链接地址
   * @param {string} label - 链接文本
   * @returns {HTMLElement} 说明容器
   */
  function createAccessInfo(url, label) {
    var container = document.createElement('div');
    container.className = 'access-info';

    var intro = document.createElement('p');
    intro.textContent = '访问方式：';

    var link = document.createElement('a');
    link.href = url;
    link.textContent = label || url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    var note = document.createElement('p');
    note.className = 'access-note';
    note.textContent = '请认准官方网址，谨防仿冒站点。';

    container.appendChild(intro);
    container.appendChild(link);
    container.appendChild(note);
    return container;
  }

  /**
   * 渲染所有组件到指定容器
   * @param {string|Element} container - 挂载点
   */
  function renderTo(container) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    if (!container) return;

    // 清空容器
    container.innerHTML = '';

    // 1. 提示卡片
    var card = createTipCard(CONFIG.tipTitle, CONFIG.tipContent, 'info');
    container.appendChild(card);

    // 2. 关键词徽章组
    var badgeGroup = document.createElement('div');
    badgeGroup.className = 'badge-group';

    // 将核心关键词设为特殊的徽章
    var coreBadge = createBadge(CONFIG.keyword, '#e74c3c');
    coreBadge.style.color = '#fff';
    badgeGroup.appendChild(coreBadge);

    // 添加额外标签
    CONFIG.tagList.forEach(function(tag) {
      var badge = createBadge(tag);
      badgeGroup.appendChild(badge);
    });

    container.appendChild(badgeGroup);

    // 3. 访问说明
    var access = createAccessInfo(CONFIG.siteUrl, '进入 ' + CONFIG.keyword);
    container.appendChild(access);
  }

  // 自执行：如果 DOM 已加载则直接渲染，否则等待
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function() {
    // 尝试自动挂载到 #site-helper 元素
    var target = document.getElementById('site-helper');
    if (target) {
      renderTo(target);
    }
  });

  // 暴露接口，允许手动调用
  window.SiteHelper = {
    createTipCard: createTipCard,
    createBadge: createBadge,
    createAccessInfo: createAccessInfo,
    renderTo: renderTo
  };
})();