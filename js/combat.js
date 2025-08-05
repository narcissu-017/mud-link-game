// js/combat.js
import { state } from './state.js';
import * as UI from './ui.js';
import { MONSTERS, ZONES, CLASSES } from '../config/index.js';
import { calculateAllAttributes } from './attributes.js';
import { calculateAttackResult } from './combatFormulas.js';

const COMBAT_TICK_RATE = 100;
const ACTION_BAR_MAX = 100;
let combatInterval = null;

function stopCombatLoop() {
    clearInterval(combatInterval);
    combatInterval = null;
    state.inCombat = false;
}

function endCombat(playerWon) {
    stopCombatLoop();
    const { monster } = state.combatInstance;
    if (playerWon) {
        const expGained = monster.base.exp;
        state.player.experience += expGained;
        UI.addCombatLog(`你胜利了！获得了 ${expGained} 点经验。`, 'victory');
        // TODO: Handle level up
    } else {
        UI.addCombatLog('你被击败了...', 'defeat');
        // TODO: Handle defeat logic (e.g., respawn)
    }
    setTimeout(() => {
        state.combatInstance = null;
        UI.showMainGameUI();
    }, 5000);
}

function runCombatTick() {
    const combat = state.combatInstance;
    if (!combat) { stopCombatLoop(); return; }

    const { player, monster } = combat;
    player.actionBar += player.calculated.finalSpeed || 5; // Use calculated speed, fallback to 5
    monster.actionBar += monster.calculated.finalSpeed || 5;

    let attacker = null;
    let defender = null;

    if (player.actionBar >= ACTION_BAR_MAX) {
        player.actionBar -= ACTION_BAR_MAX;
        attacker = player;
        defender = monster;
    } else if (monster.actionBar >= ACTION_BAR_MAX) {
        monster.actionBar -= ACTION_BAR_MAX;
        attacker = monster;
        defender = player;
    }

    if (attacker) {
        const attackResult = calculateAttackResult(attacker.calculated, defender.calculated, true);
        defender.currentHp -= attackResult.damage;
        attackResult.log.forEach(log => UI.addCombatLog(log, attacker === player ? 'player-attack' : 'monster-attack'));
    }

    UI.updateCombatUI();

    if (monster.currentHp <= 0) {
        monster.currentHp = 0;
        UI.updateCombatUI();
        endCombat(true);
    } else if (player.currentHp <= 0) {
        player.currentHp = 0;
        UI.updateCombatUI();
        endCombat(false);
    }
}

export function startCombat(zoneId) {
    if (state.inCombat) return;
    state.inCombat = true;
    
    const zoneMonsters = ZONES[zoneId].monsters;
    const monsterId = zoneMonsters[Math.floor(Math.random() * zoneMonsters.length)];
    const monsterBase = JSON.parse(JSON.stringify(MONSTERS[monsterId]));

    // Create combatants with base stats and calculated stats
    const playerCombatant = {
        ...JSON.parse(JSON.stringify(state.player)),
        calculated: calculateAllAttributes(state.player),
        actionBar: 0,
    };
    const monsterCombatant = {
        base: monsterBase,
        stats: monsterBase.stats, // Alias for attribute calculator
        nickname: monsterBase.name,
        currentHp: monsterBase.stats.hp,
        calculated: calculateAllAttributes({stats: monsterBase.stats, nickname: monsterBase.name}),
        actionBar: 0,
    };
    
    state.combatInstance = {
        player: playerCombatant,
        monster: monsterCombatant,
    };

    UI.showCombatUI();
    UI.addCombatLog(`战斗开始！${playerCombatant.nickname} vs ${monsterCombatant.nickname}`, 'system');
    combatInterval = setInterval(runCombatTick, COMBAT_TICK_RATE);
}
