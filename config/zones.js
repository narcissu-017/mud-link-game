// config/zones.js

/**
 * 探索区域配置
 * levelRange: 建议进入的等级范围
 * monsters: 该区域可能遇到的怪物ID列表
 */
export const ZONES = {
    zone1: { name: "新手森林", levelRange: "1-10", monsters: ["slime", "goblin"] },
    zone2: { name: "废弃矿坑", levelRange: "11-20", monsters: ["giant_bat", "orc_scout"] },
    zone3: { name: "幽暗沼泽", levelRange: "21-30", monsters: ["poisonous_snake", "swamp_elemental"] },
    zone4: { name: "巨人山脚", levelRange: "31-40", monsters: ["hill_giant", "stone_golem"] },
    zone5: { name: "亡灵墓地", levelRange: "41-50", monsters: ["skeleton_warrior", "zombie", "ghost"] },
    zone6: { name: "炙热火山", levelRange: "51-60", monsters: ["fire_elemental", "lava_golem"] },
    zone7: { name: "冰封雪原", levelRange: "61-70", monsters: ["ice_wolf", "frost_giant"] },
    zone8: { name: "古代遗迹", levelRange: "71-80", monsters: ["ancient_guardian", "cursed_spirit"] },
    zone9: { name: "巨龙之巢", levelRange: "81-90", monsters: ["drake", "wyvern"] },
    zone10: { name: "虚空裂隙", levelRange: "91-100", monsters: ["void_ling", "chaos_demon"] },
};
