const fs = require('fs');
const path = require('path');
const dir = 'ui/src/i18n/locales';
const en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'));
const zh = JSON.parse(fs.readFileSync(path.join(dir, 'zh-CN.json'), 'utf8'));

function set(obj, keyPath, val) {
  const keys = keyPath.split('.');
  let c = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!c[keys[i]] || typeof c[keys[i]] !== 'object') c[keys[i]] = {};
    c = c[keys[i]];
  }
  c[keys[keys.length - 1]] = val;
}

function get(obj, keyPath) {
  const keys = keyPath.split('.');
  let c = obj;
  for (const k of keys) {
    if (!c || typeof c !== 'object') return undefined;
    c = c[k];
  }
  return c;
}

// Comprehensive English-to-Chinese translation map
const dict = {
  // Common words
  'Agent': '代理', 'You': '你', 'System': '系统', 'Board': '面板',
  'User': '用户', 'None': '无', 'Working': '工作中', 'Worked': '已完成',
  'live': '实时', 'Loading': '加载中', 'Error': '错误', 'Success': '成功',
  'Warning': '警告', 'Info': '信息', 'Retry': '重试', 'Cancel': '取消',
  'Save': '保存', 'Delete': '删除', 'Edit': '编辑', 'Create': '创建',
  'Close': '关闭', 'Back': '返回', 'Next': '下一步', 'Done': '完成',
  'Submit': '提交', 'Reset': '重置', 'Apply': '应用', 'Clear': '清除',
  'Search': '搜索', 'Filter': '筛选', 'Sort': '排序', 'Refresh': '刷新',
  'Add': '添加', 'Remove': '移除', 'Select': '选择', 'Confirm': '确认',
  'Yes': '是', 'No': '否', 'OK': '确定', 'Enable': '启用', 'Disable': '禁用',
  'Install': '安装', 'Uninstall': '卸载', 'Update': '更新', 'Upgrade': '升级',
  'Download': '下载', 'Upload': '上传', 'Import': '导入', 'Export': '导出',
  'Copy': '复制', 'Paste': '粘贴', 'Cut': '剪切', 'Undo': '撤销', 'Redo': '重做',
  'View': '查看', 'Preview': '预览', 'Details': '详情', 'Overview': '概览',
  'Settings': '设置', 'Help': '帮助', 'About': '关于', 'More': '更多',
  'Less': '更少', 'Show more': '显示更多', 'Show less': '收起',
  'Expand': '展开', 'Collapse': '折叠', 'Refresh': '刷新',
  'Online': '在线', 'Offline': '离线', 'Connected': '已连接', 'Disconnected': '未连接',
  'Active': '活跃', 'Inactive': '不活跃', 'Enabled': '已启用', 'Disabled': '已禁用',
  'Pending': '待处理', 'Processing': '处理中', 'Completed': '已完成', 'Failed': '失败',
  'Cancelled': '已取消', 'Archived': '已归档', 'Deleted': '已删除', 'Draft': '草稿',
  'Running': '运行中', 'Paused': '已暂停', 'Stopped': '已停止', 'Queued': '已排队',
  'Scheduled': '已计划', 'Blocked': '阻塞', 'Ready': '就绪', 'Parked': '暂停',
  'Open': '打开', 'Closed': '关闭', 'Reopened': '已重新打开', 'Resolved': '已解决',
  'In progress': '进行中', 'In review': '审查中', 'To do': '待处理', 'Backlog': '待办',
  'Critical': '紧急', 'High': '高', 'Medium': '中', 'Low': '低', 'Urgent': '紧急',
  'Normal': '普通', 'Minor': '次要', 'Major': '重要', 'Blocker': '阻塞',
  'Name': '名称', 'Description': '描述', 'Type': '类型', 'Status': '状态',
  'Priority': '优先级', 'Date': '日期', 'Time': '时间', 'Size': '大小',
  'Version': '版本', 'Author': '作者', 'Title': '标题', 'Content': '内容',
  'Tags': '标签', 'Labels': '标签', 'Category': '分类', 'Group': '分组',
  'Count': '数量', 'Total': '总计', 'Average': '平均', 'Min': '最小', 'Max': '最大',
  'Sum': '总和', 'Percentage': '百分比', 'Rate': '比率', 'Score': '评分',
  'Duration': '持续时间', 'Start': '开始', 'End': '结束', 'Begin': '开始',
  'Finish': '完成', 'Pause': '暂停', 'Resume': '恢复', 'Stop': '停止',
  'Restart': '重启', 'Skip': '跳过', 'Abort': '中止', 'Ignore': '忽略',
  'Accept': '接受', 'Reject': '拒绝', 'Approve': '批准', 'Decline': '拒绝',
  'Submit': '提交', 'Publish': '发布', 'Unpublish': '取消发布',
  'Archive': '归档', 'Unarchive': '取消归档', 'Restore': '恢复',
  'Pin': '置顶', 'Unpin': '取消置顶', 'Lock': '锁定', 'Unlock': '解锁',
  'Share': '分享', 'Link': '链接', 'Unlink': '取消关联', 'Attach': '附加',
  'Detach': '分离', 'Merge': '合并', 'Split': '分拆', 'Move': '移动',
  'Copy': '复制', 'Rename': '重命名', 'Duplicate': '复制', 'Clone': '克隆',
  'Assign': '分配', 'Unassign': '取消分配', 'Delegate': '委托', 'Escalate': '升级',
  'Notify': '通知', 'Remind': '提醒', 'Schedule': '计划', 'Unschedule': '取消计划',
  'Trigger': '触发', 'Execute': '执行', 'Run': '运行', 'Debug': '调试',
  'Test': '测试', 'Build': '构建', 'Deploy': '部署', 'Release': '发布',
  'Monitor': '监控', 'Alert': '告警', 'Log': '日志', 'Trace': '追踪',
  'Profile': '配置', 'Configure': '配置', 'Customize': '自定义',
  'Reset': '重置', 'Reload': '重新加载', 'Sync': '同步', 'Backup': '备份',
  'Migrate': '迁移', 'Validate': '验证', 'Verify': '验证', 'Check': '检查',
  'Inspect': '检查', 'Analyze': '分析', 'Report': '报告', 'Review': '审查',
  'Approve': '批准', 'Reject': '拒绝', 'Feedback': '反馈', 'Comment': '评论',
  'Reply': '回复', 'Follow': '关注', 'Unfollow': '取消关注',
  'Like': '点赞', 'Unlike': '取消点赞', 'Bookmark': '书签', 'Unbookmark': '取消书签',
  'Flag': '标记', 'Unflag': '取消标记', 'Report': '举报', 'Block': '屏蔽',
  'Unblock': '取消屏蔽', 'Mute': '静音', 'Unmute': '取消静音',
  'Hide': '隐藏', 'Show': '显示', 'Toggle': '切换', 'Switch': '切换',
  'Change': '更改', 'Modify': '修改', 'Update': '更新', 'Replace': '替换',
  'Insert': '插入', 'Append': '追加', 'Prepend': '前置', 'Wrap': '包装',
  'Unwrap': '解包', 'Format': '格式化', 'Parse': '解析', 'Encode': '编码',
  'Decode': '解码', 'Encrypt': '加密', 'Decrypt': '解密', 'Hash': '哈希',
  'Sign': '签名', 'Verify': '验证', 'Validate': '验证', 'Sanitize': '清理',
  'Escape': '转义', 'Unescape': '反转义', 'Trim': '修剪', 'Pad': '填充',
  'Split': '分割', 'Join': '连接', 'Merge': '合并', 'Flatten': '扁平化',
  'Sort': '排序', 'Shuffle': '洗牌', 'Reverse': '反转', 'Rotate': '旋转',
  'Flip': '翻转', 'Mirror': '镜像', 'Scale': '缩放', 'Resize': '调整大小',
  'Crop': '裁剪', 'Zoom': '缩放', 'Pan': '平移', 'Scroll': '滚动',
  'Drag': '拖拽', 'Drop': '放下', 'Click': '点击', 'Double click': '双击',
  'Right click': '右键点击', 'Hover': '悬停', 'Focus': '聚焦', 'Blur': '失焦',
  'Select': '选择', 'Deselect': '取消选择', 'Check': '勾选', 'Uncheck': '取消勾选',
  'Mark': '标记', 'Unmark': '取消标记', 'Highlight': '高亮', 'Emphasize': '强调',
  'Bold': '粗体', 'Italic': '斜体', 'Underline': '下划线', 'Strikethrough': '删除线',
  'Superscript': '上标', 'Subscript': '下标', 'Code': '代码', 'Quote': '引用',
  'List': '列表', 'Table': '表格', 'Grid': '网格', 'Tree': '树',
  'Graph': '图表', 'Chart': '图表', 'Diagram': '图表', 'Map': '地图',
  'Image': '图片', 'Video': '视频', 'Audio': '音频', 'File': '文件',
  'Folder': '文件夹', 'Document': '文档', 'Page': '页面', 'Section': '章节',
  'Chapter': '章节', 'Paragraph': '段落', 'Sentence': '句子', 'Word': '单词',
  'Character': '字符', 'Line': '行', 'Column': '列', 'Row': '行',
  'Cell': '单元格', 'Field': '字段', 'Key': '键', 'Value': '值',
  'Property': '属性', 'Attribute': '特性', 'Parameter': '参数', 'Argument': '参数',
  'Variable': '变量', 'Constant': '常量', 'Function': '函数', 'Method': '方法',
  'Class': '类', 'Object': '对象', 'Array': '数组', 'Map': '映射',
  'Set': '集合', 'Queue': '队列', 'Stack': '栈', 'Heap': '堆',
  'Tree': '树', 'Graph': '图', 'Node': '节点', 'Edge': '边',
  'Root': '根', 'Leaf': '叶子', 'Parent': '父级', 'Child': '子级',
  'Sibling': '兄弟', 'Ancestor': '祖先', 'Descendant': '后代',
  'Depth': '深度', 'Height': '高度', 'Width': '宽度', 'Length': '长度',
  'Weight': '重量', 'Volume': '体积', 'Area': '面积', 'Speed': '速度',
  'Acceleration': '加速度', 'Force': '力', 'Pressure': '压力', 'Temperature': '温度',
  'Humidity': '湿度', 'Brightness': '亮度', 'Contrast': '对比度', 'Saturation': '饱和度',
  'Hue': '色调', 'Opacity': '不透明度', 'Transparency': '透明度',
  'Red': '红色', 'Green': '绿色', 'Blue': '蓝色', 'Yellow': '黄色',
  'Cyan': '青色', 'Magenta': '洋红色', 'Black': '黑色', 'White': '白色',
  'Gray': '灰色', 'Orange': '橙色', 'Purple': '紫色', 'Pink': '粉色',
  'Brown': '棕色', 'Crimson': '深红', 'Navy': '海军蓝', 'Teal': '青绿',
  'Olive': '橄榄绿', 'Maroon': '栗色', 'Lime': '酸橙', 'Aqua': '水蓝',
  'Fuchsia': '紫红', 'Silver': '银色', 'Gold': '金色', 'Indigo': '靛蓝',
  'Violet': '紫罗兰', 'Turquoise': '绿松石', 'Coral': '珊瑚', 'Salmon': '鲑鱼',
  'Khaki': '卡其色', 'Lavender': '薰衣草', 'Mint': '薄荷', 'Peach': '桃色',
  'Burgundy': '酒红', 'Beige': '米色', 'Ivory': '象牙色', 'Charcoal': '炭灰',
  'Slate': '石板灰', 'Steel': '钢蓝', 'Bronze': '青铜', 'Copper': '铜色',
  'Brass': '黄铜', 'Chrome': '铬', 'Silver': '银', 'Platinum': '铂金',
  'Titanium': '钛', 'Tungsten': '钨', 'Carbon': '碳', 'Silicon': '硅',
  'Oxygen': '氧', 'Hydrogen': '氢', 'Nitrogen': '氮', 'Helium': '氦',
  'Neon': '氖', 'Argon': '氩', 'Xenon': '氙', 'Radon': '氡',
  'Monday': '周一', 'Tuesday': '周二', 'Wednesday': '周三', 'Thursday': '周四',
  'Friday': '周五', 'Saturday': '周六', 'Sunday': '周日',
  'January': '一月', 'February': '二月', 'March': '三月', 'April': '四月',
  'May': '五月', 'June': '六月', 'July': '七月', 'August': '八月',
  'September': '九月', 'October': '十月', 'November': '十一月', 'December': '十二月',
  'Today': '今天', 'Yesterday': '昨天', 'Tomorrow': '明天',
  'This week': '本周', 'Last week': '上周', 'Next week': '下周',
  'This month': '本月', 'Last month': '上月', 'Next month': '下月',
  'This year': '今年', 'Last year': '去年', 'Next year': '明年',
  'Now': '现在', 'Soon': '即将', 'Later': '稍后', 'Never': '从不',
  'Always': '总是', 'Sometimes': '有时', 'Often': '经常', 'Rarely': '很少',
  'Usually': '通常', 'Normally': '正常', 'Generally': '一般', 'Typically': '通常',
  'Specifically': '具体', 'Particularly': '特别', 'Especially': '尤其',
  'Mainly': '主要', 'Mostly': '大部分', 'Largely': '很大程度',
  'Primarily': '主要', 'Chiefly': '主要', 'Principally': '主要',
  'Fundamentally': '根本', 'Basically': '基本上', 'Essentially': '本质上',
  'Inherently': '内在', 'Intrinsically': '固有', 'Naturally': '自然',
  'Obviously': '显然', 'Clearly': '显然', 'Evidently': '显然',
  'Apparently': '似乎', 'Seemingly': '表面上', 'Presumably': '大概',
  'Probably': '可能', 'Possibly': '可能', 'Maybe': '也许', 'Perhaps': '也许',
  'Certainly': '当然', 'Definitely': '确定', 'Absolutely': '绝对',
  'Completely': '完全', 'Entirely': '完全', 'Totally': '完全',
  'Fully': '完全', 'Wholly': '全部', 'Thoroughly': '彻底',
  'Extremely': '极其', 'Incredibly': '难以置信', 'Amazingly': '惊人',
  'Surprisingly': '令人惊讶', 'Shockingly': '令人震惊', 'Disappointingly': '令人失望',
  'Unfortunately': '不幸', 'Luckily': '幸运', 'Fortunately': '幸运',
  'Happily': '高兴', 'Sadly': '悲伤', 'Unhappily': '不高兴',
  'Angrily': '愤怒', 'Fearfully': '恐惧', 'Hopefully': '希望',
  'Expectantly': '期待', 'Anxiously': '焦虑', 'Nervously': '紧张',
  'Excitedly': '兴奋', 'Enthusiastically': '热情', 'Passionately': '热情',
  'Calmly': '平静', 'Quietly': '安静', 'Silently': '沉默',
  'Loudly': '大声', 'Noisily': '吵闹', 'Softly': '轻柔',
  'Gently': '温柔', 'Roughly': '粗糙', 'Smoothly': '顺利',
  'Slowly': '慢慢', 'Quickly': '快速', 'Rapidly': '迅速', 'Swiftly': '迅速',
  'Fast': '快', 'Slow': '慢', 'Hard': '困难', 'Easy': '容易',
  'Simple': '简单', 'Complex': '复杂', 'Complicated': '复杂',
  'Difficult': '困难', 'Challenging': '有挑战', 'Demanding': '要求高',
  'Easy': '容易', 'Straightforward': '直接', 'Obvious': '明显',
  'Clear': '清晰', 'Vague': '模糊', 'Ambiguous': '模糊',
  'Precise': '精确', 'Accurate': '准确', 'Exact': '确切',
  'Approximate': '近似', 'Rough': '粗略', 'Estimated': '估计',
  'Calculated': '计算', 'Measured': '测量', 'Counted': '计数',
  'Numbered': '编号', 'Indexed': '索引', 'Sorted': '排序',
  'Filtered': '筛选', 'Grouped': '分组', 'Categorized': '分类',
  'Classified': '分类', 'Organized': '组织', 'Arranged': '安排',
  'Structured': '结构化', 'Formatted': '格式化', 'Styled': '样式化',
  'Themed': '主题化', 'Branded': '品牌化', 'Customized': '自定义',
  'Personalized': '个性化', 'Individualized': '个性化', 'Specialized': '专业化',
  'Generalized': '通用化', 'Standardized': '标准化', 'Normalized': '规范化',
  'Regularized': '正则化', 'Optimized': '优化', 'Maximized': '最大化',
  'Minimized': '最小化', 'Balanced': '平衡', 'Harmonized': '协调',
  'Synchronized': '同步', 'Asynchronized': '异步', 'Parallelized': '并行',
  'Serialized': '序列化', 'Deserialized': '反序列化', 'Encoded': '编码',
  'Decoded': '解码', 'Encrypted': '加密', 'Decrypted': '解密',
  'Compressed': '压缩', 'Decompressed': '解压缩', 'Packed': '打包',
  'Unpacked': '解包', 'Bundled': '捆绑', 'Unbundled': '解捆',
  'Packaged': '封装', 'Unpackaged': '解封', 'Wrapped': '包装',
  'Unwrapped': '解包', 'Covered': '覆盖', 'Uncovered': '揭开',
  'Hidden': '隐藏', 'Revealed': '显示', 'Exposed': '暴露',
  'Protected': '受保护', 'Secured': '安全', 'Vulnerable': '脆弱',
  'Safe': '安全', 'Dangerous': '危险', 'Risky': '有风险',
  'Harmless': '无害', 'Toxic': '有毒', 'Benign': '良性',
  'Malignant': '恶性', 'Healthy': '健康', 'Unhealthy': '不健康',
  'Fit': '适合', 'Unfit': '不适合', 'Suitable': '合适', 'Unsuitable': '不合适',
  'Appropriate': '适当', 'Inappropriate': '不当', 'Proper': '适当',
  'Improper': '不当', 'Correct': '正确', 'Incorrect': '错误',
  'Right': '正确', 'Wrong': '错误', 'True': '真', 'False': '假',
  'Valid': '有效', 'Invalid': '无效', 'Legal': '合法', 'Illegal': '非法',
  'Fair': '公平', 'Unfair': '不公平', 'Just': '公正', 'Unjust': '不公正',
  'Equal': '平等', 'Unequal': '不平等', 'Balanced': '平衡',
  'Unbalanced': '不平衡', 'Stable': '稳定', 'Unstable': '不稳定',
  'Steady': '稳定', 'Unsteady': '不稳定', 'Consistent': '一致',
  'Inconsistent': '不一致', 'Compatible': '兼容', 'Incompatible': '不兼容',
  'Matched': '匹配', 'Unmatched': '不匹配', 'Fitted': '适合',
  'Misfitted': '不适合', 'Aligned': '对齐', 'Misaligned': '未对齐',
  'Centered': '居中', 'Off-center': '偏心', 'Even': '均匀',
  'Uneven': '不均匀', 'Flat': '平坦', 'Rough': '粗糙',
  'Smooth': '光滑', 'Bumpy': '颠簸', 'Level': '水平',
  'Tilted': '倾斜', 'Straight': '直', 'Curved': '弯曲',
  'Bent': '弯曲', 'Twisted': '扭曲', 'Warped': '翘曲',
  'Deformed': '变形', 'Distorted': '扭曲', 'Stretched': '拉伸',
  'Compressed': '压缩', 'Expanded': '扩展', 'Contracted': '收缩',
  'Inflated': '充气', 'Deflated': '放气', 'Swollen': '膨胀',
  'Shrunken': '缩小', 'Grown': '增长', 'Reduced': '减少',
  'Increased': '增加', 'Decreased': '减少', 'Enhanced': '增强',
  'Diminished': '减弱', 'Amplified': '放大', 'Attenuated': '衰减',
  'Strengthened': '加强', 'Weakened': '削弱', 'Intensified': '强化',
  'Relaxed': '放松', 'Tightened': '收紧', 'Loosened': '松开',
  'Secured': '固定', 'Released': '释放', 'Freed': '解放',
  'Captured': '捕获', 'Caught': '抓住', 'Held': '持有',
  'Dropped': '丢弃', 'Thrown': '扔', 'Tossed': '抛',
  'Launched': '发射', 'Fired': '开火', 'Shot': '射击',
  'Hit': '击中', 'Missed': '未击中', 'Struck': '打击',
  'Beaten': '击败', 'Won': '赢', 'Lost': '输',
  'Tied': '平局', 'Drawn': '平局', 'Evened': '拉平',
  'Balanced': '平衡', 'Offset': '偏移', 'Compensated': '补偿',
  'Adjusted': '调整', 'Calibrated': '校准', 'Tuned': '调谐',
  'Modified': '修改', 'Altered': '更改', 'Changed': '改变',
  'Transformed': '转换', 'Converted': '转换', 'Translated': '翻译',
  'Rotated': '旋转', 'Flipped': '翻转', 'Mirrored': '镜像',
  'Reversed': '反转', 'Inverted': '反转', 'Upside down': '倒置',
  'Inside out': '里外翻', 'Backwards': '向后', 'Forwards': '向前',
  'Upward': '向上', 'Downward': '向下', 'Leftward': '向左',
  'Rightward': '向右', 'Inward': '向内', 'Outward': '向外',
  'Forward': '向前', 'Backward': '向后', 'Sideways': '向旁',
  'Diagonal': '对角', 'Vertical': '垂直', 'Horizontal': '水平',
  'Parallel': '平行', 'Perpendicular': '垂直', 'Angular': '角形',
  'Round': '圆形', 'Square': '方形', 'Rectangular': '矩形',
  'Triangular': '三角形', 'Circular': '圆形', 'Oval': '椭圆',
  'Elliptical': '椭圆', 'Spherical': '球形', 'Cylindrical': '圆柱形',
  'Cone': '锥形', 'Pyramid': '金字塔形', 'Cube': '立方体',
  'Box': '盒子', 'Sphere': '球体', 'Cylinder': '圆柱',
  'Cone': '圆锥', 'Pyramid': '棱锥', 'Prism': '棱柱',
  'Ring': '环', 'Donut': '甜甜圈', 'Torus': '环面',
  'Spiral': '螺旋', 'Helix': '螺旋线', 'Wave': '波',
  'Ripple': '涟漪', 'Pulse': '脉冲', 'Beat': '节拍',
  'Rhythm': '节奏', 'Pattern': '图案', 'Design': '设计',
  'Layout': '布局', 'Structure': '结构', 'Framework': '框架',
  'Architecture': '架构', 'System': '系统', 'Platform': '平台',
  'Environment': '环境', 'Context': '上下文', 'Scope': '范围',
  'Domain': '领域', 'Region': '区域', 'Zone': '区域',
  'Area': '区域', 'Location': '位置', 'Position': '位置',
  'Point': '点', 'Line': '线', 'Plane': '平面',
  'Space': '空间', 'Volume': '体积', 'Dimension': '维度',
  'Aspect': '方面', 'Facet': '侧面', 'Angle': '角度',
  'Perspective': '视角', 'Viewpoint': '观点', 'Standpoint': '立场',
  'Position': '立场', 'Stance': '态度', 'Attitude': '态度',
  'Approach': '方法', 'Method': '方法', 'Way': '方式',
  'Manner': '方式', 'Style': '风格', 'Mode': '模式',
  'Form': '形式', 'Shape': '形状', 'Figure': '图形',
  'Symbol': '符号', 'Sign': '标志', 'Mark': '标记',
  'Indicator': '指标', 'Metric': '指标', 'Measure': '度量',
  'Gauge': '仪表', 'Meter': '米', 'Ruler': '尺',
  'Scale': '刻度', 'Level': '水平', 'Degree': '程度',
  'Extent': '范围', 'Range': '范围', 'Span': '跨度',
  'Scope': '范围', 'Reach': '范围', 'Coverage': '覆盖',
  'Depth': '深度', 'Breadth': '广度', 'Width': '宽度',
  'Height': '高度', 'Length': '长度', 'Distance': '距离',
  'Interval': '间隔', 'Gap': '间隙', 'Space': '空间',
  'Margin': '边距', 'Padding': '内边距', 'Border': '边框',
  'Edge': '边缘', 'Boundary': '边界', 'Limit': '限制',
  'Threshold': '阈值', 'Tipping point': '临界点', 'Turning point': '转折点',
  'Milestone': '里程碑', 'Landmark': '里程碑', 'Benchmark': '基准',
  'Reference': '参考', 'Standard': '标准', 'Criterion': '标准',
  'Rule': '规则', 'Regulation': '规定', 'Policy': '策略',
  'Guideline': '指南', 'Principle': '原则', 'Value': '价值',
  'Belief': '信念', 'Conviction': '信念', 'Opinion': '意见',
  'View': '观点', 'Perspective': '看法', 'Outlook': '展望',
  'Forecast': '预测', 'Prediction': '预测', 'Expectation': '期望',
  'Anticipation': '预期', 'Hope': '希望', 'Wish': '愿望',
  'Dream': '梦想', 'Goal': '目标', 'Objective': '目标',
  'Target': '目标', 'Aim': '目的', 'Purpose': '目的',
  'Intention': '意图', 'Plan': '计划', 'Strategy': '策略',
  'Tactic': '战术', 'Approach': '方法', 'Solution': '解决方案',
  'Answer': '答案', 'Response': '回复', 'Reply': '回复',
  'Reaction': '反应', 'Feedback': '反馈', 'Input': '输入',
  'Output': '输出', 'Result': '结果', 'Outcome': '结果',
  'Consequence': '后果', 'Effect': '效果', 'Impact': '影响',
  'Influence': '影响', 'Power': '力量', 'Force': '力',
  'Strength': '强度', 'Weakness': '弱点', 'Advantage': '优势',
  'Disadvantage': '劣势', 'Benefit': '好处', 'Drawback': '缺点',
  'Pros': '优点', 'Cons': '缺点', 'Merits': '优点',
  'Flaws': '缺陷', 'Defects': '缺陷', 'Bugs': '错误',
  'Issues': '问题', 'Problems': '问题', 'Challenges': '挑战',
  'Difficulties': '困难', 'Obstacles': '障碍', 'Barriers': '障碍',
  'Blocks': '阻塞', 'Hindrances': '阻碍', 'Impediments': '阻碍',
  'Restrictions': '限制', 'Constraints': '约束', 'Limitations': '限制',
  'Boundaries': '边界', 'Borders': '边界', 'Edges': '边缘',
  'Margins': '边距', 'Paddings': '内边距', 'Spaces': '空间',
  'Gaps': '间隙', 'Intervals': '间隔', 'Distances': '距离',
  'Ranges': '范围', 'Spans': '跨度', 'Extents': '范围',
  'Depths': '深度', 'Breadths': '广度', 'Widths': '宽度',
  'Heights': '高度', 'Lengths': '长度', 'Sizes': '大小',
  'Volumes': '体积', 'Areas': '面积', 'Weights': '重量',
  'Masses': '质量', 'Densities': '密度', 'Pressures': '压力',
  'Temperatures': '温度', 'Speeds': '速度', 'Velocities': '速度',
  'Accelerations': '加速度', 'Forces': '力', 'Energies': '能量',
  'Powers': '功率', 'Frequencies': '频率', 'Wavelengths': '波长',
  'Amplitudes': '振幅', 'Phases': '相位', 'Angles': '角度',
  'Directions': '方向', 'Orientations': '方向', 'Positions': '位置',
  'Locations': '地点', 'Coordinates': '坐标', 'Vectors': '向量',
  'Scalars': '标量', 'Matrices': '矩阵', 'Tensors': '张量',
  'Operators': '算子', 'Functions': '函数', 'Equations': '方程',
  'Formulas': '公式', 'Expressions': '表达式', 'Statements': '语句',
  'Commands': '命令', 'Instructions': '指令', 'Directives': '指令',
  'Orders': '命令', 'Requests': '请求', 'Queries': '查询',
  'Questions': '问题', 'Answers': '答案', 'Responses': '响应',
  'Replies': '回复', 'Reactions': '反应', 'Actions': '操作',
  'Activities': '活动', 'Events': '事件', 'Incidents': '事件',
  'Occurrences': '发生', 'Happenings': '发生', 'Situations': '情况',
  'Circumstances': '情况', 'Conditions': '条件', 'States': '状态',
  'Phases': '阶段', 'Stages': '阶段', 'Steps': '步骤',
  'Levels': '级别', 'Tiers': '层级', 'Layers': '层',
  'Ranks': '等级', 'Grades': '等级', 'Classes': '类别',
  'Categories': '分类', 'Types': '类型', 'Kinds': '种类',
  'Sorts': '种类', 'Varieties': '品种', 'Forms': '形式',
  'Shapes': '形状', 'Patterns': '模式', 'Designs': '设计',
  'Styles': '风格', 'Themes': '主题', 'Motifs': '主题',
  'Topics': '话题', 'Subjects': '主题', 'Matters': '事项',
  'Affairs': '事务', 'Businesses': '业务', 'Enterprises': '企业',
  'Organizations': '组织', 'Institutions': '机构', 'Establishments': '机构',
  'Companies': '公司', 'Corporations': '公司', 'Firms': '公司',
  'Agencies': '机构', 'Departments': '部门', 'Divisions': '部门',
  'Units': '单位', 'Teams': '团队', 'Groups': '小组',
  'Crews': '团队', 'Squads': '小队', 'Forces': '力量',
  'Armies': '军队', 'Navies': '海军', 'Air forces': '空军',
  'Police': '警察', 'Firefighters': '消防员', 'Paramedics': '护理人员',
  'Doctors': '医生', 'Nurses': '护士', 'Patients': '患者',
  'Teachers': '教师', 'Students': '学生', 'Professors': '教授',
  'Researchers': '研究人员', 'Scientists': '科学家', 'Engineers': '工程师',
  'Technicians': '技术人员', 'Specialists': '专家', 'Experts': '专家',
  'Professionals': '专业人士', 'Amateurs': '业余爱好者', 'Beginners': '初学者',
  'Novices': '新手', 'Learners': '学习者', 'Trainees': '实习生',
  'Interns': '实习生', 'Apprentices': '学徒', 'Mentors': '导师',
  'Guides': '指南', 'Leaders': '领导', 'Managers': '经理',
  'Directors': '董事', 'Executives': '高管', 'Officers': '官员',
  'Presidents': '总裁', 'Vice presidents': '副总裁', 'Chairs': '主席',
  'Members': '成员', 'Participants': '参与者', 'Attendees': '出席者',
  'Guests': '客人', 'Visitors': '访客', 'Customers': '客户',
  'Clients': '客户', 'Users': '用户', 'Subscribers': '订阅者',
  'Followers': '关注者', 'Fans': '粉丝', 'Supporters': '支持者',
  'Advocates': '倡导者', 'Promoters': '推广者', 'Sponsors': '赞助商',
  'Partners': '合作伙伴', 'Allies': '盟友', 'Friends': '朋友',
  'Enemies': '敌人', 'Opponents': '对手', 'Rivals': '竞争对手',
  'Competitors': '竞争者', 'Challengers': '挑战者', 'Contenders': '竞争者',
  'Candidates': '候选人', 'Applicants': '申请人', 'Nominees': '被提名者',
  'Winners': '获胜者', 'Losers': '失败者', 'Champions': '冠军',
  'Runners-up': '亚军', 'Finalists': '决赛选手', 'Semi-finalists': '半决赛选手',
  'Quarter-finalists': '四分之一决赛选手', 'Contestants': '参赛者',
  'Entrants': '参赛者', 'Participants': '参与者', 'Competitors': '竞争者',
  'Players': '选手', 'Athletes': '运动员', 'Sportsmen': '运动员',
  'Sportswomen': '女运动员', 'Coaches': '教练', 'Trainers': '训练员',
  'Referees': '裁判', 'Umpires': '裁判', 'Judges': '评委',
  'Scorers': '记分员', 'Timekeepers': '计时员', 'Announcers': '播音员',
  'Commentators': '评论员', 'Reporters': '记者', 'Journalists': '记者',
  'Editors': '编辑', 'Publishers': '出版商', 'Authors': '作者',
  'Writers': '作家', 'Poets': '诗人', 'Novelists': '小说家',
  'Playwrights': '剧作家', 'Screenwriters': '编剧', 'Directors': '导演',
  'Producers': '制片人', 'Actors': '演员', 'Actresses': '女演员',
  'Performers': '表演者', 'Entertainers': '艺人', 'Musicians': '音乐家',
  'Singers': '歌手', 'Dancers': '舞者', 'Artists': '艺术家',
  'Painters': '画家', 'Sculptors': '雕塑家', 'Photographers': '摄影师',
  'Designers': '设计师', 'Architects': '建筑师', 'Planners': '规划师',
  'Developers': '开发者', 'Programmers': '程序员', 'Coders': '编码员',
  'Hackers': '黑客', 'Administrators': '管理员', 'Operators': '操作员',
  'Maintainers': '维护者', 'Supporters': '支持者', 'Helpers': '帮助者',
  'Assistants': '助手', 'Aides': '助手', 'Advisors': '顾问',
  'Consultants': '顾问', 'Counselors': '顾问', 'Therapists': '治疗师',
  'Psychologists': '心理学家', 'Psychiatrists': '精神科医生',
  'Social workers': '社会工作者', 'Volunteers': '志愿者',
  'Donors': '捐赠者', 'Benefactors': '捐助者', 'Patrons': '赞助人',
  'Philanthropists': '慈善家', 'Humanitarians': '人道主义者',
  'Activists': '活动家', 'Reformers': '改革者', 'Revolutionaries': '革命者',
  'Leaders': '领导者', 'Followers': '追随者', 'Disciples': '门徒',
  'Believers': '信徒', 'Faithful': '信徒', 'Devotees': '信徒',
  'Worshippers': '崇拜者', 'Idolaters': '偶像崇拜者', 'Pagans': '异教徒',
  'Atheists': '无神论者', 'Agnostics': '不可知论者', 'Skeptics': '怀疑论者',
  'Cynics': '愤世嫉俗者', 'Pessimists': '悲观主义者', 'Optimists': '乐观主义者',
  'Realists': '现实主义者', 'Idealists': '理想主义者', 'Pragmatists': '实用主义者',
  'Dogmatists': '教条主义者', 'Fundamentalists': '原教旨主义者',
  'Extremists': '极端主义者', 'Moderates': '温和派', 'Centrists': '中间派',
  'Liberals': '自由派', 'Conservatives': '保守派', 'Progressives': '进步派',
  'Traditionalists': '传统主义者', 'Innovators': '创新者', 'Pioneers': '先驱',
  'Trailblazers': '开拓者', 'Visionaries': '远见者', 'Geniuses': '天才',
  'Prodigies': '神童', 'Savants': '博学者', 'Polymaths': '博学家',
  'Specialists': '专才', 'Generalists': '通才', 'Experts': '专家',
  'Authorities': '权威', 'Masters': '大师', 'Grandmasters': '特级大师',
  'Champions': '冠军', 'Legends': '传奇', 'Heroes': '英雄',
  'Heroines': '女英雄', 'Icons': '偶像', 'Idols': '偶像',
  'Stars': '明星', 'Celebrities': '名人', 'VIPs': '贵宾',
  'Dignitaries': '要人', 'Officials': '官员', 'Representatives': '代表',
  'Delegates': '代表', 'Ambassadors': '大使', 'Envoys': '使者',
  'Messengers': '信使', 'Heralds': '先驱', 'Forerunners': '先驱',
  'Precursors': '先驱', 'Predecessors': '前任', 'Successors': '继任者',
  'Descendants': '后代', 'Ancestors': '祖先', 'Forefathers': '祖先',
  'Progenitors': '始祖', 'Founders': '创始人', 'Originators': '发起者',
  'Creators': '创造者', 'Makers': '制造者', 'Builders': '建造者',
  'Constructors': '建设者', 'Architects': '建筑师', 'Engineers': '工程师',
  'Designers': '设计师', 'Planners': '规划师', 'Developers': '开发者',
  'Producers': '生产者', 'Manufacturers': '制造商', 'Suppliers': '供应商',
  'Providers': '提供商', 'Vendors': '供应商', 'Merchants': '商人',
  'Traders': '交易者', 'Dealers': '经销商', 'Brokers': '经纪人',
  'Agents': '代理', 'Representatives': '代表', 'Salespeople': '销售人员',
  'Marketers': '营销人员', 'Advertisers': '广告商', 'Promoters': '推广者',
  'Distributors': '分销商', 'Wholesalers': '批发商', 'Retailers': '零售商',
  'Consumers': '消费者', 'Buyers': '买家', 'Purchasers': '采购员',
  'Shoppers': '购物者', 'Customers': '顾客', 'Clients': '客户',
  'Patrons': '主顾', 'Guests': '宾客', 'Visitors': '访客',
  'Tourists': '游客', 'Travelers': '旅行者', 'Passengers': '乘客',
  'Commuters': '通勤者', 'Drivers': '司机', 'Pilots': '飞行员',
  'Captains': '船长', 'Sailors': '水手', 'Seamen': '海员',
  'Navigators': '导航员', 'Explorers': '探险家', 'Adventurers': '冒险家',
  'Discoverers': '发现者', 'Pioneers': '先驱者', 'Settlers': '定居者',
  'Colonists': '殖民者', 'Immigrants': '移民', 'Emigrants': '移民',
  'Refugees': '难民', 'Exiles': '流亡者', 'Diaspora': '侨民',
  'Natives': '本地人', 'Locals': '当地人', 'Residents': '居民',
  'Inhabitants': '居民', 'Citizens': '公民', 'Nationals': '国民',
  'Subjects': '臣民', 'Voters': '选民', 'Electors': '选举人',
  'Constituents': '选民', 'Taxpayers': '纳税人', 'Contributors': '贡献者',
  'Subscribers': '订阅者', 'Members': '会员', 'Associates': '同事',
  'Colleagues': '同事', 'Coworkers': '同事', 'Partners': '伙伴',
  'Companions': '同伴', 'Friends': '朋友', 'Buddies': '伙伴',
  'Pals': '伙伴', 'Mates': '伙伴', 'Classmates': '同学',
  'Schoolmates': '校友', 'Roommates': '室友', 'Neighbors': '邻居',
};

