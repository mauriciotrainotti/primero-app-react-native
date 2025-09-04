const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adiciona a extensão .wasm à lista de assets que o Metro reconhece.
config.resolver.assetExts.push('wasm');

module.exports = config;