<template>
  <div class="login-form-overlay" v-if="visible" @click.self="close">
    <div class="login-form cards">
      <div class="form-header">
        <h2>用户登录</h2>
        <close-one class="close" theme="filled" size="24" fill="#ffffff60" @click="close" />
      </div>
      <div class="form-content">
        <div class="form-item">
          <label>用户名</label>
          <input type="text" v-model="username" placeholder="请输入用户名" />
        </div>
        <div class="form-item">
          <label>密码</label>
          <input type="password" v-model="password" placeholder="请输入密码" />
        </div>
        <div class="form-actions">
          <button class="login-btn" @click="login">登录</button>
          <div class="form-options">
            <span class="register">注册账号</span>
            <span class="forget">忘记密码</span>
          </div>
          <!-- 第三方登录 -->
          <div class="third-party-login">
            <div class="divider">
              <span>第三方账号登录</span>
            </div>
            <div class="login-icons">
              <div class="icon-item" @click="thirdPartyLogin('github')">
                <I icon="mdi:github" size="24" />
              </div>
              <div class="icon-item" @click="thirdPartyLogin('qq')">
                <I icon="mdi:qqchat" size="24" />
              </div>
              <div class="icon-item" @click="thirdPartyLogin('minecraft')">
                <I icon="mdi:minecraft" size="24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CloseOne, Github, TencentQq as QQ } from "@icon-park/vue-next";
import { ElMessage } from "element-plus";
import { mainStore } from "@/store";
import { Icon as I } from "@iconify/vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:visible', 'login']);

const store = mainStore();
const username = ref('');
const password = ref('');

// 关闭登录表单
const close = () => {
  emit('update:visible', false);
};

// 登录处理
const login = () => {
  if (!username.value) {
    ElMessage({
      message: "请输入用户名",
      grouping: true,
    });
    return;
  }
  if (!password.value) {
    ElMessage({
      message: "请输入密码",
      grouping: true,
    });
    return;
  }

  // 使用store的login方法模拟登录并保存token
  const userData = {
    username: username.value,
    loginTime: new Date().toLocaleString()
  };

  const token = store.login(userData);

  // 发送登录事件，传递用户信息和token
  emit('login', {
    userData,
    token
  });

  // 清空表单并关闭
  username.value = '';
  password.value = '';
  close();
};

// 第三方登录处理
const thirdPartyLogin = (platform) => {
  // 显示登录提示
  ElMessage({
    message: `正在使用${platform}账号登录`,
    grouping: true,
  });

  switch (platform) {
    case 'github':
      // 使用本地开发环境的回调地址
      const githubRedirectUri = encodeURIComponent('https://www.al01.cn/github_callback');
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=Ov23liC7vztIl7ZN5SzY&redirect_uri=${githubRedirectUri}&scope=user&state=${Date.now()}`;
      delayRedirect(githubAuthUrl);
      break;
    case 'qq':
      // QQ登录暂不实现
      const qqRedirectUri = encodeURIComponent('https://www.al01.cn/qq_callback');
      const qqAuthUrl = `https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=102810408&redirect_uri=${qqRedirectUri}&scope=all`;
      delayRedirect(qqAuthUrl);
      break;
    case 'minecraft':
      ElMessage({
        message: `minecraft登录暂未开放`,
        grouping: true,
        type: 'warning',
      });
      break;
    default:
      break;
  }

  // 关闭登录表单
  close();
};

// 延迟跳转链接
const delayRedirect = (url, delay = 1000) => {
  setTimeout(() => {
    location.href = url;
  }, delay);
};
</script>

<style lang="scss" scoped>
.login-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fade 0.3s;
}

.login-form {
  width: 400px;
  padding: 20px;
  animation: fade 0.5s;

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    .close {
      cursor: pointer;
      transition: transform 0.3s;

      &:hover {
        transform: rotate(90deg);
      }
    }
  }

  .form-content {
    .form-item {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 8px;
        font-size: 1rem;
      }

      input {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background-color: rgba(255, 255, 255, 0.05);
        color: #efefef;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s;

        &:focus {
          border-color: rgba(255, 255, 255, 0.3);
        }
      }
    }

    .form-actions {
      .login-btn {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        border: none;
        background-color: rgba(255, 255, 255, 0.1);
        color: #efefef;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }

      .form-options {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        font-size: 0.9rem;

        span {
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.3s;

          &:hover {
            opacity: 1;
          }
        }
      }

      .third-party-login {
        margin-top: 20px;

        .divider {
          display: flex;
          align-items: center;
          margin: 15px 0;

          &::before,
          &::after {
            content: "";
            flex: 1;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.1);
          }

          span {
            padding: 0 10px;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.6);
          }
        }

        .login-icons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 10px;

          .icon-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.05);
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              background-color: rgba(255, 255, 255, 0.15);
              transform: translateY(-2px);
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .login-form {
    width: 90%;
    max-width: 400px;
  }
}
</style>