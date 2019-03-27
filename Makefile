clean:
	rm -rf ./src
run:
	pm2 restart npm
log:
	pm2 log npm
