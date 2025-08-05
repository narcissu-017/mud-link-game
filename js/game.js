// js/game.js
import { startCombat } from './combat.js';
import { showMessage } from './ui.js';
import { ZONES } from '../config/index.js';

/**
 * 开始探索一个区域
 * @param {string} zoneId 
 */
export function startExploration(zoneId) {
    const zone = ZONES[zoneId];
    showMessage(`你进入了 ${zone.name}，开始探索...`, 'info');
    
    // 模拟探索后遭遇怪物
    setTimeout(() => {
        showMessage(`你遭遇了 ${MONSTERS[zone.monsters[0]].name}!`, 'error');
        // 调用战斗模块开始战斗
        startCombat(zoneId);
    }, 1500);
}
