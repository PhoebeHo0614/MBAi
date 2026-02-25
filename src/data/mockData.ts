export const USERS = [
  {
    id: '1',
    name: '王杰森',
    school: '北大光华 EMBA',
    title: '创始人 & CEO',
    company: '新能源科技',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
    agents: [
      { type: 'secretary', name: '米娅 (秘书)' },
      { type: 'business', name: '凯 (商务)' }
    ],
    aiSummary: '正在寻找能消化华为910算力芯片的政企大客户。',
    tags: ['AI 基础设施', '芯片制造', 'B轮融资']
  },
  {
    id: '3',
    name: '李迈克',
    school: '长江商学院 EMBA',
    title: '董事总经理',
    company: '未来资本',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop',
    agents: [
      { type: 'secretary', name: '伊娃 (秘书)' },
      { type: 'business', name: '麦克斯 (投资)' }
    ],
    aiSummary: '专注于早期 AI 和机器人初创企业。开放 LP 对接。',
    tags: ['风险投资', '硬科技', '天使投资人']
  },
    {
    id: '4',
    name: '张索菲亚',
    school: '清华经管 MBA',
    title: '首席营销官',
    company: '奢华零售公司',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop',
    agents: [
      { type: 'secretary', name: '莉莉 (秘书)' },
      { type: 'sports', name: '瑜伽 AI' }
    ],
    aiSummary: '探索与高端酒店集团的品牌合作。',
    tags: ['奢侈品零售', '品牌营销', '生活方式']
  }
];

export const SCHEDULE = [
  {
    id: '1',
    time: '09:00 - 12:00',
    title: '战略管理',
    professor: '张教授',
    location: '1号楼 302室',
    status: 'upcoming'
  },
  {
    id: '2',
    time: '14:00 - 17:00',
    title: '财务分析',
    professor: '李教授',
    location: '2号楼 演讲厅A',
    status: 'upcoming'
  }
];

export const CIRCLES = [
  {
    id: '1',
    name: '大湾区网球联盟',
    description: '大湾区商学院网球爱好者聚集地。',
    schools: ['北大', '中欧', '长江'],
    members: 156,
    heat: 95,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '2',
    name: '女性领导力论坛',
    description: '赋能商业领域的女性领导者。',
    schools: ['北大', '中欧', '复旦'],
    members: 89,
    heat: 88,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'AI 投资俱乐部',
    description: '关注人工智能赛道的一级市场投资机会。',
    schools: ['清华', '斯坦福', 'MIT'],
    members: 210,
    heat: 99,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '4',
    name: '全球高尔夫精英会',
    description: '以球会友，链接全球商业领袖。',
    schools: ['中欧', '长江', '哈佛'],
    members: 120,
    heat: 92,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2670&auto=format&fit=crop'
  }
];

export const CONNECTIONS = [
  {
    id: '1',
    user: USERS[0],
    weight: 95,
    lastInteraction: '2小时前',
    agentLog: '我的 Agent 与米娅讨论了关于电动车补贴的新政策。在“政府关系”方面发现匹配点。',
    status: 'connected'
  },
  {
    id: '2',
    user: USERS[1],
    weight: 88,
    lastInteraction: '5小时前',
    agentLog: '交换了初步问候。双方都对“供应链优化”感兴趣。',
    status: 'pending'
  },
  {
    id: '3',
    user: USERS[2],
    weight: 72,
    lastInteraction: '1天前',
    agentLog: '暂定下周二就“A轮融资”进行会议。',
    status: 'connected'
  }
];
