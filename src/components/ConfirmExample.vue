<template>
  <div class="confirm-example">
    <button class="example-btn" @click="showConfirmDialog">显示确认框</button>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';

// 获取全局属性
const { proxy } = getCurrentInstance();

// 显示确认框
const showConfirmDialog = () => {
  proxy.$confirm({
    title: '操作确认',
    message: '确定要执行此操作吗？这是一个示例确认框。',
    confirmText: '确定',
    cancelText: '取消'
  })
    .then(() => {
      // 用户点击确认按钮
      ElMessage({
        message: '您点击了确认按钮',
        type: 'success',
        grouping: true
      });
    })
    .catch((err) => {
      // 用户点击取消按钮或关闭对话框
      console.log(err.message);
      ElMessage({
        message: '操作已取消',
        grouping: true
      });
    });
};
</script>

<style lang="scss" scoped>
.confirm-example {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  .example-btn {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    background-color: rgba(57, 159, 255, 0.2);
    color: #efefef;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: rgba(57, 159, 255, 0.3);
    }
  }
}
</style>