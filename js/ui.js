// js/ui.js
import { state } from './state.js';
import { CLASSES, ZONES, ATTRIBUTE_TRANSLATIONS, PERCENTAGE_ATTRIBUTES } from '../config/index.js';

const elements = {
    loadingContainer: document.getElementById('loading-container'),
    mainTitle: document.getElementById('main-title'),
    logoPlaceholder: document.getElementById('logo-placeholder'),
    authContainer: document.getElementById('auth-container'),
    characterCreationContainer: document.getElementById('character-creation-container'),
    gameContainer: document.getElementById('game-container'),
    combatContainer: document.getElementById('combat-container'),
    testToolModal: document.getElementById('test-tool-modal'),
    charClassContainer: document.getElementById('char-class-container'),
    classPreviewContainer: document.getElementById('class-preview-container'),
    classPortraitPreview: document.getElementById('class-portrait-preview'),
    classStatsPreview: document.getElementById('class-stats-preview'),
    classSkillsPreview: document.getElementById('class-skills-preview'),
    selectedClassInput: document.getElementById('selected-class-id'),
    playerNameDisplay: document.getElementById('player-name'),
    userIdDisplay: document.getElementById('user-id-display'),
    playerStatsDisplay: document.getElementById('player-stats'),
    actionsContainer: document.getElementById('actions'),
    combatPlayerName: document.getElementById('combat-player-name'),
    combatMonsterName: document.getElementById('combat-monster-name'),
    combatPlayerPortrait: document.getElementById('combat-player-portrait'),
    combatMonsterPortrait: document.getElementById('combat-monster-portrait'),
    combatPlayerHp: document.getElementById('combat-player-hp'),
    combatMonsterHp: document.getElementById('combat-monster-hp'),
    combatPlayerHpBar: document.getElementById('combat-player-hp-bar'),
    combatMonsterHpBar: document.getElementById('combat-monster-hp-bar'),
    combatLog: document.getElementById('combat-log'),
    messageBox: document.getElementById('message-box'),
    messageText: document.getElementById('message-text'),
    confirmationModal: document.getElementById('confirmation-modal'),
    confirmText: document.getElementById('confirm-text'),
    confirmBtn: document.getElementById('confirm-btn'),
    cancelBtn: document.getElementById('cancel-btn'),
};

