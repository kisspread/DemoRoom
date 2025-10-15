/**
 * Unreal pre-commit hook:
 * - 阻止提交超大文件 (>200MB)
 * 
 */
const { execSync } = require("child_process");
const fs = require("fs");

const LIMIT_SIZE = 200;

try {
    // 检查子模块状态
    //  const submoduleStatus = execSync("git submodule status", { encoding: "utf8" });
    //  if (submoduleStatus.includes("-")) {
    //    console.error("❌ Submodules not initialized. Run: git submodule update --init --recursive");
    //    process.exit(1);
    //  }

  // 检查大文件
  const files = execSync("git diff --cached --name-only", { encoding: "utf8" })
      .split("\n")
      .filter(Boolean);
  
    const hasLargeFile = files.some(file => {
      if (!fs.existsSync(file)) return false;
      const sizeMB = fs.statSync(file).size / (1024 * 1024);
      if (sizeMB > LIMIT_SIZE) {
        console.error(`❌ File too large: ${file} (${sizeMB.toFixed(1)} MB), Large than ${LIMIT_SIZE} MB.`);
        return true; // 找到大文件就短路
      }
      return false;
    });
  
    if (hasLargeFile) process.exit(1);

  console.log("✅ Pre-commit check passed.");
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
