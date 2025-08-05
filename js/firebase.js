// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// 你的 Firebase 项目配置
const firebaseConfig = {
    apiKey: "AIzaSyA_xFzVXxlyfDUPm7LIAO5WLPck4xNSwwU",
    authDomain: "mud-game-ec44e.firebaseapp.com",
    projectId: "mud-game-ec44e",
    storageBucket: "mud-game-ec44e.appspot.com",
    messagingSenderId: "972270763916",
    appId: "1:972270763916:web:a3aaae527fa254d3b320a9"
};

// 初始化并导出服务
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
