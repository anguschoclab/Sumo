# Basho Deep Dive Audit (auto-generated)

- Scan root: `/mnt/data/audit_src`
- Files indexed: **3234**
- Duplicate groups: **51**

## Key Config Files Found
- **package_json**: package.json, .vite/deps_temp_ddf99f78/package.json, node_modules/tinyglobby/package.json, node_modules/jsesc/package.json, node_modules/tree/package.json, node_modules/@types/babel__template/package.json, node_modules/@types/react-dom/package.json, node_modules/@types/babel__generator/package.json, node_modules/@types/babel__traverse/package.json, node_modules/@types/prop-types/package.json, node_modules/@types/estree/package.json, node_modules/@types/babel__core/package.json, node_modules/@types/react/package.json, node_modules/browserslist/package.json, node_modules/path-is-absolute/package.json, node_modules/csstype/package.json, node_modules/@rolldown/pluginutils/package.json, node_modules/loose-envify/package.json, node_modules/ms/package.json, node_modules/node-releases/package.json, node_modules/lru-cache/package.json, node_modules/escalade/package.json, node_modules/balanced-match/package.json, node_modules/nanoid/package.json, node_modules/nanoid/async/package.json, node_modules/nanoid/non-secure/package.json, node_modules/nanoid/url-alphabet/package.json, node_modules/pinkie-promise/package.json, node_modules/once/package.json, node_modules/gensync/package.json, node_modules/picomatch/package.json, node_modules/typescript/package.json, node_modules/baseline-browser-mapping/package.json, node_modules/inherits/package.json, node_modules/postcss/package.json, node_modules/array-uniq/package.json, node_modules/@rollup/rollup-darwin-arm64/package.json, node_modules/scheduler/package.json, node_modules/pify/package.json, node_modules/underscore/package.json, node_modules/underscore/modules/package.json, node_modules/react-refresh/package.json, node_modules/@vitejs/plugin-react/package.json, node_modules/fdir/package.json, node_modules/brace-expansion/package.json, node_modules/react-dom/package.json, node_modules/picocolors/package.json, node_modules/pinkie/package.json, node_modules/semver/package.json, node_modules/vite/package.json, node_modules/vite/types/package.json, node_modules/treeify/package.json, node_modules/minimatch/package.json, node_modules/js-tokens/package.json, node_modules/@babel/plugin-transform-react-jsx-source/package.json, node_modules/@babel/helper-string-parser/package.json, node_modules/@babel/helper-validator-option/package.json, node_modules/@babel/types/package.json, node_modules/@babel/helper-plugin-utils/package.json, node_modules/@babel/core/package.json, node_modules/@babel/helper-globals/package.json, node_modules/@babel/plugin-transform-react-jsx-self/package.json, node_modules/@babel/template/package.json, node_modules/@babel/helper-module-transforms/package.json, node_modules/@babel/parser/package.json, node_modules/@babel/generator/package.json, node_modules/@babel/helper-validator-identifier/package.json, node_modules/@babel/helper-compilation-targets/package.json, node_modules/@babel/code-frame/package.json, node_modules/@babel/traverse/package.json, node_modules/@babel/helper-module-imports/package.json, node_modules/@babel/compat-data/package.json, node_modules/@babel/helpers/package.json, node_modules/getp/package.json, node_modules/rollup/package.json, node_modules/rollup/dist/es/package.json, node_modules/concat-map/package.json, node_modules/json5/package.json, node_modules/update-browserslist-db/package.json, node_modules/convert-source-map/package.json, node_modules/object-assign/package.json, node_modules/glob/package.json, node_modules/array-union/package.json, node_modules/esbuild/package.json, node_modules/yallist/package.json, node_modules/@jridgewell/sourcemap-codec/package.json, node_modules/@jridgewell/trace-mapping/package.json, node_modules/@jridgewell/gen-mapping/package.json, node_modules/@jridgewell/resolve-uri/package.json, node_modules/@jridgewell/remapping/package.json, node_modules/wrappy/package.json, node_modules/caniuse-lite/package.json, node_modules/react/package.json, node_modules/.vite/deps/package.json, node_modules/globby/package.json, node_modules/fsevents/package.json, node_modules/electron-to-chromium/package.json, node_modules/debug/package.json, node_modules/source-map-js/package.json, node_modules/tree-directory/package.json, node_modules/@esbuild/darwin-arm64/package.json, node_modules/inflight/package.json, node_modules/arrify/package.json
- **vite_config**: vite.config.ts
- **tsconfig**: tsconfig.json
- **index_html**: index.html, node_modules/tree/test/index.html

## Vite Aliases
_No aliases detected in vite config._

