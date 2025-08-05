// js/combatFormulas.js
import { clamp } from './utils.js';

export function calculateAttackResult(attacker, defender, isPhysical = true) {
    const result = {
        isHit: false, isCrit: false, isBlock: false,
        damage: 0, log: [],
        calculation: {}
    };

    const hitRoll = Math.random();
    const rawHitRate = attacker.finalHitRate - defender.finalDodgeRate;
    const actualHitRate = clamp(rawHitRate, 0.60, 0.98);
    result.calculation.hit = `命中判定: (${attacker.finalHitRate.toFixed(2)} - ${defender.finalDodgeRate.toFixed(2)}) = ${rawHitRate.toFixed(2)}  clamped to ${actualHitRate.toFixed(2)}. 投骰: ${hitRoll.toFixed(2)}.`;
    if (hitRoll > actualHitRate) {
        result.log.push(`${attacker.nickname} 的攻击被 ${defender.nickname} 闪避了！`);
        result.calculation.hit += " -> MISS";
        return result;
    }
    result.isHit = true;
    result.calculation.hit += " -> HIT";

    const critRoll = Math.random();
    const rawCritRate = attacker.finalCritRate - defender.finalResilienceRate;
    const actualCritRate = clamp(rawCritRate, 0.01, 0.80);
    result.calculation.crit = `暴击判定: (${attacker.finalCritRate.toFixed(2)} - ${defender.finalResilienceRate.toFixed(2)}) = ${rawCritRate.toFixed(2)} clamped to ${actualCritRate.toFixed(2)}. 投骰: ${critRoll.toFixed(2)}.`;
    if (critRoll < actualCritRate) {
        result.isCrit = true;
        result.calculation.crit += " -> CRIT";
    } else {
        result.calculation.crit += " -> NO CRIT";
    }

    const blockRoll = Math.random();
    const actualBlockRate = clamp(defender.finalBlockRate, 0.01, 0.75);
    result.calculation.block = `格挡判定: 目标格挡率 ${actualBlockRate.toFixed(2)}. 投骰: ${blockRoll.toFixed(2)}.`;
    if (blockRoll < actualBlockRate) {
        result.isBlock = true;
        result.calculation.block += " -> BLOCK";
    } else {
        result.calculation.block += " -> NO BLOCK";
    }

    let baseDamage = isPhysical ? attacker.finalAttack : attacker.finalMagic;
    const penetration = attacker.finalPenetrationRate || 0;
    const damageReduction = isPhysical ? defender.physicalDamageReduction : defender.magicDamageReduction;
    const actualReduction = clamp(damageReduction * (1 - penetration), 0.30, 0.95);
    let finalDamage = baseDamage * (1 - actualReduction);
    result.calculation.reduction = `减伤计算: 基础伤害 ${baseDamage} * (1 - ${actualReduction.toFixed(2)}) = ${finalDamage.toFixed(2)}`;

    if (result.isCrit) {
        const actualCritDamage = clamp(attacker.finalCritDamage - defender.finalCritResist, 1.20, 2.00);
        finalDamage *= actualCritDamage;
        result.calculation.critDamage = `暴伤计算: * ${actualCritDamage.toFixed(2)} = ${finalDamage.toFixed(2)}`;
        result.log.push(`💥 暴击!`);
    }
    if (result.isBlock) {
        const actualBlockEffect = clamp(defender.finalBlockEffect, 0.20, 0.75);
        finalDamage *= (1 - actualBlockEffect);
        result.calculation.blockEffect = `格挡效果: * (1 - ${actualBlockEffect.toFixed(2)}) = ${finalDamage.toFixed(2)}`;
        result.log.push(`🛡️ 格挡!`);
    }

    const stability = clamp(attacker.finalDamageStability, 0.65, 0.92);
    const randomMultiplier = Math.random() * (1 - stability) + stability;
    finalDamage *= randomMultiplier;
    result.calculation.stability = `伤害稳定: * ${randomMultiplier.toFixed(2)} (范围: ${stability.toFixed(2)}-1.00) = ${finalDamage.toFixed(2)}`;

    finalDamage = Math.floor(finalDamage);
    const lowerLimit = Math.floor(baseDamage * 0.05 * randomMultiplier);
    result.damage = Math.max(finalDamage, lowerLimit);
    result.calculation.final = `最终裁定: floor(${finalDamage.toFixed(2)}) = ${finalDamage}. 下限: ${lowerLimit}. 取最大值 -> ${result.damage}`;

    result.log.unshift(`${attacker.nickname} 对 ${defender.nickname} 造成了 ${result.damage} 点伤害。`);
    return result;
}
