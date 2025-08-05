// config/monsters.js

/**
 * 怪物配置
 * stats: 怪物的基础属性
 * exp: 击败后获得的经验值
 * drops: 可能掉落的物品ID列表
 */
export const MONSTERS = {
    // Zone 1
    slime: { name: "史莱姆", stats: { hp: 20, attack: 5, defense: 2, speed: 3 }, exp: 5, drops: ["slime_gel"] },
    goblin: { name: "哥布林", stats: { hp: 35, attack: 8, defense: 3, speed: 5 }, exp: 10, drops: ["ragged_cloth", "small_axe"] },
    
    // Zone 2
    giant_bat: { name: "巨型蝙蝠", stats: { hp: 50, attack: 12, defense: 5, speed: 12 }, exp: 15, drops: ["bat_wing"] },
    orc_scout: { name: "兽人斥候", stats: { hp: 80, attack: 15, defense: 8, speed: 8 }, exp: 25, drops: ["orc_fang", "leather_armor"] },
    
    // ... 后续区域的怪物可以按需添加
    poisonous_snake: { name: "毒蛇", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    swamp_elemental: { name: "沼泽元素", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    hill_giant: { name: "山丘巨人", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    stone_golem: { name: "石头人", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    skeleton_warrior: { name: "骷髅战士", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    zombie: { name: "僵尸", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    ghost: { name: "幽灵", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    fire_elemental: { name: "火元素", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    lava_golem: { name: "熔岩石人", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    ice_wolf: { name: "冰原狼", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    frost_giant: { name: "霜巨人", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    ancient_guardian: { name: "远古守卫", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    cursed_spirit: { name: "被诅咒的灵魂", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    drake: { name: "幼龙", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    wyvern: { name: "双足飞龙", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    void_ling: { name: "虚空之灵", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
    chaos_demon: { name: "混沌恶魔", stats: { hp: 1, attack: 1, defense: 1, speed: 1 }, exp: 1, drops: [] },
};
