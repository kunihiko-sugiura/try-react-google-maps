const env = require('dotenv').config();

const {
	FuseBox,
    EnvPlugin,
    // CopyPlugin,
    BabelPlugin,
    QuantumPlugin,
    WebIndexPlugin,
    // SVGPlugin,
    CSSPlugin,
    CSSModules,
    // SassPlugin,
    /*
		** Sparky is a Task-Runner like Gulp
		http://fuse-box.org/page/sparky#sparky
    */
    Sparky
} = require('fuse-box');
const argv = require('yargs').argv;
const isProduction = argv.variant === 'prod';

const fuse = new FuseBox({
	homeDir: './src/js',
	output: './dest/html/$name.js',
    cache: ! isProduction,
	plugins: [
	    BabelPlugin(),
        EnvPlugin(
        	Object.assign(
        		{},
                env.parsed,
                { NODE_ENV: isProduction ?  'production' : 'development', }
			)
        ),
        [ CSSModules(), CSSPlugin() ],
	    WebIndexPlugin({
	    	template: './src/index.html'
	    }),
        isProduction && QuantumPlugin({
	        removeExportsInterop: false,
	        uglify: true
	    })
	]
});

const app = fuse
    .bundle('app')
    .target("browser")
    .instructions(`>app.js`);
fuse.dev({
    open : true,
});
( ! isProduction ) && app.watch().hmr();

fuse.run();
