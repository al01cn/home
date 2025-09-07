<template>
  <div class="confirm-dialog-overlay" v-if="visible" @click.self="cancel">
    <div class="confirm-dialog cards">
      <div class="dialog-header">
        <h2>{{ title }}</h2>
        <close-one
          class="close"
          theme="filled"
          size="24"
          fill="#ffffff60"
          @click="cancel"
        />
      </div>
      <div class="dialog-content">
        <p class="message">{{ message }}</p>
        <div class="dialog-actions">
          <button class="cancel-btn" @click="cancel">{{ cancelText }}</button>
          <button class="confirm-btn" @click="confirm">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CloseOne } from "@icon-park/vue-next";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '确认'
  },
  message: {
    type: String,
    default: '确定要执行此操作吗？'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  }
});

const emit = defineEmits(['update:visible', 'confirm', 'cancel']);

// 关闭确认框
const cancel = () => {
  emit('cancel');
  emit('update:visible', false);
};

// 确认操作
const confirm = () => {
  emit('confirm');
  emit('update:visible', false);
};
</script>

<style lang="scss" scoped>
.confirm-dialog-overlay {
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

.confirm-dialog {
  width: 400px;
  padding: 20px;
  animation: fade 0.5s;
  
  .dialog-header {
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
        transform: scale(1.1);
      }
    }
  }
  
  .dialog-content {
    .message {
      margin-bottom: 20px;
      font-size: 1rem;
      line-height: 1.5;
    }
    
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      
      button {
        padding: 10px 20px;
        border-radius: 8px;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .cancel-btn {
        background-color: rgba(255, 255, 255, 0.1);
        color: #efefef;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
      
      .confirm-btn {
        background-color: rgba(57, 159, 255, 0.2);
        color: #efefef;
        
        &:hover {
          background-color: rgba(57, 159, 255, 0.3);
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .confirm-dialog {
    width: 90%;
    max-width: 400px;
  }
}
</style>