### Missing Aliases (used in code but not defined)
- `@/game/calendar`
- `@/game/generateUniverse`
- `@/game/rivalry`
- `@/game/rivalry/predict`
- `@/types`
- `@/ui/ErrorBoundary`
- `@/ui/Layout/Shell`
- `@/ui/Modals/SaveLoad`
- `@/ui/PWA/InstallButton`
- `@/ui/Rivalries/RivalryWidget`
- `@/ui/_ds`
- `@/ui/_ds/SumoIcon`
- `@/ui/primitives`
- `@/utils/SaveManager`
- `@/world`
- `@components/BashoStandings`
- `@components/FTUE`
- `@components/HeaderBar`
- `@components/MatchCard`
- `@components/MatchView`
- `@components/Tooltip`
- `@engine/basho`
- `@engine/match`
- `@engine/skip`
- `@engine/time`
- `@engine/world`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-icons`
- `@radix-ui/react-tabs`

## Key Engine Files
- app: src/App.tsx
- main: src/main.tsx
- world: src/engine/world.ts
- skip: src/engine/skip.ts
- time: src/engine/time.ts
- basho: src/engine/basho.ts
- flags: src/state/flags.ts

## Suspected Missing Exports
- `src/engine/skip.ts` missing: advanceDays, advanceWeeks
- `src/engine/time.ts` missing: getWorld, setWorld, emitWorldChange
- `src/engine/world.ts` missing: onWorldChange

## Stub/TODO Hits: 195 (showing up to 80)
- docs/USAGE_GUARDS.md
- node_modules/.vite/deps/chunk-HCIN4FJ4.js
- node_modules/.vite/deps/chunk-REFQX4J5.js
- node_modules/@babel/compat-data/corejs2-built-ins.js
- node_modules/@babel/compat-data/corejs3-shipped-proposals.js
- node_modules/@babel/compat-data/native-modules.js
- node_modules/@babel/compat-data/overlapping-plugins.js
- node_modules/@babel/compat-data/plugin-bugfixes.js
- node_modules/@babel/compat-data/plugins.js
- node_modules/@babel/core/lib/config/caching.js
- node_modules/@babel/core/lib/config/config-chain.js
- node_modules/@babel/core/lib/config/config-descriptors.js
- node_modules/@babel/core/lib/config/files/configuration.js
- node_modules/@babel/core/lib/config/files/index-browser.js
- node_modules/@babel/core/lib/config/files/module-types.js
- node_modules/@babel/core/lib/config/files/package.js
- node_modules/@babel/core/lib/config/files/plugins.js
- node_modules/@babel/core/lib/config/full.js
- node_modules/@babel/core/lib/config/helpers/config-api.js
- node_modules/@babel/core/lib/config/partial.js
- node_modules/@babel/core/lib/config/validation/option-assertions.js
- node_modules/@babel/core/lib/config/validation/options.js
- node_modules/@babel/core/lib/config/validation/plugins.js
- node_modules/@babel/core/lib/gensync-utils/async.js
- node_modules/@babel/core/lib/index.js
- node_modules/@babel/core/lib/parser/index.js
- node_modules/@babel/core/lib/tools/build-external-helpers.js
- node_modules/@babel/core/lib/transform-ast.js
- node_modules/@babel/core/lib/transform-file-browser.js
- node_modules/@babel/core/lib/transformation/file/file.js
- node_modules/@babel/core/lib/transformation/file/generate.js
- node_modules/@babel/core/lib/transformation/normalize-file.js
- node_modules/@babel/core/lib/transformation/util/clone-deep.js
- node_modules/@babel/core/lib/vendor/import-meta-resolve.js
- node_modules/@babel/core/src/config/files/index-browser.ts
- node_modules/@babel/core/src/transform-file-browser.ts
- node_modules/@babel/generator/lib/buffer.js
- node_modules/@babel/generator/lib/generators/base.js
- node_modules/@babel/generator/lib/generators/template-literals.js
- node_modules/@babel/generator/lib/generators/types.js
- node_modules/@babel/generator/lib/index.js
- node_modules/@babel/helper-compilation-targets/lib/filter-items.js
- node_modules/@babel/helper-compilation-targets/lib/index.js
- node_modules/@babel/helper-module-imports/lib/import-injector.js
- node_modules/@babel/helper-module-transforms/lib/index.js
- node_modules/@babel/helper-module-transforms/lib/lazy-modules.js
- node_modules/@babel/helper-module-transforms/lib/normalize-and-load-metadata.js
- node_modules/@babel/helper-module-transforms/lib/rewrite-live-references.js
- node_modules/@babel/helper-plugin-utils/lib/index.js
- node_modules/@babel/helper-validator-option/lib/validator.js
- node_modules/@babel/helpers/lib/helpers/applyDecs.js
- node_modules/@babel/helpers/lib/helpers/applyDecs2203.js
- node_modules/@babel/helpers/lib/helpers/applyDecs2203R.js
- node_modules/@babel/helpers/lib/helpers/applyDecs2301.js
- node_modules/@babel/helpers/lib/helpers/applyDecs2305.js
- node_modules/@babel/helpers/lib/helpers/applyDecs2311.js
- node_modules/@babel/helpers/lib/helpers/initializerWarningHelper.js
- node_modules/@babel/parser/CHANGELOG.md
- node_modules/@babel/parser/lib/index.js
- node_modules/@babel/parser/typings/babel-parser.d.ts
- node_modules/@babel/template/lib/builder.js
- node_modules/@babel/template/lib/formatters.js
- node_modules/@babel/template/lib/literal.js
- node_modules/@babel/template/lib/options.js
- node_modules/@babel/template/lib/parse.js
- node_modules/@babel/template/lib/populate.js
- node_modules/@babel/traverse/lib/hub.js
- node_modules/@babel/traverse/lib/index.js
- node_modules/@babel/traverse/lib/path/ancestry.js
- node_modules/@babel/traverse/lib/path/context.js
- node_modules/@babel/traverse/lib/path/conversion.js
- node_modules/@babel/traverse/lib/path/index.js
- node_modules/@babel/traverse/lib/path/inference/index.js
- node_modules/@babel/traverse/lib/path/introspection.js
- node_modules/@babel/traverse/lib/path/lib/virtual-types-validator.js
- node_modules/@babel/traverse/lib/path/modification.js
- node_modules/@babel/traverse/lib/path/replacement.js
- node_modules/@babel/traverse/lib/scope/index.js
- node_modules/@babel/traverse/lib/scope/traverseForScope.js
- node_modules/@babel/traverse/lib/visitors.js