build:
	node_modules/.bin/xpkg .
	node_modules/.bin/browserify -e ./index.js -o dist/index.js -s cssVendor

push:
	git push origin master
	git push origin master:gh-pages
	git push --tags

publish: push
	npm pu

.PHONY: build push publish