export function showUI(uiToShow) {
    const allContainers = [elements.authContainer, elements.characterCreationContainer, elements.gameContainer, elements.combatContainer];
    elements.loadingContainer.classList.add('hidden');
    elements.mainTitle.classList.remove('hidden');
    elements.logoPlaceholder.classList.remove('hidden');
    allContainers.forEach(c => { if (c) c.classList.add('hidden'); });
    if (uiToShow) { uiToShow.classList.remove('hidden'); uiToShow.classList.add('fade-in-scale'); }
}
export function showMainGameUI() { updatePlayerStatsUI(); updateActionsUI(); showUI(elements.gameContainer); }
export function showMessage(text, type = 'info') {
    elements.messageText.textContent = text;
    elements.messageBox.className = 'fixed top-5 text-white py-2 px-4 rounded-lg shadow-lg z-50';
    switch(type) {
        case 'success': elements.messageBox.classList.add('bg-green-500'); break;
        case 'error': elements.messageBox.classList.add('bg-red-500'); break;
        default: elements.messageBox.classList.add('bg-blue-500');
    }
    elements.messageBox.classList.remove('hidden');
    elements.messageBox.classList.add('fade-in-scale');
    setTimeout(() => { elements.messageBox.classList.add('hidden'); }, 3000);
}
export function showConfirmation(text) {
    return new Promise((resolve) => {
        elements.confirmText.textContent = text;
        const handleConfirm = () => { cleanup(); resolve(true); };
        const handleCancel = () => { cleanup(); resolve(false); };
        const cleanup = () => {
            elements.confirmationModal.classList.add('hidden');
            elements.confirmBtn.removeEventListener('click', handleConfirm);
            elements.cancelBtn.removeEventListener('click', handleCancel);
        };
        elements.confirmBtn.addEventListener('click', handleConfirm);
        elements.cancelBtn.addEventListener('click', handleCancel);
        elements.confirmationModal.classList.remove('hidden');
        elements.confirmationModal.classList.add('fade-in-scale');
    });
}
function updateClassPreview(classId) {
    if (!classId) { elements.classPreviewContainer.classList.add('hidden'); return; }
    const classData = CLASSES[classId];
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const portraitPath = gender === '男' ? classData.portrait.male : classData.portrait.female;
    elements.classPortraitPreview.innerHTML = `<div data-theme="${classData.themeColor}" class="portrait-border aspect-square w-48 h-48 bg-gray-900 rounded-full flex items-center justify-center text-gray-500 italic overflow-hidden border-4"><div class="w-full h-full flex items-center justify-center">立绘: ${portraitPath}</div></div>`;
    let statsHtml = `<h4 class="font-bold text-white mb-2">${classData.name} - 初始属性</h4>`;
    for (const stat in classData.stats) { statsHtml += `<p class="text-sm text-gray-300 capitalize">${stat}: ${classData.stats[stat]}</p>`; }
    elements.classStatsPreview.innerHTML = statsHtml;
    let skillsHtml = `<h4 class="font-bold text-white mb-2 mt-4">初始技能</h4>`;
    classData.skills.forEach(skill => { skillsHtml += `<div class="mb-2"><p class="font-semibold text-yellow-400 text-sm">${skill.name}</p><p class="text-xs text-gray-400">${skill.description}</p></div>`; });
    elements.classSkillsPreview.innerHTML = skillsHtml;
    elements.classPreviewContainer.classList.remove('hidden');
    elements.classPreviewContainer.classList.add('fade-in-scale');
}
export function populateClassOptions() {
    const container = elements.charClassContainer;
    container.innerHTML = '';
    elements.selectedClassInput.value = '';
    updateClassPreview(null);
    const groupedClasses = {};
    for (const classId in CLASSES) {
        const classData = CLASSES[classId];
        if (!groupedClasses[classData.type]) groupedClasses[classData.type] = [];
        groupedClasses[classData.type].push({ id: classId, ...classData });
    }
    const typesInOrder = ['combat', 'production'];
    typesInOrder.forEach(type => {
        if (groupedClasses[type]) {
            const title = document.createElement('h3');
            title.className = 'text-lg font-semibold text-yellow-400 mt-4 mb-2 col-span-full';
            title.textContent = type === 'combat' ? '战斗职业' : '生产职业';
            container.appendChild(title);
            groupedClasses[type].forEach(classData => {
                const card = document.createElement('div');
                card.className = 'class-card';
                card.dataset.classId = classData.id;
                card.dataset.theme = classData.themeColor;
                card.innerHTML = `<h4 class="font-bold text-white">${classData.name}</h4><p class="text-sm text-gray-400">${classData.description}</p>`;
                card.addEventListener('click', () => {
                    document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    elements.selectedClassInput.value = classData.id;
                    updateClassPreview(classData.id);
                });
                container.appendChild(card);
            });
        }
    });
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const selectedClassId = elements.selectedClassInput.value;
            if (selectedClassId) updateClassPreview(selectedClassId);
        });
    });
}
export function updatePlayerStatsUI() {
    if (!state.player) { elements.playerStatsDisplay.innerHTML = ''; return; }
    const { nickname, tag, classId, level, experience, stats, currentHp, currentMp } = state.player;
    elements.playerNameDisplay.innerHTML = `${nickname}<span class="text-gray-500 italic text-sm ml-1">${tag}</span>`;
    elements.playerStatsDisplay.innerHTML = `<p>职业: ${CLASSES[classId].name}</p><p>等级: ${level}</p><p>经验: ${experience}/${level * 100}</p><p>生命: <span class="text-green-400">${currentHp}</span>/${stats.hp}</p><p>法力: <span class="text-blue-400">${currentMp}</span>/${stats.mp}</p><p>攻击: ${stats.attack}</p><p>防御: ${stats.defense}</p><p>速度: ${stats.speed}</p>`;
}
export function updateActionsUI() {
    elements.actionsContainer.innerHTML = '';
    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'delete-char-btn';
    deleteBtn.className = 'w-full text-left bg-red-800 hover:bg-red-700 p-2 rounded-md text-sm text-red-200 transition-colors';
    deleteBtn.textContent = '删除角色 (测试用)';
    elements.actionsContainer.appendChild(deleteBtn);
    elements.actionsContainer.appendChild(document.createElement('hr')).className = 'my-2 border-gray-600';
    for (const zoneId in ZONES) {
        const zone = ZONES[zoneId];
        const button = document.createElement('button');
        button.className = 'w-full text-left bg-gray-700 hover:bg-gray-600 p-2 rounded-md text-sm action-btn transition-colors';
        button.textContent = `探索: ${zone.name} (Lv.${zone.levelRange})`;
        button.dataset.zoneId = zoneId;
        elements.actionsContainer.appendChild(button);
    }
}
export function updateUserIdUI(user) { elements.userIdDisplay.textContent = user ? user.uid.substring(0, 8) + '...' : ''; }
export function addCombatLog(text, type = 'system') {
    const logEntry = document.createElement('p');
    logEntry.textContent = text;
    switch (type) {
        case 'player-attack': logEntry.className = 'text-cyan-400'; break;
        case 'monster-attack': logEntry.className = 'text-red-400'; break;
        case 'victory': logEntry.className = 'text-green-400 font-bold'; break;
        case 'defeat': logEntry.className = 'text-gray-400 font-bold'; break;
        default: logEntry.className = 'text-yellow-400';
    }
    elements.combatLog.appendChild(logEntry);
    elements.combatLog.scrollTop = elements.combatLog.scrollHeight;
}
export function updateCombatUI() {
    const combat = state.combatInstance;
    if (!combat) return;
    const { player, monster } = combat;
    elements.combatPlayerHp.textContent = `HP: ${player.currentHp} / ${player.stats.hp}`;
    elements.combatMonsterHp.textContent = `HP: ${monster.currentHp} / ${monster.stats.hp}`;
    const playerHpPercent = (player.currentHp / player.stats.hp) * 100;
    elements.combatPlayerHpBar.style.width = `${playerHpPercent}%`;
    const monsterHpPercent = (monster.currentHp / monster.stats.hp) * 100;
    elements.combatMonsterHpBar.style.width = `${monsterHpPercent}%`;
    [elements.combatPlayerHpBar, elements.combatMonsterHpBar].forEach((bar, index) => {
        const percent = index === 0 ? playerHpPercent : monsterHpPercent;
        bar.classList.remove('low', 'critical');
        if (percent < 50) bar.classList.add('low');
        if (percent < 25) bar.classList.add('critical');
    });
}
export function showCombatUI() {
    const combat = state.combatInstance;
    if (!combat) return;
    const { player, monster } = combat;
    elements.combatPlayerName.textContent = player.nickname;
    elements.combatMonsterName.textContent = monster.name;
    elements.combatLog.innerHTML = '';
    const playerClass = CLASSES[player.classId];
    elements.combatPlayerPortrait.className = `w-32 h-32 bg-gray-700 rounded-full mx-auto border-4 portrait-border`;
    elements.combatPlayerPortrait.dataset.theme = playerClass.themeColor;
    updateCombatUI();
    showUI(elements.combatContainer);
}
export function showTestToolModal() { elements.testToolModal.classList.remove('hidden'); }
export function hideTestToolModal() { elements.testToolModal.classList.add('hidden'); }
export function displayTestResults(attacker, defender, result) {
    const formatStats = (statsObj, isBase = false) => {
        let html = '';
        const source = isBase ? { ...statsObj.stats, attackBonus: statsObj.attackBonus, damageIncrease: statsObj.damageIncrease } : statsObj;
        for (const key in source) {
            if (key === 'nickname') continue;
            const translatedKey = ATTRIBUTE_TRANSLATIONS[key] || key;
            let value = source[key];
            if (PERCENTAGE_ATTRIBUTES.includes(key)) {
                value = `${(value * 100).toFixed(2)}%`;
            } else if (typeof value === 'number') {
                value = value.toFixed(0);
            }
            html += `<div><span class="font-semibold text-gray-400">${translatedKey}:</span> <span class="text-white">${value}</span></div>`;
        }
        return html;
    };
    document.getElementById('attacker-base-stats').innerHTML = formatStats(attacker.base, true);
    document.getElementById('attacker-calc-stats').innerHTML = formatStats(attacker.calculated);
    document.getElementById('defender-base-stats').innerHTML = formatStats(defender.base, true);
    document.getElementById('defender-calc-stats').innerHTML = formatStats(defender.calculated);
    const processEl = document.getElementById('calculation-process');
    processEl.innerHTML = result.log.map(log => `<div class="p-1 bg-gray-900/50 rounded text-gray-400 text-xs italic">${log}</div>`).join('');
    processEl.innerHTML += Object.values(result.calculation).map(step => `<div class="p-2 bg-gray-700 rounded mb-1 text-gray-300">${step}</div>`).join('');
    processEl.innerHTML += `<div class="p-2 bg-yellow-800 rounded mt-2 font-bold text-lg text-white">最终伤害: ${result.damage}</div>`;
}
