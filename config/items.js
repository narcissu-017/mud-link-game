// config/items.js

/**
 * 道具和装备配置
 * type: 'material' (材料), 'consumable' (消耗品), 'equipment' (装备)
 * slot: 装备槽位 (如果类型是 equipment)
 * stats: 装备提供的属性加成
 */
export const ITEMS = {
    // --- 材料 ---
    slime_gel: { name: "史莱姆凝胶", type: "material", description: "黏糊糊的一块东西，似乎是某种炼金材料。" },
    ragged_cloth: { name: "破旧的布料", type: "material", description: "可以用来制作简易的护甲。" },
    bat_wing: { name: "蝙蝠翅膀", type: "material", description: "轻盈而坚韧，是制作敏捷装备的好材料。" },
    orc_fang: { name: "兽人獠牙", type: "material", description: "兽人力量的象征，可以镶嵌在武器上。" },

    // --- 装备 ---
    small_axe: { 
        name: "小斧头", 
        type: "equipment", 
        slot: "mainHand", 
        stats: { attack: 2 }, 
        description: "一把简陋的斧头，聊胜于无。" 
    },
    leather_armor: {
        name: "皮甲",
        type: "equipment",
        slot: "body",
        stats: { defense: 5 },
        description: "由粗糙的皮革制成，能提供基本的防护。"
    },
};
