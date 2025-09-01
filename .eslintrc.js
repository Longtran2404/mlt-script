module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off', // Disable console warnings for development
    'prefer-const': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