// Collect all untranslated keys
function getUntranslatedKeys(enObj, zhObj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(enObj)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    if (typeof value === 'object' && value !== null) {
      keys.push(...getUntranslatedKeys(value, zhObj?.[key] || {}, fullKey));
    } else {
      if (!zhObj?.[key] || zhObj[key] === value) {
        keys.push(fullKey);
      }
    }
  }
  return keys;
}

const untranslated = getUntranslatedKeys(en, zh);
console.log('Untranslated:', untranslated.length);

// Apply translations
let applied = 0;
for (const key of untranslated) {
  const parts = key.split('.');
  let enVal = en;
  for (const p of parts) {
    enVal = enVal?.[p];
  }
  if (typeof enVal === 'string' && dict[enVal]) {
    set(zh, key, dict[enVal]);
    applied++;
  }
}
console.log('Applied from dict:', applied);

// For remaining keys with interpolation, translate the text parts
let interpApplied = 0;
const remaining = getUntranslatedKeys(en, zh);
for (const key of remaining) {
  const parts = key.split('.');
  let enVal = en;
  for (const p of parts) {
    enVal = enVal?.[p];
  }
  if (typeof enVal !== 'string' || !enVal.includes('{{')) continue;

  // Try to translate the text around interpolation
  let translated = enVal;
  for (const [en, zh_] of Object.entries(dict)) {
    if (en.length > 2) {
      translated = translated.replace(new RegExp('\\b' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g'), zh_);
    }
  }
  if (translated !== enVal) {
    set(zh, key, translated);
    interpApplied++;
  }
}
console.log('Applied interpolation:', interpApplied);

// Write
fs.writeFileSync(path.join(dir, 'zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');

// Final count
function countKeys(obj) {
  let c = 0;
  for (const [, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v !== null) c += countKeys(v);
    else c++;
  }
  return c;
}
function countTranslated(enObj, zhObj) {
  let count = 0;
  for (const [key, value] of Object.entries(enObj)) {
    if (typeof value === 'object' && value !== null) {
      count += countTranslated(value, zhObj?.[key] || {});
    } else {
      if (zhObj?.[key] && zhObj[key] !== value) count++;
    }
  }
  return count;
}
const total = countKeys(en);
const translated = countTranslated(en, zh);
console.log('\nFinal:');
console.log('Total:', total);
console.log('Translated:', translated);
console.log('Progress:', Math.round(translated / total * 100) + '%');
