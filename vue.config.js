/* SPDX-License-Identifier: GPL-2.0-only */
/*
 * GCSx64 - x86_64 Graphical CPU Simulator
 *
 * Copyright © 2021 by Eliane Schmidli <seliane.github@gmail.com> and Yves Boillat <yvbo@protonmail.com>
 * Modified 2021 by Michael Schneider <michael.schneider@hispeed.com> and Tobias Petter <tobiaspetter@chello.at>
 *
 * This file is part of GCSx64 - x86_64 Graphical CPU Simulator
 *
 * GCSx64 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 2 of the License only.
 *
 * GCSx64 is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with GCSx64.  If not, see <https://www.gnu.org/licenses/>.
 */

/* Here various plugins are used to pack all scripts, fonts and css into a single html file. */
/* Changes here can affect if compilation even succeeds at all or change compilation time drastically. */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  transpileDependencies: [
    'quasar',
  ],
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  css: {
    extract: false,
  },
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
      },
    },
    plugins: [
      new NodePolyfillPlugin(),
      /*       new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: true,
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*!/]),
      new HTMLInlineCSSWebpackPlugin(), */
    ],
  },
};
