// js/testTool.js
import { CLASSES } from '../config/index.js';
import { calculateAllAttributes } from './attributes.js';
import { calculateAttackResult } from './combatFormulas.js';
import * as UI from './ui.js';

function generateRandomCharacter() {
    const classIds = Object.keys(CLASSES);
    const randomClassId = classIds[Math.floor(Math.random() * classIds.length)];
    
    const randomStats = {
        base_attack: 50 + Math.floor(Math.random() * 250),
        base_magic: 50 + Math.floor(Math.random() * 250),
        base_defense: 50 + Math.floor(Math.random() * 250),
        base_magic_defense: 50 + Math.floor(Math.random() * 250),
        base_hit: 50 + Math.floor(Math.random() * 250),
        base_dodge: 50 + Math.floor(Math.random() * 250),
        base_crit: 50 + Math.floor(Math.random() * 250),
        base_resilience: 50 + Math.floor(Math.random() * 250),
        base_mastery: 50 + Math.floor(Math.random() * 250),
        base_resistance: 50 + Math.floor(Math.random() * 250),
        base_divinity: 50 + Math.floor(Math.random() * 250),
        base_speed: 5 + Math.floor(Math.random() * 15),
    };

    // Add random buffs/debuffs
    const attackBonus = Math.random() < 0.3 ? Math.random() * 0.5 : 0; // 30% chance for up to 50% bonus
    const damageIncrease = Math.random() < 0.2 ? Math.random() * 0.3 : 0; // 20% chance for up to 30% bonus

    return {
        nickname: `${CLASSES[randomClassId].name} Lv.50`,
        classId: randomClassId,
        stats: randomStats,
        // These will be used by the attribute calculator
        attackBonus: attackBonus,
        damageIncrease: damageIncrease,
    };
}

export function runTest() {
    const attackerBase = generateRandomCharacter();
    const defenderBase = generateRandomCharacter();

    const attackerCalculated = calculateAllAttributes(attackerBase);
    const defenderCalculated = calculateAllAttributes(defenderBase);

    const result = calculateAttackResult(attackerCalculated, defenderCalculated, true);

    UI.displayTestResults(
        { base: attackerBase, calculated: attackerCalculated },
        { base: defenderBase, calculated: defenderCalculated },
        result
    );
}
