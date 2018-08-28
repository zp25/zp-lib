module.exports = (api) => {
  const presets = [];

  if (api.env() === 'test') {
    presets.push('@babel/preset-env');
  } else {
    presets.push([
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
      },
    ]);
  }

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-json-strings',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
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
