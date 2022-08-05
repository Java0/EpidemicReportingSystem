module.exports = {
  root: true,
  env: {
    node: true,
    jquery:true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-irregular-whitespace":"off",//这禁止掉 空格报错检查
    'no-unused-vars':0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}