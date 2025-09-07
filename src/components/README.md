# 确认框组件使用说明

## 组件介绍

`ConfirmDialog` 是一个与网站风格匹配的弹窗确认框组件，可以通过 JavaScript 代码直接调用，无需额外引入组件。

## 使用方法

### 方法一：通过全局方法调用

在任何组件中，您可以通过全局方法 `$confirm` 来调用确认框：

```javascript
// 在 Vue 组件中使用
import { getCurrentInstance } from 'vue';

// 获取全局属性
const { proxy } = getCurrentInstance();

// 显示确认框
proxy.$confirm({
  title: '操作确认',                  // 确认框标题
  message: '确定要执行此操作吗？',     // 确认框内容
  confirmText: '确定',               // 确认按钮文本
  cancelText: '取消'                 // 取消按钮文本
})
  .then(() => {
    // 用户点击确认按钮后的操作
    console.log('用户确认了操作');
  })
  .catch((err) => {
    // 用户点击取消按钮或关闭对话框后的操作
    console.log('用户取消了操作');
  });
```

### 方法二：直接导入工具函数

您也可以直接导入 `showConfirm` 函数来使用：

```javascript
import showConfirm from '@/utils/confirm.js';

showConfirm({
  title: '操作确认',
  message: '确定要执行此操作吗？',
  confirmText: '确定',
  cancelText: '取消'
})
  .then(() => {
    // 用户点击确认按钮后的操作
  })
  .catch((err) => {
    // 用户点击取消按钮或关闭对话框后的操作
  });
```

## 参数说明

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | String | '确认' | 确认框标题 |
| message | String | '确定要执行此操作吗？' | 确认框内容 |
| confirmText | String | '确定' | 确认按钮文本 |
| cancelText | String | '取消' | 取消按钮文本 |

## 返回值

`$confirm` 方法返回一个 Promise 对象：

- 当用户点击确认按钮时，Promise 将被 resolve
- 当用户点击取消按钮或关闭对话框时，Promise 将被 reject，并返回一个错误对象，错误信息为 '用户取消操作'