# Learn Rust 2022

- [rust](https://www.rust-lang.org/zh-CN/learn/get-started)
- [crates](https://crates.io/)
- [wiki](https://rustwiki.org/)

## 基础入门

### 1.基本概念

1. 语言基础
2. 面向对象
3. 函数
4. 所有权
5. 生命周期

### 2.语言基础

1. 通用编程概念
2. 基本数据结构
3. 所有权与生命周期
4. 模式匹配与错误处理
5. 泛型与 Trait<接口>
6. 智能指针
7. 多线程与 Async
8. 高级特征

#### 3.通用概念

1. BuildInTypes
2. 关键字与控制流
3. 基本程序

#### 4.数据结构

1. 结构体、枚举、集合
2. 数据布局
3. 类型转换

#### 5.所有权与生命周期

1. 所有权、引用与借用
2. Slices 切片
3. 作用域与生命周期
4. 资源管理
5. 泛型析构函数

#### 6.数据结构与算法

1. 排序基础
2. 静态数组与动态数组
3. 链表
4. 堆和栈
5. 队列
6. 树结构
7. 堆<Heap>和优先队列
8. 哈希表

#### 7.排序算法

1. 选择排序
2. 插入排序
3. 归并排序
4. 快速排序，二路快排，三路快排
5. 二分搜索
6. 冒泡排序
7. 希尔排序

#### 8.树结构

1. 树递归
2. 深度优先遍历
3. 广度优先遍历
4. Hubbard Deletion
5. 抽象数据结构: 集合
6. 抽象数据结构: 映射
7. 线段树
8. 区间查找，Trie
9. AVL 树
10. 2-3 树
11. 红黑树
12. 二分搜索树

#### 9.堆

1. 堆的基本操作
2. 堆排序
3. 优先队列
4. 广义队列

## 常用的库

```text
anyhow - 提供 anyhow::Error 以进行简单的错误处理
asset_cmd - 简化 CLI 的集成测试
atty - 检测应用程序是否运行在 tty 上。
clap - 命令行参数解析器
crossbeam-channel - 为消息传递提供多生产者 —— 多消费者 channel
env_logger - 通过环境变量实现日志配置
human-panic - panic 消息处理程序
log - 在实现之上提供日志抽象
predicates - 实现布尔值谓词函数（boolean-valued predicate functions）
signal-hook - 处理 UNIX 信号
tokio - 异步运行时
wasm-pack - 用于构建 WebAssembly 的工具
```
