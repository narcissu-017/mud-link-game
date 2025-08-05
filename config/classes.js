// config/classes.js
export const CLASSES = {
    warrior: { 
        name: '战士', type: 'combat', description: '攻守兼备的近战专家。',
        stats: { hp: 120, mp: 30, attack: 12, defense: 10, speed: 8, base_speed: 8 },
        skills: [{ name: "强力打击", description: "造成一次势大力沉的攻击。" },{ name: "防御姿态", description: "短时提升防御力。" }],
        portrait: { male: "assets/images/warrior_m.png", female: "assets/images/warrior_f.png" },
        themeColor: 'red'
    },
    mage: { 
        name: '法师', type: 'combat', description: '操控元素的远程炮台。',
        stats: { hp: 80, mp: 80, attack: 15, defense: 5, speed: 6, base_speed: 6 },
        skills: [{ name: "火球术", description: "投掷一颗火球。" },{ name: "法力护盾", description: "用魔力吸收伤害。" }],
        portrait: { male: "assets/images/mage_m.png", female: "assets/images/mage_f.png" },
        themeColor: 'blue'
    },
    archer: { 
        name: '射手', type: 'combat', description: '身手敏捷的远程猎手。',
        stats: { hp: 100, mp: 50, attack: 10, defense: 7, speed: 12, base_speed: 12 },
        skills: [{ name: "瞄准射击", description: "造成一次高额伤害。" },{ name: "迅捷步法", description: "提升攻击速度。" }],
        portrait: { male: "assets/images/archer_m.png", female: "assets/images/archer_f.png" },
        themeColor: 'green'
    },
    gatherer: { 
        name: '采集者', type: 'production', description: '擅长获取各种资源。',
        stats: { hp: 100, mp: 20, attack: 5, defense: 5, speed: 7, base_speed: 7 },
        skills: [ { name: "敏锐嗅觉", description: "更容易发现稀有采集点。" } ],
        portrait: { male: "assets/images/gatherer_m.png", female: "assets/images/gatherer_f.png" },
        themeColor: 'yellow'
    },
    crafter: { 
        name: '制造者', type: 'production', description: '能够制造各种装备。',
        stats: { hp: 100, mp: 20, attack: 5, defense: 5, speed: 5, base_speed: 5 },
        skills: [ { name: "匠心独运", description: "制造时有几率获得更好属性。" } ],
        portrait: { male: "assets/images/crafter_m.png", female: "assets/images/crafter_f.png" },
        themeColor: 'purple'
    },
};
