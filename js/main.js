// js/main.js
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { auth } from './firebase.js';
import { state } from './state.js';
import * as Auth from './auth.js';
import * as UI from './ui.js';
import * as Game from './game.js';
import { runTest } from './testTool.js';

async function handleAppState() {
    const user = auth.currentUser;
    await Auth.getUserData(user);
    if (user) {
        if (state.player) {
            UI.updateUserIdUI(user);
            UI.showMainGameUI();
        } else {
            UI.populateClassOptions();
            UI.showUI(document.getElementById('character-creation-container'));
        }
    } else {
        UI.showUI(document.getElementById('auth-container'));
    }
}

function initializeEventListeners() {
    const app = document.getElementById('app');
    
    app.addEventListener('click', async (e) => {
        const target = e.target;
        const button = target.closest('button');
        const link = target.closest('a');

        if (button) {
            switch (button.id) {
                case 'logout-btn':
                    Auth.logoutUser().catch(console.error);
                    break;
                case 'delete-char-btn':
                    await Auth.deleteCharacter();
                    await handleAppState();
                    break;
                case 'open-test-tool-btn':
                    UI.showTestToolModal();
                    runTest();
                    break;
                case 'close-test-tool-btn':
                    UI.hideTestToolModal();
                    break;
                case 'rerun-test-btn':
                    runTest();
                    break;
            }
            if (button.classList.contains('action-btn')) {
                Game.startExploration(button.dataset.zoneId);
            }
        }

        if (link && link.id === 'toggle-form') {
            e.preventDefault();
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            const isLoginVisible = !loginForm.classList.contains('hidden');
            loginForm.classList.toggle('hidden');
            registerForm.classList.toggle('hidden');
            document.getElementById('form-title').textContent = isLoginVisible ? '注册' : '登录';
            link.textContent = isLoginVisible ? '已有账户？去登录' : '还没有账户？去注册';
        }
    });

    document.getElementById('login-form').addEventListener('submit', async (e) => { e.preventDefault(); await Auth.loginUser(e.target.elements['login-email'].value, e.target.elements['login-password'].value).catch(console.error); });
    document.getElementById('register-form').addEventListener('submit', async (e) => { e.preventDefault(); await Auth.registerUser(e.target.elements['register-email'].value, e.target.elements['register-password'].value, e.target.elements['register-username'].value).catch(console.error); });
    document.getElementById('character-creation-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nickname = e.target.elements['char-nickname'].value;
        const gender = e.target.elements['gender'].value;
        const classId = e.target.elements['selected-class-id'].value;
        if (!classId) { UI.showMessage('请选择一个职业！', 'error'); return; }
        await Auth.createCharacter(nickname, gender, classId);
        await handleAppState();
    });
}

onAuthStateChanged(auth, handleAppState);
initializeEventListeners();
