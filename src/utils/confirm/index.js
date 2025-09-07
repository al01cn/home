import { createApp, h } from 'vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

/**
 * 显示确认对话框
 * @param {Object} options - 配置选项
 * @param {string} options.title - 对话框标题
 * @param {string} options.message - 对话框消息内容
 * @param {string} options.confirmText - 确认按钮文本
 * @param {string} options.cancelText - 取消按钮文本
 * @returns {Promise} 返回一个Promise，确认时resolve，取消时reject
 */
const showConfirm = (options = {}) => {
  return new Promise((resolve, reject) => {
    // 创建一个挂载点
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    // 清理函数
    const unmount = () => {
      app.unmount();
      document.body.removeChild(mountNode);
    };

    // 创建应用实例
    const app = createApp({
      render() {
        return h(ConfirmDialog, {
          visible: true,
          title: options.title || '确认',
          message: options.message || '确定要执行此操作吗？',
          confirmText: options.confirmText || '确定',
          cancelText: options.cancelText || '取消',
          'onUpdate:visible': (val) => {
            if (!val) unmount();
          },
          onConfirm: () => {
            resolve();
            unmount();
          },
          onCancel: () => {
            reject(new Error('用户取消操作'));
            unmount();
          }
        });
      }
    });

    // 挂载应用
    app.mount(mountNode);
  });
};

export default showConfirm;