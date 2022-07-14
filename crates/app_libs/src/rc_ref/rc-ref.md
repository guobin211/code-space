# Rust 数据所有权

## 基本数据类型

1. 基本数据类型存储在栈上
2. 结构体存储在堆上，变量存储指针，指针存储在栈上
3. 变量离开作用域调用`Drop`清理

## 相关文档

### V8 内存管理

[v8.dev](https://v8.dev/blog/trash-talk)

[v8 内存分配](https://juejin.cn/post/6909239354418266119)

[v8 解释器](https://juejin.cn/post/7018468848886579214)
