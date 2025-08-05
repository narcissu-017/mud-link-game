// js/state.js
/**
 * 全局状态管理
 * 这是我们游戏状态的唯一真实来源 (Single Source of Truth)。
 * 所有模块都将从这里导入和修改状态，确保数据同步。
 */
export let state = {
    /** @type {object|null} 当前玩家的角色数据 */
    player: null,
    /** @type {boolean} 是否在战斗中 */
    inCombat: false,
    /** @type {object|null} 当前的战斗实例 */
    combatInstance: null,
};
