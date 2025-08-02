const fs = require('fs-extra');
const replace = require('replace-in-file');

const pluginFiles = ['includes/**/*', 'src/*', 'essential-extensions-for-woocommerce.php'];

const { version } = JSON.parse(fs.readFileSync('package.json'));

replace({
    files: pluginFiles,
    from: /ESSENTIAL_EXTENSIONS_WC_SINCE/g,
    to: version,
});
