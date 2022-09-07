module.exports = {
    root: true,
    extends: ["react-app", "react-app/jest"],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    overrides: [
        {
            "files": [
                "*.ts",
                "*.tsx"
            ],
            "rules": {
                "no-shadow": "off",
                "no-undef": "off",
                "react-native/no-inline-styles": 0,
                "@typescript-eslint/no-shadow": "off",
            }
        }
    ],
    rules: {
        "react-native/no-inline-styles": 0,
        "@typescript-eslint/no-shadow": "off",
    }
};
