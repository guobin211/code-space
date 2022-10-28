# WorkSpace Template for Web and Rust

## Introduction

A simple and easy-to-use Template for Rust and Nodejs, Set up the development environment quickly.

## Structure

```text

 ├── apps
 │  └── web
 ├── benches
 │  └── README.md
 ├── client
 │  └── README.md
 ├── crates
 │  ├── wasm-node
 │  └── wasm-web
 ├── examples
 │  └── hello.js
 ├── packages
 │  ├── base-utils
 │  ├── config-rollup
 │  ├── config-ts
 │  ├── config-esbuild
 │  ├── config-webpack
 │  ├── eslint-config-base
 │  ├── react-components
 │  └── other
 ├── src
 │  └── main.rs
 ├── tests
 │  ├── base_workspace_test.rs
 │  └── base_workspace_test.test.js
 ├── Cargo.lock
 ├── Cargo.toml
 ├── README.md
 ├── common.json
 ├── package.json
 ├── pnpm-lock.yaml
 ├── pnpm-workspace.yaml
 ├── turbo.json
 └── vite.config.ts

```

## Features

### Environment

- [x] 1、Support for VsCode DevContainer and Docker
- [x] 2、Development for Rust Project
- [x] 3、Development for Web And WebAssembly Project
- [x] 4、Development for Nodejs Project
- [x] 5、Development for Android and IOS Project

### Code Quality

- [x] 1、ESLint for TypeScript and JavaScript
- [x] 2、Rust Analyzer for Rust
- [x] 3、Stylelint for CSS
- [x] 4、Prettier for File format
- [x] 5、Git Hooks for Commit and Push
- [x] 6、Github Actions for CI
- [x] 7、Experimental use of Rome

### Build System

- [x] 1、Webpack
- [x] 2、Rollup
- [x] 3、Vite
- [x] 4、wasm-pack
- [x] 5、NAPI-RS
- [x] 6、Cargo

### Publish Support

- [x] 1、NPM and Yarn and Pnpm
- [x] 2、Rust on Crates
- [x] 3、WebAssembly
- [x] 4、Private Registry
- [x] 5、Jsdelivr、esm.sh、unpkg

### Test Support

- [x] 1、Vitest
- [x] 2、Jest and @swc/jest
- [x] 2、Cargo Test and Bench
