const { componentExists } = require('../util');

module.exports = {
  description: '新增 Vue 組件',
  prompts: [{
    type: 'list',
    name: 'template',
    message: '選擇 template 語言：',
    default: 'pug',
    choices: () => ['pug', 'html'],
  }, {
    type: 'list',
    name: 'style',
    message: '選擇 style 語言',
    default: 'stylus',
    choices: () => ['stylus', 'scss'],
  }, {
    type: 'input',
    name: 'name',
    message: '輸入 component 名稱',
    default: 'Button',
    validate(value) {
      if (!/^[A-Za-z][A-Za-z0-9]+$/.test(value)) return '！名稱格式錯誤！';
      return componentExists(value) ? '！重覆的組件名稱！' : true;
    },
  }],
  actions: (data) => {
    data.isPug = data.template === 'pug';
    data.isStylus = data.style === 'stylus';
    console.log(data);
    return [{
      type: 'add',
      path: '../src/vue/{{properCase name}}/{{properCase name}}.vue',
      templateFile: 'generator/component/vue.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/vue/{{properCase name}}/package.json',
      templateFile: 'generator/component/package.hbs',
      abortOnFail: true,
    }];
  },
};
