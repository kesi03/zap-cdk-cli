
# ⚡️ Zap CDK CLI

A command-line tool for scaffolding multi-language CDK projects and exporting scan configurations used by Zap Automation.

## 📦 Installation

```bash
pnpm install
```

## 🚀 Usage

Run commands using the provided scripts:

```bash
pnpm baseline     # Export baseline scan YAML
pnpm fullscan     # Export full scan YAML
pnpm apiscan      # Export API scan YAML
pnpm new          # Scaffold a new CDK project
pnpm synth        # Run CDK synth in a project folder
```

---

## 📚 Commands

### 🔍 `pnpm baseline`

Exports a baseline scan YAML file.

```bash
pnpm baseline
```

---

### 🔍 `pnpm fullscan`

Exports a full scan YAML file.

```bash
pnpm fullscan
```

> ⚠️ Note: Implementation for `exportFullScan()` is pending.

---

### 🔍 `pnpm apiscan`

Exports an API scan YAML file.

```bash
pnpm apiscan
```

> ⚠️ Note: Implementation for `exportApiScan()` is pending.

---

### 🆕 `pnpm new <language> [name]`

Scaffolds a new CDK project in the specified language.

#### Parameters

- `language` (required): Programming language to scaffold  
  Choices: `typescript`, `python`, `java`, `go`, `csharp`
- `name` (optional): Project name (default: `my-cdk-app`)

#### Examples

```bash
pnpm new typescript my-ts-app
pnpm new python my-py-app
pnpm new java my-java-app
pnpm new go my-go-app
pnpm new csharp my-csharp-app
```

> 🗂️ Projects are created one level above the CLI directory.

---

### 🛠️ `pnpm synth [target]`

Runs `cdk synth` in the specified project folder.

#### Parameters

- `target` (optional): Path to the CDK project folder (default: `.`)

#### Examples

```bash
pnpm synth                # Synth in current folder
pnpm synth ../my-ts-app  # Synth in a specific folder
```

---

## 🧑‍💻 Development Notes

- Written in TypeScript using `tsx` for execution.
- Uses `projen` to scaffold CDK projects across multiple languages.
- Supports publishing to npm and GitHub Packages via GitHub Actions.

---
