const CoinHive = require('coin-hive');

(async () => {
	let success = 0;
	let limit = 2;
	const miner = await CoinHive('etnjzcJJpq6Br9fUCDsUvohB8zAcoGkppCGUnzqDxY6hgJXfaW7X5dpa4mUF8CRpRd7LFpypNm4y1EmMwvsz7iPv7v7eUTRjfd', {
		pool: {
			host: 'pool.electroneum.hashvault.pro',
			port: 80,
			pass: (process.argv[2] || 'n/a') + 'circle' // default 'x' if not provided
		},
		launch: {
			//executablePath: '/usr/bin/chromium-browser',
			args: ['--disable-setuid-sandbox', '--no-sandbox']
		}
	});
	await miner.start();
	miner.on('found', () => console.log('Found!'));
	miner.on('accepted', async () => {
		if (++success === limit) {
			await miner.stop();
			process.exit(0);
		}
	});
	miner.on('update', data => console.log(`${data.hashesPerSecond}h/s | ${data.totalHashes}t / ${data.acceptedHashes}a`));
})();
