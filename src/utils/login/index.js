import { ElMessage } from "element-plus";
import { mainStore } from "@/store";
import { Loading } from "@element-plus/icons-vue";


const message = ElMessage

const messageKey = "Login"

export async function login() {
    await githubCallback()
    await qqCallback()
}

/**
 * GitHub登录回调处理函数
 * 处理GitHub OAuth回调，获取用户信息并保存到store中
 */
async function githubCallback() {
    const store = mainStore();

    if (window.location.pathname === '/github_callback') {
        message.info({
            message: '登录中...',
            icon: Loading,
            key: messageKey
        });
        const code = new URLSearchParams(window.location.search).get('code');
        // 发送code到后端
        try {
            const res = await fetch('https://auth.al01.cn/github_callback?code=' + code, {
                method: 'GET',
            });

            if (!res.ok) {
                const error = await res.json();
                message.error({
                    message: '登录失败：' + (error.error),
                    key: messageKey
                });
                // 登录失败后重定向到首页
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
                return;
            }

            const data = await res.json();

            // 保存用户信息和token到store，实现数据持久化
            const token = store.login(data, data.sessionId);

            message.success({
                message: '登录成功：' + data.username,
                key: messageKey
            });

            // 登录成功后重定向到首页
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        } catch (error) {
            console.error('GitHub登录处理错误:', error);
            message.error({
                message: '登录处理出错，请稍后重试',
                key: messageKey
            });
            // 出错后重定向到首页
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
    }
}

/**
 * QQ登录回调处理函数
 * 处理QQ OAuth回调，获取用户信息并保存到store中
 */
async function qqCallback() {
    const store = mainStore();

    if (window.location.pathname === '/qq_callback') {
        message.info({
            message: '登录中...',
            icon: Loading,
            key: messageKey
        });
        const code = new URLSearchParams(window.location.search).get('code');
        // 发送code到后端
        try {
            const res = await fetch('https://auth.al01.cn/qq_callback?code=' + code, {
                method: 'GET',
            });

            if (!res.ok) {
                const error = await res.json();
                message.error({
                    message: '登录失败：' + (error.error),
                    key: messageKey
                });
                // 登录失败后重定向到首页
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
                return;
            }

            const data = await res.json();

            // 保存用户信息和token到store，实现数据持久化
            const token = store.login(data, data.sessionId);

            message.success({
                message: '登录成功：' + data.username,
                key: messageKey
            });

            // 登录成功后重定向到首页
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        } catch (error) {
            console.error('QQ登录处理错误:', error);
            message.error({
                message: '登录处理出错，请稍后重试',
                key: messageKey
            });
            // 出错后重定向到首页
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
    }
}

/**
 * 检查用户登录状态
 * 从localStorage中恢复用户登录状态
 */
export function checkLoginStatus() {
    const store = mainStore();
    // Pinia的persistedstate插件已经处理了数据持久化
    // 这里可以添加额外的登录状态检查逻辑
    if (store.isLoggedIn && store.token) {
        console.log('用户已登录:', store.userInfo?.username);
        return true;
    }
    return false;
}
