// js/attributes.js
import { clamp } from './utils.js';

const DR_CONFIG = {
    phys_reduc: { tiers: [{t:200,r:0.0015},{t:500,r:0.001},{t:1000,r:0.0005},{t:2000,r:0.00025},{t:5000,r:0.0001}], max:0.95 },
    magic_reduc: { tiers: [{t:200,r:0.0015},{t:500,r:0.001},{t:1000,r:0.0005},{t:2000,r:0.00025},{t:5000,r:0.0001}], max:0.95 },
    hit_rate: { init:0.8, tiers: [{t:200,r:0.002},{t:500,r:0.0015},{t:1000,r:0.001},{t:2000,r:0.0005}], max:2.5 },
    dodge_rate: { init:0.05, tiers: [{t:200,r:0.0025},{t:500,r:0.0015},{t:1000,r:0.001},{t:2000,r:0.0005}], max:1.55 },
    crit_rate: { init:0.05, tiers: [{t:200,r:0.003},{t:500,r:0.002},{t:1000,r:0.0015},{t:2000,r:0.001},{t:5000,r:0.0005}], max:1.8 },
    crit_damage: { init:1.2, tiers: [{t:200,r:0.004},{t:500,r:0.002},{t:1000,r:0.001},{t:2000,r:0.0005},{t:5000,r:0.0002}], max:3.5 },
    resilience_rate: { tiers: [{t:200,r:0.0025},{t:500,r:0.0015},{t:1000,r:0.001},{t:2000,r:0.0005},{t:5000,r:0.0002}], max:1.5 },
    crit_resist: { tiers: [{t:200,r:0.003},{t:500,r:0.002},{t:1000,r:0.001},{t:2000,r:0.0005},{t:5000,r:0.00025}], max:1.8 },
    damage_stability: { init:0.65, tiers: [{t:200,r:0.0005},{t:500,r:0.0002},{t:1000,r:0.0001},{t:2000,r:0.00005},{t:5000,r:0.00002}], max:0.92 },
};

function calculateTieredValue(baseValue, config) {
    let finalValue = config.init || 0;
    let remaining = baseValue;
    let lastT = 0;
    for (const tier of config.tiers) {
        if (remaining <= 0) break;
        const pointsInTier = Math.min(remaining, tier.t - lastT);
        finalValue += pointsInTier * tier.r;
        remaining -= pointsInTier;
        lastT = tier.t;
    }
    if (remaining > 0) finalValue += remaining * config.tiers[config.tiers.length - 1].r;
    return config.max ? Math.min(finalValue, config.max) : finalValue;
}

export function calculateAllAttributes(character) {
    const base = character.stats;
    const derived = { nickname: character.nickname };

    const attackPerformance = 1.0;
    const defensePerformance = 1.0;
    const attackBonus = 0;

    derived.finalAttack = Math.floor(base.base_attack * attackPerformance * (1 + attackBonus));
    derived.finalMagic = Math.floor(base.base_magic * attackPerformance * (1 + attackBonus));
    derived.finalDivinity = Math.floor(base.base_divinity * attackPerformance * (1 + attackBonus));
    derived.finalSpeed = base.base_speed;

    const physReducBase = (base.base_defense * defensePerformance) + (0.05 * base.base_resistance);
    derived.physicalDamageReduction = calculateTieredValue(physReducBase, DR_CONFIG.phys_reduc);
    const magicReducBase = (base.base_magic_defense * defensePerformance) + (0.05 * base.base_resistance);
    derived.magicDamageReduction = calculateTieredValue(magicReducBase, DR_CONFIG.magic_reduc);
    derived.finalHitRate = calculateTieredValue(base.base_hit, DR_CONFIG.hit_rate);
    derived.finalDodgeRate = calculateTieredValue(base.base_dodge, DR_CONFIG.dodge_rate);
    derived.finalCritRate = calculateTieredValue(base.base_crit, DR_CONFIG.crit_rate);
    derived.finalCritDamage = calculateTieredValue(base.base_crit, DR_CONFIG.crit_damage);
    const resilienceBase = base.base_resilience + (0.1 * base.base_resistance);
    derived.finalResilienceRate = calculateTieredValue(resilienceBase, DR_CONFIG.resilience_rate);
    derived.finalCritResist = calculateTieredValue(resilienceBase, DR_CONFIG.crit_resist);
    const stabilityBase = base.base_hit + (0.2 * base.base_mastery);
    derived.finalDamageStability = calculateTieredValue(stabilityBase, DR_CONFIG.damage_stability);
    
    derived.finalBlockRate = 0.1;
    derived.finalBlockEffect = 0.3;
    derived.finalPenetrationRate = 0;

    return derived;
}
