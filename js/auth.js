// js/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { auth, db } from './firebase.js';
import { showMessage, showConfirmation } from './ui.js';
import { CLASSES } from '../config/index.js';
import { state } from './state.js';

export async function registerUser(email, password, accountName) { /* ...内容无变化... */ }
export async function loginUser(email, password) { /* ...内容无变化... */ }
export async function logoutUser() { /* ...内容无变化... */ }

export async function createCharacter(nickname, gender, classId) {
    const user = auth.currentUser;
    if (!user) { showMessage('错误：用户未登录！', 'error'); return; }
    const tag = `#${Math.floor(1000 + Math.random() * 9000)}`;
    const initialClassData = CLASSES[classId];
    const newCharacterData = {
        nickname, tag, gender, classId, level: 1, experience: 0,
        stats: { ...initialClassData.stats },
        currentHp: initialClassData.stats.hp,
        currentMp: initialClassData.stats.mp,
        equipment: { head: null, body: null, legs: null, arms: null, gloves: null, back: null, shoes: null, mainHand: null, offHand: null },
        inventory: [],
    };
    try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { character: newCharacterData });
        state.player = newCharacterData; // 更新全局状态
        showMessage('角色创建成功！冒险开始！', 'success');
    } catch (error) { showMessage(`创建失败: ${error.code}`, 'error'); throw error; }
}

export async function deleteCharacter() {
    const user = auth.currentUser;
    if (!user) return;
    const confirmed = await showConfirmation("你确定要删除当前角色吗？此操作不可逆！");
    if (!confirmed) return;
    try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { character: null });
        state.player = null; // 更新全局状态
        showMessage('角色已删除。', 'info');
    } catch (error) { showMessage(`删除失败: ${error.code}`, 'error'); throw error; }
}

export async function getUserData(user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        state.player = data.character || null; // 更新全局状态
        return data;
    }
    state.player = null; // 更新全局状态
    return null;
}
