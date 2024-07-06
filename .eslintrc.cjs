import stylisticJs from '@stylistic/eslint-plugin-js'
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@electron-toolkit',
    '@vue/eslint-config-prettier',
  ],
  plugin: {
    '@stylistic/js': stylisticJs,
  },
  rules: {
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
  },
}
