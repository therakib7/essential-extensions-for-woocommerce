const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const chalk = require('chalk');
const _ = require('lodash');

const asyncExec = util.promisify(exec);

const pluginFiles = [
    'assets/',
    'includes/',
    'languages/',
    'templates/',
    'essential-extensions-for-woocommerce.php',
    'index.php',
    'README.txt',
    'vendor/',
    'composer.json',
    'phpcs.xml',
];

const removeFiles = ['composer.lock'];

const dest = `dist/`;
const zipFile = `essential-extensions-for-woocommerce.zip`;
const allowedVendorFiles = {};
fs.removeSync(`${dest}${zipFile}`);

exec(
    'rm -rf versions && rm *.zip',
    {
        cwd: 'dist',
    },
    () => {
        const composerFile = `composer.json`;
        fs.removeSync(dest);
        const fileList = [...pluginFiles];
        fs.mkdirp(dest);

        fileList.forEach((file) => {
            fs.copySync(file, `${dest}/${file}`);
        });

        // copy composer.json file
        try {
            if (fs.pathExistsSync(composerFile)) {
                fs.copySync(composerFile, `${dest}/composer.json`);
            } else {
                fs.copySync(`composer.json`, `${dest}/composer.json`);
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }

        // eslint-disable-next-line no-console
        console.log(`Finished copying files.`);

        asyncExec(
            'composer install --optimize-autoloader --no-dev',
            {
                cwd: dest,
            },
            () => {
                // eslint-disable-next-line no-console
                console.log(
                    `Installed composer packages in ${dest} directory.`,
                );

                removeFiles.forEach((file) => {
                    fs.removeSync(`${dest}/${file}`);
                });

                // Put vendor files.
                Object.keys(allowedVendorFiles).forEach((composerPackage) => {
                    const packagePath = path.resolve(
                        `${dest}/vendor/${composerPackage}`,
                    );

                    if (!fs.existsSync(packagePath)) {
                        return;
                    }

                    const list = fs.readdirSync(packagePath);
                    const deletables = _.difference(
                        list,
                        allowedVendorFiles[composerPackage],
                    );

                    deletables.forEach((deletable) => {
                        fs.removeSync(path.resolve(packagePath, deletable));
                    });
                });

                // eslint-disable-next-line no-console
                console.log(`Making zip file ${zipFile}...`);

                asyncExec(
                    `zip -r ${zipFile} ${dest} *`,
                    {
                        cwd: dest,
                    },
                    () => {
                        fileList.forEach((file) => {
                            fs.removeSync(`${dest}/${file}`);
                        });
                        fs.removeSync(`${dest}/vendor`);
                        // eslint-disable-next-line no-console
                        console.log(
                            chalk.green(
                                `${zipFile} is ready inside ${dest} folder.`,
                            ),
                        );
                    },
                ).catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(chalk.red(`Could not make ${zipFile}.`));
                    // eslint-disable-next-line no-console
                    console.log(error);
                });
            },
        ).catch((error) => {
            // eslint-disable-next-line no-console
            console.log(
                chalk.red(`Could not install composer in ${dest} directory.`),
            );
            // eslint-disable-next-line no-console
            console.log(error);
        });
    },
);
