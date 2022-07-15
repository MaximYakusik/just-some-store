const { Suite } = require('benchmark');
const { bench: benchJss } = require('./jss');
const { bench: benchRedux } = require('./redux');

function bench() {
  console.log(`\n# Start benchmark`);
  new Suite()
    .add('redux', () => benchRedux())
    .add('jss', () => benchJss())
    .on('cycle', e => console.log('  ' + e.target))
    .on('complete', e => console.log('Fastest is ' + e.currentTarget.filter('fastest').map('name')))
    .run();
}

bench();
