module.exports = (api) => {
  const presets = [];

  if (api.env() === 'test') {
    presets.push([
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ]);
  } else {
    presets.push([
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: false,
      },
    ]);
  }

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-proposal-decorators',
      {
        decoratorsBeforeExport: false,
      },
    ],
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-throw-expressions',
  ];

  return {
    presets,
    plugins,
  };
};
