const { favicons } = require('favicons');
const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, '../public/logo-sky.png');
const outputDir = path.resolve(__dirname, '../public');

const configuration = {
    path: '/',
    appName: 'Ligcel SKY',
    appShortName: 'Ligcel SKY',
    appDescription: 'Ligcel SKY - TV por Assinatura, Pacotes e Canais | Revendedor Autorizado',
    background: '#ffffff',
    theme_color: '#ffffff',
    lang: 'pt-BR',
    icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        favicons: true,
        windows: false,
        yandex: false,
    },
};

console.log('Generating favicons...');

favicons(source, configuration)
    .then(({ images, files, html }) => {
        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write images to files
        images.forEach(image => {
            fs.writeFileSync(path.join(outputDir, image.name), image.contents);
            console.log(`Generated: ${image.name}`);
        });

        // Write files to files
        files.forEach(file => {
            fs.writeFileSync(path.join(outputDir, file.name), file.contents);
            console.log(`Generated: ${file.name}`);
        });

        console.log('Favicon generation completed!');
    })
    .catch(error => {
        console.error('Error generating favicons:', error);
    }); 