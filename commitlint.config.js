export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "test",
        "refactor",
        "perf",
        "style",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
  },
};
