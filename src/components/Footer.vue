<template>
  <footer id="footer" :class="store.footerBlur ? 'blur' : null">
    <div class="power">
      <span>
        <span :class="startYear < fullYear ? 'c-hidden' : 'hidden'">Copyright</span>
        &copy;
        <span v-if="startYear < fullYear" class="site-start"> 
          {{ startYear }}
          -
        </span>
        {{ fullYear }}
        <a :href="siteUrl">{{ siteAuthor }}</a>
      </span>
      <!-- 站点ICP备案 -->
      <span v-if="siteIcp">
        <span class="divider">&nbsp;|&nbsp;</span>
        <a href="https://beian.miit.gov.cn" target="_blank">
          {{ siteIcp }}
        </a>
      </span>
      <!-- 站点公安备案 -->
      <span v-if="siteGongan">
        <span class="divider">&nbsp;|&nbsp;</span>
        <a :href="'https://beian.mps.gov.cn/#/query/webSearch?code='+siteGongan" target="_blank">
          {{ siteGongan }}
        </a>
      </span>
    </div>
  </footer>
</template>

<script setup>
import { mainStore } from "@/store";
import config from "@/../package.json";

const store = mainStore();
const fullYear = new Date().getFullYear();

// 加载配置数据
// const siteStartDate = ref(import.meta.env.VITE_SITE_START);
const startYear = ref(
  import.meta.env.VITE_SITE_START?.length >= 4 ?
    import.meta.env.VITE_SITE_START.substring(0, 4) : null
);
const siteIcp = ref(import.meta.env.VITE_SITE_ICP);
const siteGongan = ref(import.meta.env.VITE_SITE_GONGAN);
const siteAuthor = ref(import.meta.env.VITE_SITE_AUTHOR);
const siteUrl = computed(() => {
  const url = import.meta.env.VITE_SITE_URL;
  if (!url) return "https://www.imsyy.top";
  // 判断协议前缀
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "//" + url;
  }
  return url;
});
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 46px;
  line-height: 46px;
  text-align: center;
  z-index: 0;
  font-size: 14px;
  // 文字不换行
  word-break: keep-all;
  white-space: nowrap;
  overflow-x: auto; // 添加横向滚动以防止内容溢出

  .power {
    animation: fade 0.3s;
  }

  .lrc {
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .lrc-all {
      width: 98%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .lrc-text {
        margin: 0 8px;
      }

      .i-icon {
        width: 18px;
        height: 18px;
        display: inherit;
      }
    }
  }

  &.blur {
    backdrop-filter: blur(10px);
    background: rgb(0 0 0 / 25%);
    font-size: 16px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease-in-out;
  }

  @media (max-width: 720px) {
    font-size: 0.9rem;
    position: fixed; // 在移动端使用fixed定位
    bottom: 10px; // 提高底部位置
    left: 0;
    width: 100%;
    height: auto; // 自适应高度
    line-height: 1.5; // 减小行高

    &.blur {
      font-size: 0.9rem;
    }

    .power {
      padding: 10px; // 添加内边距
      min-width: 100%;
      display: flex;
      flex-direction: column; // 垂直排版
      align-items: center;
      justify-content: center;
      
      span {
        display: block;
        margin: 2px 0;
        
        .divider {
          display: none; // 在垂直排版中隐藏分隔符
        }
      }
    }
  }

  @media (max-width: 560px) {
    .c-hidden {
      display: none;
    }
    
    .power {
      font-size: 0.85rem; // 稍微减小字体大小
    }
  }

  @media (max-width: 480px) {
    .hidden {
      display: none;
    }
    
    bottom: 5px; // 在更小的屏幕上进一步提高位置
    
    .power {
      font-size: 0.8rem; // 进一步减小字体大小
      padding: 5px; // 减小内边距
      
      span {
        margin: 1px 0; // 减小垂直间距
      }
    }
  }
}
</style>
